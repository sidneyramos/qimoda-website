require("dotenv").config()
const p = require("phin")
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import * as jwt from "jsonwebtoken"

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API,
  authDomain: "qimoda-app.firebaseapp.com",
  databaseURL: "https://qimoda-app.firebaseio.com",
  projectId: "qimoda-app",
  storageBucket: "qimoda-app.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT,
})

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
        .then(() => {
          var token = jwt.sign(data, fin.user.uid)
          res.status(200).send({
            message: `Your account has been registered.`,
            data: token,
            uid: fin.user.uid,
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
