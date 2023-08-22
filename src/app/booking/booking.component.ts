import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  bookingdetails: any
  uname: any
  phno: any
  constructor(private ds: DataService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("currentUser")) {
      this.uname = localStorage.getItem("currentUser")
      this.ds.bookingdetails(this.uname).subscribe((result: any) => {
        if (result.message.length == 0) {
          alert("no booking is done")
          this.router.navigateByUrl("home")
        }
        this.bookingdetails = result.message
      })
    }
    this.phno = localStorage.getItem("currentphno")



  }
  cancelbooking() {
    this.ds.cancelbooking(this.uname, this.phno).subscribe((result: any) => {
    alert(result.message)
    this.router.navigateByUrl("home")
    })
  }

}
