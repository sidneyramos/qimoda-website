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
  const { email, password, fullname } = req.body
  const auth = firebase.auth()
  const db = firebase.firestore()
  const data = {
    fullName: fullname,
  }

  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(fin => {
      db.collection("users")
        .doc(fin.user.uid)
        .set(data)
        .then(async () => {
          const token = jwt.sign(data, fin.user.uid)
          const firebaseJWT = CryptoJS.AES.encrypt(
            JSON.stringify(firebaseSettings),
            fin.user.uid
          ).toString()
          await db
            .collection("projects")
            .doc(fin.user.uid)
            .collection("projArray")
            .doc()
            .set({})
          res.status(200).send({
            message: `Your account has been registered.`,
            data: token,
            uid: fin.user.uid,
            settings: firebaseJWT,
          })
        })
        .catch(error => {
          console.error("Error adding document: ", error)
          res.status(404).send({ message: error.message })
        })
    })
    .catch(function(error) {
      res.status(404).send({ message: error.message })
    })
}
