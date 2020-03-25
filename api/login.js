require("dotenv").config()
const p = require("phin")
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import * as jwt from "jsonwebtoken"
import firebaseSettings from "../lib/firebaseSettings"
const CryptoJS = require("crypto-js")
const serviceAcc = JSON.parse(
  JSON.stringify(jwt.verify(process.env.G_ADMIN, "qimoda"))
)
var admin = require("firebase-admin")
var adminApp = admin.initializeApp({
  serviceAccountId: "sidney-ramos@qimoda-app.iam.gserviceaccount.com",
  credential: admin.credential.cert(serviceAcc),
  databaseURL: "https://qimoda-app.firebaseio.com",
})
firebase.initializeApp(firebaseSettings)

module.exports = (req, res) => {
  const { email, password } = req.body
  const auth = firebase.auth()
  const db = firebase.firestore()

  return auth
    .signInWithEmailAndPassword(email, password)
    .then(fin => {
      // console.log(jwt.sign(adminCreds, "qimoda"))

      const idToken = fin.user.uid

      return adminApp
        .auth()
        .createCustomToken(idToken)
        .then(function(customToken) {
          const currentUserData = db.collection("users").doc(idToken)

          currentUserData
            .get()
            .then(function(doc) {
              if (doc.exists) {
                const token = jwt.sign(doc.data(), idToken)
                const firebaseJWT = CryptoJS.AES.encrypt(
                  JSON.stringify(firebaseSettings),
                  idToken
                ).toString()
                res.status(200).send({
                  message: `You have successfully logged in`,
                  data: token,
                  uid: idToken,
                  settings: firebaseJWT,
                  sessionToken: customToken,
                })
              } else {
                // doc.data() will be undefined in this case
                res.status(404).send({ message: `Cannot find user data` })
              }
            })
            .catch(function(error) {
              res.status(404).send({ message: `Cannot find user data` })
            })
        })
        .catch(function(error) {
          console.log("Error creating custom token:", error)
          res.status(404).send({ message: `Something went wrong` })
        })
    })
    .catch(function(error) {
      console.log(error)
      res.status(404).send({ message: error.message })
    })
}
