import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationProvider } from "../../providers/authentication/authentication";
import { EmailValidator } from '../../validators/email';
import { UsernameValidator } from "../../validators/username";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SignupPage'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authProvider: AuthenticationProvider, public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController)
  {
    this.signupForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      passwordConfirm: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      userName: ['',
        Validators.compose([Validators.minLength(5), UsernameValidator.isValid, Validators.required])],
      name: ['',
        Validators.compose([Validators.minLength(3), Validators.required])],
      surname: ['',
        Validators.compose([Validators.minLength(3), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email,
        this.signupForm.value.password, this.signupForm.value.userName,
        this.signupForm.value.name, this.signupForm.value.surname)
        .then(() => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(TabsPage);
          });
        }, (error) => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
