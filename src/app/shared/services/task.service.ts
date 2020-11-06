import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private fs : AngularFirestore
  ) { }

  getTaskSnapshotChanges(){
    return this.fs.collection('tasks').snapshotChanges()
  }

  getTaskValueChanges(){
    return this.fs.collection('tasks').valueChanges()
  }

  getTask(){
    return this.fs.collection('tasks').get()
  }

  getSubtask(taskId){
    return this.fs.collection('tasks').doc(taskId).collection('subtasks').valueChanges()
  }


}
