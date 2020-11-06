import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }


  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  async submit() {
    console.log(this.signUpForm.value.email)
    console.log(this.signUpForm.value.password)


    try {
      let result = await this.userService.createUser(this.signUpForm.value.email, this.signUpForm.value.password)
      console.log(result)
    } catch (error) {
      console.error(error)
    }

  }

}
