import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'; 
//import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-allroomtypes',
  templateUrl: './allroomtypes.component.html',
  styleUrls: ['./allroomtypes.component.css']
})
export class AllroomtypesComponent implements OnInit {

 er:any[];

  private room_types : any[]; 
 // private router: Router;
  constructor(private _http: Http, private _router: Router) {
  }


  ngOnInit() {
    this._getRoomTypes();
  }

  private _getRoomTypes() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost:8080/IT255-PZ/getroomtypes.php', {headers: headers}).subscribe((data): any => {
          this.room_types = JSON.parse(data['_body']).room_types;
        },
        err => {
          this._router.navigateByUrl('');
        }
      );
  }

  public removeRoomType(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost:8080/IT255-PZ/deleteroomtype.php?id='+item, {headers:headers})  .subscribe( data => {
       
        this.er = JSON.parse(data["_body"]).error; 

    
       if(data["_body"].indexOf("error") === -1){
         
        event.srcElement.parentElement.parentElement.remove();
          }else{
         //   alert(this.er);
            alert(data["_body"]);
        }
        //data => this.postResponse = data;
      }); 
    }



    public updateRoomType(item: Number){

      this._router.navigate(['../updateroomtype',item]);
        
      }

  

}
