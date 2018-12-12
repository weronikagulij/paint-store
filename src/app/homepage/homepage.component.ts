import { Component, OnInit } from "@angular/core";
import { ImageService } from "../services/image.service";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"]
})
export class HomepageComponent implements OnInit {
  private _images: Image[];

  private user = {
    loggedIn: true,
    userId: 1
  };

  constructor(
    private imgService: ImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.user.loggedIn) {
      if (this.router.url === "/") {
        this.followedImages();
      } else if (this.router.url === "/trending") {
        this.popularImages();
      } else {
        this.recentImages();
      }
    } else {
      if (this.router.url === "/") {
        this.popularImages();
      } else {
        this.recentImages();
      }
    }
  }

  recentImages() {
    this.imgService.selectRecentImages().subscribe(res => {
      this._images = <Image[]>res;
    });
  }

  popularImages() {
    this.imgService.selectPopularImages().subscribe(res => {
      this._images = <Image[]>res;
    });
  }

  followedImages() {
    this.imgService.selectFollowedImages(this.user.userId).subscribe(res => {
      this._images = <Image[]>res;
    });
  }

  get images(): Array<Image> {
    return this._images;
  }

  public isLoggedIn(): boolean {
    return this.user.loggedIn;
  }
}

interface Image {
  id: number;
  userId: number;
  userOwnerName: string;
  userOwnerImgLink: string;
  title: string;
  imgLink: string;
  likeCount: number;
  viewCount: number;
  commentsCount: number;
}
