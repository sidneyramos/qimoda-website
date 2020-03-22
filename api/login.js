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
            var token = jwt.sign(doc.data(), fin.user.uid)
            res.status(200).send({
              message: `You have successfully logged in`,
              data: token,
              uid: fin.user.uid,
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
