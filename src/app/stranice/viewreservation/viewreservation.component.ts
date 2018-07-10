import { Component, OnInit } from '@angular/core';
import { Directive } from '@angular/core'; 
import { Http, Response, Headers } from '@angular/http'; 
//import 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-viewreservation',
  templateUrl: './viewreservation.component.html',
  styleUrls: ['./viewreservation.component.css']
})
export class ViewreservationComponent implements OnInit {

  
  constructor(private _route: ActivatedRoute, private _http: Http, private _router: Router) { }
 
  data: any[];
  public isAdmin:boolean;
  provera:any[];
 
  ngOnInit() {

    this.proveriAdmina();

    this._route.params.subscribe((params: Params) => { 
      let id = params['id']; 
      let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
       headers.append("token",localStorage.getItem("token"));
        this._http.get('http://localhost:8080/IT255-PZ/getreservation.php?id='+id,{headers:headers}).subscribe(data => {
           this.data =JSON.parse(data['_body']).reservation;
          },
           err => {
              this._router.navigate(['./']); 
          }
         ); 
        
        }); 

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



}
