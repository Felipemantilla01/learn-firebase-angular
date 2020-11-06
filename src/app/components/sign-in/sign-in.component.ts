import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  signInForm

  constructor(
    private fb : FormBuilder,
    private userService : UserService
  ) { }


  ngOnInit(): void {

    this.signInForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })

  }

  async submit(){
    console.log(this.signInForm.value)
    try {
      let result = await this.userService.sign(this.signInForm.value.email,this.signInForm.value.password)

      console.log(result.user.uid)
    } catch (error) {
      console.error(error)
    }
  }

  async link(){
    try {
      let result = await this.userService.sendLInk(this.signInForm.value.email)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }


}
