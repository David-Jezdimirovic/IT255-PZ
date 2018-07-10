import { Component, ViewEncapsulation, OnInit, ViewContainerRef} from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  //styleUrls: ['./app.component.css']
  styleUrls: ['../assets/scss/base.scss']
  //  styles: [
  //    require ('../assets/scss/base.scss')
  //  ]
})



export class AppComponent implements OnInit{
  //title = 'app';
 
  ngOnInit(){
}
 

 
  
}
