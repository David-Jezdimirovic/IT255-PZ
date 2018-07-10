import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from '../stranice/pocetna/pocetna.component';
import { SobeComponent } from '../stranice/sobe/sobe.component';
import { PretragaSobaComponent } from '../stranice/pretraga/pretraga.soba.component';
import { KontaktComponent } from '../stranice/kontakt/kontakt.component';
import { DodavanjeSobeComponent } from '../stranice/dodavanjeSobe/dodavanjeSobe.component';
import { RegistracijaComponent } from '../stranice/registracija/registracija.component';
import { Registracija2Component } from '../stranice/registracija2/registracija2.component';
import { LoginComponent } from '../stranice/login/login.component';
import { AllroomtypesComponent } from '../stranice/allroomtypes/allroomtypes.component';
import { RoomComponent } from '../stranice/room/room.component';
import { UpdateroomComponent } from '../stranice/updateroom/updateroom.component';
import { UpdateroomtypeComponent } from '../stranice/updateroomtype/updateroomtype.component';
import { KorisniciComponent } from '../stranice/korisnici/korisnici.component';
import { UpdateuserComponent } from '../stranice/updateuser/updateuser.component';
import { UserComponent } from '../stranice/user/user.component';
import { ReservationComponent } from '../stranice/reservation/reservation.component';
import { ReservationslistComponent } from '../stranice/reservationslist/reservationslist.component';
import { ViewreservationComponent } from '../stranice/viewreservation/viewreservation.component';
import { ChangepasswordComponent } from '../stranice/changepassword/changepassword.component';


const routes: Routes = [
   //{ path: '', component: PocetnaComponent}, //index stranica
   { path: '', redirectTo: 'pocetna', pathMatch: 'full'}, // redirekcija na pocetnu stranicu
   { path: 'pocetna', component: PocetnaComponent },
   { path: 'sobe', component: SobeComponent },
   { path: 'pretraga', component: PretragaSobaComponent },
   { path: 'allroomtypes', component: AllroomtypesComponent },
   { path: 'kontakt', component: KontaktComponent },
   { path: 'dodavanjeSobe', component: DodavanjeSobeComponent },
   { path: 'registracija', component: RegistracijaComponent },
   { path: 'registracija2', component: Registracija2Component },
   { path: 'login', component: LoginComponent },
   { path: 'room/:id', component: RoomComponent },
   { path: 'updateroom/:id', component: UpdateroomComponent },
   { path: 'updateroomtype/:id', component: UpdateroomtypeComponent },
   { path: 'korisnici', component: KorisniciComponent },
   { path: 'updateuser/:id', component: UpdateuserComponent },
   { path: 'user/:id', component: UserComponent },
   { path: 'reservation/:id', component: ReservationComponent },
   { path: 'viewreservation/:id', component: ViewreservationComponent },
   { path: 'reservationslist', component: ReservationslistComponent },
   { path: 'changepassword', component: ChangepasswordComponent },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class RoutingModule { }
