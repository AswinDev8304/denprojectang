import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }
  getHeader() {
    let headers = new HttpHeaders()
    let token = JSON.parse(localStorage.getItem("token") || "")
    options.headers = headers.append("acess_token", token)
    return options
  }

  register(uname: any, phno: any, psw: any) {
    const bodydata = {
      uname,
      phno,
      psw
    }
    return this.http.post('http://localhost:3000/register', bodydata)
  }

  login(uname: any, psw: any) {
    const body = {
      uname,
      psw
    }
    return this.http.post('http://localhost:3000/login', body)
  }

  booking(uname: any, patname: any, time: any, psw: any, date: any) {
    const body = {
      uname,
      patname,
      time,
      psw,
      date
    }
    return this.http.post('http://localhost:3000/booking', body,this.getHeader())
  }
  bookingdetails(uname: any) {
    return this.http.get('http://localhost:3000/bookingdetails/' + uname, this.getHeader())
  }
  cancelbooking(uname: any, phno: any) {
    const body = {
      uname, phno
    }
    return this.http.post('http://localhost:3000/cancelbooking', body,this.getHeader())
  }
  deleteAc(uname:any){
    return this.http.delete('http://localhost:3000/deleteac/'+uname,this.getHeader())
   }
}
