import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  uname: any
  phno: any
  psw: any
  cpsw: any
  constructor(private ds: DataService, private rout: Router, private fb: FormBuilder) { }
  pswCheck: boolean = false
  registerForm = this.fb.group({

    uname: [' ', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$')]],
    phno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    cpsw: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })

  signup() {
    var uname = this.registerForm.value.uname
    var phno = this.registerForm.value.phno
    var psw = this.registerForm.value.psw
    var cpsw = this.registerForm.value.cpsw
    if (this.registerForm.valid) {
      if (cpsw == psw) {
        this.ds.register(uname, phno, psw).subscribe((result: any) => {
          alert(result.message)
          this.rout.navigateByUrl("")
        },
          result => {
            alert(result.error.message)
          }
        )

      }
      else {

        this.pswCheck = true
      }
    }
    else {
      alert('invalid input')
    }

  }




}
