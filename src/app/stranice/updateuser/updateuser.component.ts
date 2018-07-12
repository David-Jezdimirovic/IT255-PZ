import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Directive } from '@angular/core'; 

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  public data: any[];

  constructor(private _route: ActivatedRoute, private _http: Http, private _router: Router) { }

  //{value:'13', disabled:true},Validators.required
  public updateuserForm = new FormGroup({
 //   id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    admin: new FormControl(),
    
  });


  ngOnInit() { 
    this._route.params.subscribe((params: Params) => { 
    let id = params['id']; 
    let headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
     headers.append("token",localStorage.getItem("token"));
      this._http.get('http://localhost:8080/IT255-PZ/getuser.php?id='+id,{headers:headers}).subscribe(data => {
         this.data =JSON.parse(data['_body']).user;
        
        
      //   this.updateuserForm.controls['id'].setValue(this.data['id']);
         this.updateuserForm.controls['firstName'].setValue(this.data['firstname']);
         this.updateuserForm.controls['lastName'].setValue(this.data['lastname']);
         this.updateuserForm.controls['username'].setValue(this.data['username']);
         this.updateuserForm.controls['admin'].setValue(this.data['admin']);
        
        },
         err => {
            this._router.navigate(['./']); 
            
        }
       ); 
      
      }); 

 }


 public updateUser() {                                                                                                                                                                                         //this.updateuserForm.value.id                                             
  var data = "firstName="+this.updateuserForm.value.firstName+"&lastName="+this.updateuserForm.value.lastName+"&username="+this.updateuserForm.value.username+"&admin="+this.updateuserForm.value.admin + "&id="+this.data['id'];
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append("token",localStorage.getItem("token"));
  this._http.post('http://localhost:8080/IT255-PZ/updateUser.php', data, { headers:headers }).subscribe( data => {
    
        if(data["_body"].indexOf("error") === -1){
          alert("Korisnik uspesno izmenjen");
          this._router.navigateByUrl('korisnici');
        }else{
          alert("Greska");
        }
        //console.log(JSON.parse)
      },err=>{
     //   this._router.navigateByUrl('');
        let obj = JSON.parse(err._body);
        let element  = <HTMLElement> document.getElementsByClassName("alert")[0];
        element.style.display = "block";
        element.innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
      }
    );

}

}
