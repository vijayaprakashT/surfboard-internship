import { Routes } from '@angular/router';
import { AppSignupComponent } from './app-signup/app-signup.component';
import { AppHomepageComponent } from './app-homepage/app-homepage.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppFolderComponent } from './app-folder/app-folder.component';
import { AppProfileComponent } from './app-profile/app-profile.component';
import { AppDeleteComponent } from './app-delete/app-delete.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { AppUserinfoComponent } from './app-userinfo/app-userinfo.component';


export const routes: Routes = [
    {path:'signup'  , component:AppSignupComponent},
    {path:'login'   , component:AppLoginComponent} ,
    {path:'homepage', component:AppHomepageComponent},
    {path:'folder'  , component:AppFolderComponent},
    {path:'profile' , component:AppProfileComponent},
    {path:'useraccess',component:AppUserinfoComponent},
    {path:'delete'  , component:AppDeleteComponent},
    {path:'update'  , component:AppUpdateComponent}
];
