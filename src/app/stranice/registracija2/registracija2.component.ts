import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija2',
  templateUrl: './registracija2.component.html',
  styleUrls: ['./registracija2.component.css']
})

export class Registracija2Component implements OnInit {

  public registracijaForm = new FormGroup({
    
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    admin: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) {  }

 // public isLogin: boolean;
 // public isAdmin: boolean;
 
  ngOnInit() {
     if(localStorage.getItem('token')) {
      this._router.navigateByUrl('');
    }
  //  if (localStorage.getItem('token')) {
  //    this.isLogin = true;
  //  } else {
  //    this.isLogin = false;
  //  }
  //  if (localStorage.getItem('admin')=='1') {
  //    this.isAdmin = true;
  //  } else {
  //    this.isAdmin = false;
  //  }
  }

  public registracija() {

    let data = "username="+this.registracijaForm.value.username+"&password="+this.registracijaForm.value.password+"&firstName="+this.registracijaForm.value.firstName+"&lastName="+this.registracijaForm.value.lastName+"&admin="+this.registracijaForm.value.admin;

    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  
    this._http.post('http://localhost:8080/IT255-PZ/registracija2.php', data, {headers:headers}).subscribe( data => {
        let obj = JSON.parse(data["_body"]);
       // localStorage.setItem('token', obj.token);
        this._router.navigate(['registracija2']);
        alert("Uspesno ste se registrovali");
        
           this.registracijaForm.controls['username'].setValue('');
           this.registracijaForm.controls['password'].setValue('');
           this.registracijaForm.controls['firstName'].setValue('');
           this.registracijaForm.controls['lastName'].setValue('');
           let element  = <HTMLElement> document.getElementsByClassName("alert")[0];
           element.style.display = "none";
     },
      err => {
        let obj = JSON.parse(err._body);
        let element  = <HTMLElement> document.getElementsByClassName("alert")[0];
        element.style.display = "block";
        element.innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
      }
    );


  
  
  }
}
