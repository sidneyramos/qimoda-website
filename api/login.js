require("dotenv").config()
const p = require("phin")
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import * as jwt from "jsonwebtoken"
import firebaseSettings from "../lib/firebaseSettings"
const CryptoJS = require("crypto-js")

firebase.initializeApp(firebaseSettings)

module.exports = (req, res) => {
  const { email, password } = req.body
  const auth = firebase.auth()
  const db = firebase.firestore()

  return auth
    .signInWithEmailAndPassword(email, password)
    .then(fin => {
      const currentUserData = db.collection("users").doc(fin.user.uid)

      currentUserData
        .get()
        .then(function(doc) {
          if (doc.exists) {
            const token = jwt.sign(doc.data(), fin.user.uid)
            const firebaseJWT = CryptoJS.AES.encrypt(
              JSON.stringify(firebaseSettings),
              fin.user.uid
            ).toString()
            res.status(200).send({
              message: `You have successfully logged in`,
              data: token,
              uid: fin.user.uid,
              settings: firebaseJWT,
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
      console.log(error)
      res.status(404).send({ message: error.message })
    })
}
