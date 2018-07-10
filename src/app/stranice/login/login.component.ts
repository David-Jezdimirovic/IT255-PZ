import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) { }
  


  ngOnInit() {
    if(localStorage.getItem('token')) {
      this._router.navigateByUrl('');
    }
  }

  
  public login() {

    let data = "username="+this.loginForm.value.username+"&password="+this.loginForm.value.password;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    this._http.post('http://localhost:8080/IT255-PZ/login.php', data, {headers:headers}).subscribe( data => {
        let obj = JSON.parse(data["_body"]);
      
        localStorage.setItem('token', obj.token);
        localStorage.setItem('admin', obj.admin);
        this._router.navigate(['./']);
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
