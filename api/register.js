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
  const { email, password, fullname } = req.body
  const auth = firebase.auth()
  const db = firebase.firestore()
  const data = {
    fullName: fullname,
  }

  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(fin => {
      const idToken = fin.user.uid

      return adminApp
        .auth()
        .createCustomToken(idToken)
        .then(function(customToken) {
          db.collection("users")
            .doc(idToken)
            .set(data)
            .then(async () => {
              const token = jwt.sign(data, idToken)
              const firebaseJWT = CryptoJS.AES.encrypt(
                JSON.stringify(firebaseSettings),
                idToken
              ).toString()
              await db
                .collection("projects")
                .doc(idToken)
                .collection("projArray")
                .doc()
                .set({})
              res.status(200).send({
                message: `Your account has been registered.`,
                data: token,
                uid: idToken,
                settings: firebaseJWT,
                sessionToken: customToken,
              })
            })
            .catch(error => {
              console.error("Error adding document: ", error)
              res.status(404).send({ message: error.message })
            })
        })
        .catch(function(error) {
          console.log("Error creating custom token:", error)
          res.status(404).send({ message: `Something went wrong` })
        })
    })
    .catch(function(error) {
      res.status(404).send({ message: error.message })
    })
}
