import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder) { }
  loginForm = this.fb.group({
    uname: [' ', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$')]],
    psw: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })

  login() {
    var uname= this.loginForm.value.uname
    var psw = this.loginForm.value.psw
    if (this.loginForm.valid) {
      this.ds.login(uname, psw).subscribe((result: any) => {
          
        localStorage.setItem('currentUser',result.currentUser)
        localStorage.setItem('currentphno',result.currentphno)
        localStorage.setItem('token',JSON.stringify(result.token))
        
        
        alert(result.message)
        this.rout.navigateByUrl('home')
      },
        result => {
          alert(result.error.message)
        })
    }
    else {
      alert("Please enter valid details")
    }

  }
}
