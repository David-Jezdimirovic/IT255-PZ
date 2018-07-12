import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Directive } from '@angular/core'; 

@Component({
  selector: 'app-updateroomtype',
  templateUrl: './updateroomtype.component.html',
  styleUrls: ['./updateroomtype.component.css']
})
export class UpdateroomtypeComponent implements OnInit {

  http: Http;
   router: Router;
    route: ActivatedRoute; 

    public data: any[];

    public updateroomtypeForm = new FormGroup({
    //  id: new FormControl(),
      tip: new FormControl(),
      
    });


  constructor(route: ActivatedRoute, http: Http, router: Router) {
    this.http = http; 
    this.router = router; 
    this.route = route;
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { 
      let id = params['id']; 
      let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
       headers.append("token",localStorage.getItem("token"));
        this.http.get('http://localhost:8080/IT255-PZ/getroomtype.php?id='+id,{headers:headers}).subscribe(data => {
           this.data =JSON.parse(data['_body']).type;
          
          
        //   this.updateroomtypeForm.controls['id'].setValue(this.data['id']);
           this.updateroomtypeForm.controls['tip'].setValue(this.data['tip']);
        
          },
           err => { this.router.navigate(['./']); 
          }
         ); 
        
        }); 

   }

  

   public updateRoomType() {                                  //this.updateroomtypeForm.value.id
    var data = "tip="+this.updateroomtypeForm.value.tip+"&id="+this.data['id'];
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("token",localStorage.getItem("token"));
    this.http.post('http://localhost:8080/IT255-PZ/updateRoomType.php', data, { headers:headers }).subscribe( data => {
      
          if(data["_body"].indexOf("error") === -1){
            alert("Tip sobe uspesno izmenjen");
            this.router.navigateByUrl('allroomtypes');
          }else{
            alert("Greska");
          }
          //console.log(JSON.parse)
        },err=>{this.router.navigateByUrl('');}
      );

  }



}
