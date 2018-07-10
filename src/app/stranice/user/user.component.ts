import { Component, OnInit } from '@angular/core';
import { Directive } from '@angular/core'; 
import { Http, Response, Headers } from '@angular/http'; 
//import 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  data: any[];

  constructor(private _route: ActivatedRoute, private _http: Http, private _router: Router) { } 

  ngOnInit() {

    this._route.params.subscribe((params: Params) => { 
      let id = params['id']; 
      let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
       headers.append("token",localStorage.getItem("token"));
        this._http.get('http://localhost:8080/IT255-PZ/getuser.php?id='+id,{headers:headers}).subscribe(data => {
           this.data =JSON.parse(data['_body']).user;
          },
           err => {
              this._router.navigate(['./']); 
          }
         ); 
        
        }); 
  }

  


}
