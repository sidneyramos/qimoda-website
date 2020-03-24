require("dotenv").config()

const firebaseSettings = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "qimoda-app.firebaseapp.com",
  databaseURL: "https://qimoda-app.firebaseio.com",
  projectId: "qimoda-app",
  storageBucket: "qimoda-app.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT,
}

export default firebaseSettings
