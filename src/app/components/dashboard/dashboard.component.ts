import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private taskService : TaskService,
    private fireStore: AngularFirestore
  ) { }

  async ngOnInit() {
    
    let snapshotChanges =this.taskService.getTaskSnapshotChanges()
    snapshotChanges.subscribe((tasksSnapshot)=>{
      console.group('SnapshotChanges')
      console.log(tasksSnapshot)
      tasksSnapshot.forEach((taskData:any) => {
        console.log(taskData.payload.doc.id, '=>', taskData.payload.doc.data())
      });
      console.groupEnd()
    })

    let valueChanges = this.taskService.getTaskValueChanges()
    valueChanges.subscribe((taskValue)=>{
      console.group('ValueChanges')
      console.log(taskValue)
        taskValue.forEach((task)=>{
          console.log(task)
        })
      console.groupEnd()
    })

    let get = this.taskService.getTask()
    get.subscribe((getValue)=>{
      console.group('get')
        console.log(getValue)
        getValue.forEach((value)=>{
            console.log(value.id, value.data())

            let subTask = this.taskService.getSubtask(value.id)
            .subscribe((valueChanges)=>{
              console.log('Subtask for:', value.id)
              console.log(valueChanges)
              subTask.unsubscribe()
            })
        })
      console.groupEnd()
    })

  }

  async click(){

    let doc = this.fireStore.collection('cities', ref=>ref.where('capital','==',true))
    doc.get().subscribe(res=>{
        console.log(res)

        res.forEach(result=>{
          console.log(result.id,'=>',result.data())
        })
      
    })

  }

}
