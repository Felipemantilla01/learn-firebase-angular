import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public auth: AngularFireAuth,
    private realTimeDB : AngularFireDatabase
  ) { }

  createUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  sign(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  sendLInk(email){
    return this.auth.sendSignInLinkToEmail(email,{url:'http://localhost:4200/home', handleCodeInApp:true})
  }

  readDB(){
    this.realTimeDB.list('/notifications')
  }
}
