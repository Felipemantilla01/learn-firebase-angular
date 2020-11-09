import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private fireStore: AngularFirestore,
    private fireDataBase: AngularFireDatabase
  ) { }

  result = []
  notficationForm={
    type:'',
    desc:''
  }

  notifications = []

  ngOnInit(): void {
    console.group('Home component')
    this.read()
  }

  get() {
    this.fireStore.collection('users').snapshotChanges().subscribe(users => {
      console.log(users)

      for (let user of users) {
        console.log(user.payload.doc.id, '=>', user.payload.doc.data())
      }
    })
  }

  getQuery(name) {

    this.fireStore.collection('users', ref => ref.where('name', '==', name)).get().subscribe(value=>{
      this.result=[]
      value.forEach(val=>{
        console.log(val.id,'=>',val.data()) 
        this.result.push({
          id:val.id,
          name:val.data().name,
          lastname:val.data().lastname
        })
      })
    })

  }

  async push(){
    let form = this.notficationForm
    let result = await this.fireDataBase.list('/notifications').push(form)
    console.log(result)
  }

  async read(){
    this.fireDataBase.list('/notifications').valueChanges().subscribe(result=>{
      console.log(result)
      this.notifications=result
    })
    
  }




  ngOnDestroy() {
    console.log('End Home Component')
  }

}
