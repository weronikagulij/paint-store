import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IsUserLoggedIn } from "../classes/is-user-logged-in";
import { FollowingData } from "../classes/following-data";
import { ImageService } from "../services/image.service";

@Component({
  selector: "app-follow-button",
  templateUrl: "./follow-button.component.html",
  styleUrls: ["./follow-button.component.scss"]
})
export class FollowButtonComponent implements OnInit {
  @Input() loggedUser: IsUserLoggedIn;
  @Input() idDestinateUser: number;
  @Input() followed: boolean;
  // @Output() emitter: EventEmitter<any> = new EventEmitter();
  public class = "";
  constructor(private service: ImageService) {}

  ngOnInit() {
    // if logged user already follows this user
    // to do
  }

  follow() {
    let data: FollowingData = {
      followedUserId: this.idDestinateUser,
      followingUserId: this.loggedUser.userId
    };
    this.service.follow(data).subscribe(res => {
      // console.log(res);
      // this.emitter.emit(this);
      this.followed = true;
      console.log(this.followed);
    });
  }

  unFollow() {
    let data: FollowingData = {
      followedUserId: this.idDestinateUser,
      followingUserId: this.loggedUser.userId
    };

    this.service.unfollow(data).subscribe(res => {
      // console.log(res);
      // this.emitter.emit(this);
      this.followed = false;
      console.log(this.followed);
    });
  }
}
