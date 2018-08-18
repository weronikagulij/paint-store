import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
// import { NbThemeModule } from '@nebular/theme';
// import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageComponent } from './image/image.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { ImageService } from './services/image.service';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuLeftComponent } from './homepage/menu-left/menu-left.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'trending',
    component: HomepageComponent
  },
  {
    path: 'recent',
    component: HomepageComponent
  },
  {
    path: 'image/:id',
    component: ImageComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'user/:id',
    component: ProfileComponent
  },
  {
    path: 'upload-image',
    component: AddPhotoComponent
  },
  {
    path: 'signup',
    component: UserComponent,
    children: [{
      path: '', component: SignUpComponent
    }]
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{
      path:'', component: SignInComponent
    }]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ImageComponent,
    MessagesComponent,
    NotFoundComponent,
    SearchComponent,
    UserComponent,
    AddPhotoComponent,
    MenuComponent,
    RegisterComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MenuLeftComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    // NbLayoutModule,
    // NbSidebarModule,
   // NbThemeModule.forRoot({ name: 'cosmic' }), // or cosmic for other theme
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [//NbSidebarService
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
