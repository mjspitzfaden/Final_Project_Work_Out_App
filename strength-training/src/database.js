import * as firebase from "firebase";

var config = {
apiKey: "AIzaSyAtw-KBy3DHkcQpMMEIk1BWiubukGB8Ad8",
authDomain: "strength-535d3.firebaseapp.com",
databaseURL: "https://strength-535d3.firebaseio.com",
projectId: "strength-535d3",
storageBucket: "strength-535d3.appspot.com",
messagingSenderId: "735250575318"
};
  firebase.initializeApp(config);

var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

export default database;
