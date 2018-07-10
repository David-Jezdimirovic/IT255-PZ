import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { locateHostElement } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-dodavanjeSobe',
  templateUrl: './dodavanjeSobe.component.html',
  styleUrls: ['./dodavanjeSobe.component.css']
})
export class DodavanjeSobeComponent implements OnInit {


  public room_types: any[];

  public dodavanjeSobeForm = new FormGroup({
    broj: new FormControl(),
    naziv: new FormControl(),
    tv: new FormControl(),
    kvadrati: new FormControl(),
    kreveti: new FormControl(),
    room_type: new FormControl()
  });

  public addRoomTypeForm = new FormGroup({
    tip: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) { }
  


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





  public dodajSobu() {
    var data = "broj="+this.dodavanjeSobeForm.value.broj+"&naziv="+this.dodavanjeSobeForm.value.naziv+"&tv="+this.dodavanjeSobeForm.value.tv+"&kvadrati="+this.dodavanjeSobeForm.value.kvadrati+"&kreveti="+this.dodavanjeSobeForm.value.kreveti+"&room_type_id="+this.dodavanjeSobeForm.value.room_type;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("token",localStorage.getItem("token"));
    this._http.post('http://localhost:8080/IT255-PZ/dodavanjeSobe.php',data, { headers:headers }).subscribe( data => {
      
          if(data["_body"].indexOf("error") === -1){
            alert("Uspesno dodavanje sobe");
            this._router.navigateByUrl('pretraga');
          }else{
            alert("Neuspesno dodavanje sobe");
          }
           console.log(JSON.parse)
        }
      );


  }


  public addRoomType() {
    const data = 'tip=' + this.addRoomTypeForm.value.tip;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.post('http://localhost:8080/IT255-PZ/addroomtype.php', data, { headers: headers}).subscribe((result) => {
      this._router.navigateByUrl('allroomtypes');
     
   },
    err => {
      const obj = JSON.parse(err._body);
      const element  = <HTMLElement> document.getElementsByClassName('alert')[0];
      element.style.display = 'block';
      element.innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\"').join('');
    }
  );

 }

 

}
