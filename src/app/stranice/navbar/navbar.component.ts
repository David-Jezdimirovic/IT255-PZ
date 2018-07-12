import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _http: Http, private _router: Router) { }
 
  public isLogin: boolean;
  public isAdmin: boolean;
  public provera:any[];
  public ime:any[];

 public ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }


 //   if(localStorage.getItem('admin') == '1'){
  //    this.isAdmin = true;
  //  }else{
  //    this.isAdmin = false;
  //  }

  this.proveriAdmina();
  this.getName();
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.isLogin = false;
    location.reload();
  }
  


  public proveriAdmina(){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    let data = "token="+localStorage.getItem('token');
    this._http.post('http://localhost:8080/IT255-PZ/proveriAdmina.php', data, {headers:headers}).subscribe( data => {
          this.provera = JSON.parse(data["_body"]).admin;
      // var r=this.provera['admin'];
      //console.log(r);
      //console.log(this.provera);
          if(this.provera['admin'] == 1){
       
           this.isAdmin = true;
          }else{
         
          this.isAdmin = false;
          }
  }, err => {
    alert("neuspeh");
  });
  
  }





  public getName(){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.get('http://localhost:8080/IT255-PZ/getName.php?token='+localStorage.getItem('token'), {headers:headers}).subscribe( data => {
          this.ime = JSON.parse(data["_body"]).username;
           console.log(this.ime);
      //    console.log(this.ime['username'],this.ime['firstname']);
  }
  , err => {
    alert("neuspeh");
  });

  }


}
