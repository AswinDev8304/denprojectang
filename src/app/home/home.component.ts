import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  uname: any = ""
  alertMes: any = ''
  
  constructor(private ds: DataService, private router: Router, private fb: FormBuilder, private datepipe: DatePipe) { }
  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) {
      alert('please login')
      this.router.navigateByUrl("")
    }

    if (localStorage.getItem('currentUser')) {
      this.uname = localStorage.getItem('currentUser')

    }
  }
  bookingForm = this.fb.group({
    uname: [' ', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$')]],
    patname: [' ', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$')]],
    time: [' ', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
    psw: [' ', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
  })
  logout() {
    localStorage.removeItem('currentphno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    
    this.router.navigateByUrl("")
  }

  booking() {
    if (this.bookingForm.valid) {

      var date = new Date()
      
      let latest_date = this.datepipe.transform(date, 'shortDate')
      if (localStorage.getItem("currentUser")) {
        this.uname = localStorage.getItem("currentUser")
      }
      
      
        this.ds.booking(this.bookingForm.value.uname,
          this.bookingForm.value.patname,
          this.bookingForm.value.time,
          this.bookingForm.value.psw,
          latest_date
        ).subscribe((result: any) => {
          this.alertMes = result.message
          
        },
          result => {
            this.alertMes = result.error.message
            
          })
      


    }
    else {
      this.alertMes = 'invalid form'

    }
  }
  deleteac(){
    if(localStorage.getItem("currentUser")){
      this.uname=localStorage.getItem("currentUser")
      this.ds.deleteAc(this.uname).subscribe((result:any)=>{
        alert(result.message)
        this.logout()
      })
    }
    
  }

}
