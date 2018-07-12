import { Component, OnInit } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  private users:Array<any> = [];
  er:any[];
  
  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-PZ/getusers.php', {headers: headers})
      .subscribe(data => {
          this.users = JSON.parse(data['_body']).users;
         
        },
        err => {
          this._router.navigate(['']);
        }
      );
  }



  public removeUser(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-PZ/deleteuser.php?id='+item, {headers:headers})  .subscribe( data => {
    
        this.er = JSON.parse(data["_body"]).error; 

        if(data["_body"].indexOf("error") === -1){
          
         event.srcElement.parentElement.parentElement.remove();
           }else{
             alert(this.er);
         //    alert(data["_body"]);
             
         }
      }); 
    }


    public viewUser(item: Number){
      this._router.navigate(['../user', item]);
      }


   public updateUser(item: Number){

     this._router.navigate(['../updateuser',item]);
       
     }

}
