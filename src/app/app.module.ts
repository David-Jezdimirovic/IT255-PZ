import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { PocetnaComponent } from './stranice/pocetna/pocetna.component';
import { SobeComponent } from './stranice/sobe/sobe.component';
import { KontaktComponent } from './stranice/kontakt/kontakt.component';
import { PretragaSobaComponent } from './stranice/pretraga/pretraga.soba.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchpipePipe } from './pipes/search';
import { SearchuserPipe } from './pipes/searchuser';
import { SearchroomPipe } from './pipes/searchroom';
import { SortPipe } from './pipes/sort';
import { RoutingModule } from './routing/routing.module';
import { RegistracijaComponent } from './stranice/registracija/registracija.component';
import { DodavanjeSobeComponent } from './stranice/dodavanjeSobe/dodavanjeSobe.component';
import { LoginComponent } from './stranice/login/login.component';
import { NavbarComponent } from './stranice/navbar/navbar.component';
import { RoomComponent } from './stranice/room/room.component';
import { AllroomtypesComponent } from './stranice/allroomtypes/allroomtypes.component';
import { UpdateroomComponent } from './stranice/updateroom/updateroom.component';
import { UpdateroomtypeComponent } from './stranice/updateroomtype/updateroomtype.component';
import { Navbar2Component } from './stranice/navbar2/navbar2.component';
import { Registracija2Component } from './stranice/registracija2/registracija2.component';
import { KorisniciComponent } from './stranice/korisnici/korisnici.component';
import { UpdateuserComponent } from './stranice/updateuser/updateuser.component';
import { UserComponent } from './stranice/user/user.component';
import { ReservationComponent } from './stranice/reservation/reservation.component';
import { ReservationslistComponent } from './stranice/reservationslist/reservationslist.component';
import { ViewreservationComponent } from './stranice/viewreservation/viewreservation.component';
import { ChangepasswordComponent } from './stranice/changepassword/changepassword.component';







@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    SobeComponent,
    KontaktComponent,
    PretragaSobaComponent,
    SearchpipePipe,
    SearchuserPipe,
    SearchroomPipe,
    SortPipe,
    RegistracijaComponent,
    DodavanjeSobeComponent,
    LoginComponent,
    NavbarComponent,
    RoomComponent,
    AllroomtypesComponent,
    UpdateroomComponent,
    UpdateroomtypeComponent,
    Navbar2Component,
    Registracija2Component,
    KorisniciComponent,
    UpdateuserComponent,
    UserComponent,
    ReservationComponent,
    ReservationslistComponent,
    ViewreservationComponent,
    ChangepasswordComponent,
   
    
    

    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
 
  ],
  providers: [],
  exports: [SearchpipePipe, SearchroomPipe, SearchuserPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
