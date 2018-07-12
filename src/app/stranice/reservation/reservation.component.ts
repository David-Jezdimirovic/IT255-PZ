import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Directive } from '@angular/core'; 


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public data: any[];
//public token:string;
  constructor(private _route: ActivatedRoute, private _http: Http, private _router: Router) { }

  public reservationForm = new FormGroup({
    //id: new FormControl(),
    ime: new FormControl(),
    od: new FormControl(),
    do: new FormControl(),
    
    
  });

  ngOnInit() {
//this.token=localStorage.getItem('token');
//console.log(this.token);

//this.reservationForm.controls['token'].setValue(this.token);

    this._route.params.subscribe((params: Params) => { 
      let id = params['id']; 
      let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
       headers.append("token",localStorage.getItem("token"));
        this._http.get('http://localhost:8080/IT255-PZ/getroom.php?id='+id,{headers:headers}).subscribe(data => {
           this.data =JSON.parse(data['_body']).room;

    //this.reservationForm.controls['id'].setValue(this.data['id']);
     },
      err => { this._router.navigate(['./']); 
      }
      ); 

      }); 

  }

  public reservationRoom() {
                    //this.reservationForm.value.id
  let data = "id="+this.data['id']+"&ime="+this.reservationForm.value.ime+"&od="+this.reservationForm.value.od+"&do="+this.reservationForm.value.do+"&token="+localStorage.getItem('token');

  const headers = new Headers();
  headers.set('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('token', localStorage.getItem('token'));
  this._http.post('http://localhost:8080/IT255-PZ/reservation.php', data, {headers:headers}).subscribe( data => {
      let obj = JSON.parse(data["_body"]);
     // console.log(obj);
     // localStorage.setItem('token', obj.token);
      this._router.navigate(['reservationslist']);
      alert("Uspesno ste se rezervisali sobu");
   },
    err => {
      let obj = JSON.parse(err._body);
      let element  = <HTMLElement> document.getElementsByClassName("alert")[0];
      element.style.display = "block";
      element.innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
      //this._router.navigate(['']);
    }
  );

}





}

