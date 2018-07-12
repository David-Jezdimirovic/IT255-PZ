import { Component, OnInit } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Http, Headers } from '@angular/http';
import {  Router, ActivatedRoute, Params } from '@angular/router';
//import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-reservationslist',
  templateUrl: './reservationslist.component.html',
  styleUrls: ['./reservationslist.component.css']
})
export class ReservationslistComponent implements OnInit {

  constructor(private _http: Http, private _router: Router) { }
  
  public isAdmin:boolean;
  public provera:any;
  //private rezervacije:any[];
  private rezervacije:Array<any> = [];
  private mojerezervacije:Array<any> = [];
  pr:string;
//ime:any[];
  ngOnInit() {
    

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-PZ/getReservations.php', {headers: headers})
      .subscribe(data => {
          this.rezervacije = JSON.parse(data['_body']).reservations;
         
        },
        err => {
          this._router.navigate(['']);
        }
      );

  //    let data = "token="+localStorage.getItem('token');
      this._http.get('http://localhost:8080/IT255-PZ/getmyReservations.php?token='+localStorage.getItem('token'), {headers: headers}).subscribe(data => {
          this.mojerezervacije = JSON.parse(data['_body']).myreservations;
        
          if(this.mojerezervacije.length == 0){
            this.pr="Trenutno nemate rezervacija";
          }
        },
        err => {
          this._router.navigate(['']);
        }
      );


  
   this.proveriAdmina();
  }



  public proveriAdmina(){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    let data = "token="+localStorage.getItem('token');
    this._http.post('http://localhost:8080/IT255-PZ/proveriAdmina.php', data, {headers:headers}).subscribe( data => {
          this.provera = JSON.parse(data["_body"]).admin;
      //    var r=this.n['admin'];
      //console.log(r);
          if(this.provera['admin'] == 1){
       
           this.isAdmin = true;
          }else{
         
          this.isAdmin = false;
          }
  }, err => {
    alert("neuspeh");
  });
  
  }




  public viewReservation(item: Number){
    this._router.navigate(['../viewreservation', item]);
    }




  public deleteReservation(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-PZ/deleteReservation.php?id='+item, {headers:headers})  .subscribe( data => {
        event.srcElement.parentElement.parentElement.remove();
        //data => this.postResponse = data;
      }); 
    } 

   
     
  }
