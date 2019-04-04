import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../../models/user";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient) {}

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, userName: string, name: string, surname: string ): Promise<any> {
    //createUserWithEmailAndPassword da de alta el usuario en firebase e inicia sesion AUTOMATICAMENTE
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
          .database()
          .ref()
          .child("users")
          .child(firebase.auth().currentUser.uid)
          .set({
            email: email,
            userName: userName,
            name: name,
            surname: surname
          });
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

}
