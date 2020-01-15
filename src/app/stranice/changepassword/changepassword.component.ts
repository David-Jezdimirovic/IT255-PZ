import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private _http: Http, private _router: Router) { }

  public changePasswordForm = new FormGroup({
    sifra1: new FormControl(),
    sifra2: new FormControl(),
   
  });

  ngOnInit() {
    if(!localStorage.getItem('token')) {
      this._router.navigateByUrl('');
    }
  }
  



  public changePassword() {
    const data = 'sifra1=' + this.changePasswordForm.value.sifra1 + '&sifra2=' + this.changePasswordForm.value.sifra2+ '&token=' + localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.post('http://localhost:8080/IT255-PZ/changepassword.php', data, { headers: headers}).subscribe((result) => {
      this._router.navigateByUrl('changepassword');

      this.changePasswordForm.controls['sifra1'].setValue('');
     this.changePasswordForm.controls['sifra2'].setValue('');
   alert("Sifra uspesno promenjena");

   const element  = <HTMLElement> document.getElementsByClassName('alert')[0];
      element.style.display = 'none';
    //  const obj="Sifra uspesno izmenjena";
    //  element.innerHTML = obj;
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
