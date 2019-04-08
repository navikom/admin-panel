import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "config/firebase";
/**
 * Firebase api
 *
 */

export class Firebase {
  static auth;
  static googleAuthProvider;
  static database;
  static provider;
  static EmailAuthProvider;

  static init() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    Firebase.auth = firebase.auth();
    Firebase.googleAuthProvider = firebase.auth.GoogleAuthProvider;
    Firebase.database = firebase.database();
    Firebase.provider = new firebase.auth.FacebookAuthProvider();
    Firebase.EmailAuthProvider = firebase.auth.EmailAuthProvider;
  }
}