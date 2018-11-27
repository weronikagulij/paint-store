import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";

import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { ImageComponent } from "./image/image.component";
import { MessagesComponent } from "./messages/messages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SearchComponent } from "./search/search.component";
import { ImageService } from "./services/image.service";
import { AddPhotoComponent } from "./add-photo/add-photo.component";
import { MenuComponent } from "./menu/menu.component";
import { RegisterComponent } from "./register/register.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { MenuLeftComponent } from "./homepage/menu-left/menu-left.component";
import { IndexComponent } from "./user/index.component";
import { FooterComponent } from "./footer/footer.component";
import { FileDropModule } from "ngx-file-drop";

const appRoutes: Routes = [
  {
    path: "",
    component: HomepageComponent
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: "trending",
    component: HomepageComponent
  },
  {
    path: "recent",
    component: HomepageComponent
  },
  {
    path: "image/:id",
    component: ImageComponent
  },
  {
    path: "messages",
    component: MessagesComponent
  },
  {
    path: "user/:id",
    component: ProfileComponent,
    children: [
      {
        path: "recent",
        component: ProfileComponent
      }
    ]
  },
  {
    path: "upload-image",
    component: AddPhotoComponent
  },
  {
    path: "homepage",
    component: IndexComponent
  },
  {
    path: "homepage",
    component: IndexComponent
  },
  // {
  //   path: "homepage",
  //   component: IndexComponent,
  //   children: [
  //     {
  //       path: "sign-in",
  //       component: SignInComponent
  //     }
  //   ]
  // },
  {
    path: "**",
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
    AddPhotoComponent,
    MenuComponent,
    RegisterComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MenuLeftComponent,
    IndexComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatTabsModule,
    FileDropModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
