import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { FriendsComponent } from './views/main/features/friends/friends.component';
import { GroupsComponent } from './views/main/features/groups/groups.component';
import { ActionComponent } from './views/main/features/action/action.component';
import { GroupComponent } from './views/main/group/group.component';
import { BillComponent } from './views/main/group/bill/bill.component';
import { MainComponent } from './views/main/main.component';
import { BillEditComponent } from './views/bill-edit/bill-edit.component';
import { GroupEditComponent } from './views/group-edit/group-edit.component';
import { ProfileComponent } from './views/profile/profile.component';
import { InviteComponent } from './views/invite/invite.component';
import { DataService } from './services/data.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { LogoutComponent } from './views/logout/logout.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'invite', component: InviteComponent},
  {path: 'login', component: AuthComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FriendsComponent,
    GroupsComponent,
    ActionComponent,
    GroupComponent,
    BillComponent,
    MainComponent,
    BillEditComponent,
    GroupEditComponent,
    ProfileComponent,
    InviteComponent,
    AuthComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    CookieService,
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
