import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Directive } from '@angular/core'; 


@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrls: ['./updateroom.component.css']
})
export class UpdateroomComponent implements OnInit {
 
  public room_types: any[];


  http: Http;
   router: Router;
    route: ActivatedRoute; 
   public data: any[];

  public updateroomForm = new FormGroup({
   // id: new FormControl(),
    broj: new FormControl(),
    naziv: new FormControl(),
    tv: new FormControl(),
    kvadrati: new FormControl(),
    kreveti: new FormControl(),
    room_type: new FormControl()
  });




  constructor(route: ActivatedRoute, http: Http, router: Router) {
    this.http = http; 
    this.router = router; 
    this.route = route;
    }

  ngOnInit() {
    this._getRoomTypes();

   


    this.route.params.subscribe((params: Params) => { 
      let id = params['id']; 
      let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
       headers.append("token",localStorage.getItem("token"));
        this.http.get('http://localhost:8080/IT255-PZ/getroom.php?id='+id,{headers:headers}).subscribe(data => {
           this.data =JSON.parse(data['_body']).room;
          
          
        //   this.updateroomForm.controls['id'].setValue(this.data['id']);
           this.updateroomForm.controls['broj'].setValue(this.data['broj']);
           this.updateroomForm.controls['naziv'].setValue(this.data['naziv']);
           this.updateroomForm.controls['tv'].setValue(this.data['tv']);
           this.updateroomForm.controls['kvadrati'].setValue(this.data['kvadrati']);
           this.updateroomForm.controls['kreveti'].setValue(this.data['kreveti']);
           this.updateroomForm.controls['room_type'].setValue(this.data['room_type_id']);
          
          
          
          },
           err => { this.router.navigate(['./']); 
          }
         ); 
        
        }); 

   }



  private _getRoomTypes() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this.http.get('http://localhost:8080/IT255-PZ/getroomtypes.php', {headers: headers}).subscribe((data): any => {
          this.room_types = JSON.parse(data['_body']).room_types;
        },
        err => {
          this.router.navigateByUrl('');
        }
      );    
  }



  


  public updateRoom() {                                                                                                                                                                                                                                                                       //this.updateroomForm.value.id
    var data = "broj="+this.updateroomForm.value.broj+"&naziv="+this.updateroomForm.value.naziv+"&tv="+this.updateroomForm.value.tv+"&kvadrati="+this.updateroomForm.value.kvadrati+"&kreveti="+this.updateroomForm.value.kreveti+"&room_type_id="+this.updateroomForm.value.room_type+"&id="+this.data['id'];
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("token",localStorage.getItem("token"));
    this.http.post('http://localhost:8080/IT255-PZ/updateRoom.php', data, { headers:headers }).subscribe( data => {
      
          if(data["_body"].indexOf("error") === -1){
            alert("Soba uspesno izmenjena");
            this.router.navigateByUrl('pretraga');
          }else{
            alert("Greska");
          }
          //console.log(JSON.parse)
        },err=>{this.router.navigateByUrl('');}
      );

  }







 


}
