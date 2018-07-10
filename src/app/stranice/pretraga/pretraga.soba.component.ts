import { Component, OnInit } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'pretraga-component',
  templateUrl: './pretraga.soba.component.html',
  styleUrls: ['../../../assets/scss/base.scss'],
  
})



export class PretragaSobaComponent{
  data: any[];
  message: String;
  check:boolean;
  private sobe:Array<any> = [];
  private kvadrati = 0;
  private kreveti = 0;
  
  public searchForm = new FormGroup({
    id: new FormControl(),
  });

  public deleteForm = new FormGroup({
    id: new FormControl(),
  });

public isAdmin:boolean;
public admin:string;
public token:string;
provera:any[];

  constructor(private _http: Http, private _router: Router) { }

 
  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-PZ/getrooms.php', {headers: headers})
      .subscribe(data => {
          this.sobe = JSON.parse(data['_body']).rooms;
         
        },
        err => {
          this._router.navigate(['']);
        }
      );

     
   //   if(localStorage.getItem('admin') == '1'){
   //     this.isAdmin = true;
   //   }else{
   //     this.isAdmin = false;
   //   }


    //  this.admin=localStorage.getItem('admin');
    //  this.token=localStorage.getItem('token');
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

  public removeRoom(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-PZ/deleteroom.php?id='+item, {headers:headers})  .subscribe( data => {
        event.srcElement.parentElement.parentElement.remove();
        //data => this.postResponse = data;
      }); 
    }


    public viewRoom(item: Number){
       this._router.navigate(['../room', item]);
       }


    public updateRoom(item: Number){

      this._router.navigate(['../updateroom',item]);
        
      }

      public reservation(item: Number){

        this._router.navigate(['../reservation',item]);
          
        }

      public searchRoom(){
        var id = this.searchForm.value.id; 
        var headers = new Headers(); 
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
         this._http.get('http://localhost:8080/IT255-PZ/getroombyid.php?id='+id, {headers:headers})  .subscribe( data => {
         
          this.data =JSON.parse(data['_body']).room;
        
           if(this.data['id'] != null){
             this.check = true;
           }else{
            this.check = false;
            this.message="Trazena soba ne postoji";
            
        
            }
        }, err => {
          alert("neuspeh");
        });
      }






      public deleteRoom(){
        var id = this.deleteForm.value.id; 
        var headers = new Headers(); 
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('token'));
         this._http.get('http://localhost:8080/IT255-PZ/deleteroom.php?id='+id, {headers:headers})  .subscribe( data => {
        
        }, err => {
          alert("neuspeh");
        });
      }





}