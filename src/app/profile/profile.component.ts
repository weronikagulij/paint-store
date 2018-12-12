import { Component, OnInit } from "@angular/core";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  private user: User = {
    about: "",
    accountId: 0,
    avatarImgLink: "",
    backgroundImgLink: "",
    followedCount: 0,
    followingCount: 0,
    id: 0,
    link: "",
    mostUsedCategoryToolName: "",
    name: "",
    postsCount: 0
  };

  private url = this.route.snapshot.params.id;
  private loggedUser = {
    loggedIn: true,
    userId: 1
  };

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.imageService
      .selectUserById(this.route.snapshot.params.id)
      .subscribe(res => {
        this.user = res[0];
      });
  }

  showFollowed() {}

  showFollowing() {}

  getUser() {
    return this.user;
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  getUrl() {
    return this.url;
  }
}

interface User {
  about: string;
  accountId: number;
  avatarImgLink: string;
  backgroundImgLink: string;
  followedCount: number;
  followingCount: number;
  id: number;
  link: string;
  mostUsedCategoryToolName: string;
  name: string;
  postsCount: number;
}
