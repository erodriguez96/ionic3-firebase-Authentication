import { Component } from '@angular/core';
import {Alert, NavController} from 'ionic-angular';
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthenticationProvider) {

  }

  logUserOut(){
    let data = this.authProvider.logoutUser();

    if(data){

      this.navCtrl.setRoot(LoginPage);

    }else{

      alert("Failure");

    }

  }

}
