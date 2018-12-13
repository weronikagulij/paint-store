import { Component, OnInit, Input } from "@angular/core";
import { IsUserLoggedIn } from "../classes/is-user-logged-in";

@Component({
  selector: "app-follow-button",
  templateUrl: "./follow-button.component.html",
  styleUrls: ["./follow-button.component.scss"]
})
export class FollowButtonComponent implements OnInit {
  @Input() loggedUser: IsUserLoggedIn;
  @Input() idDestinateUser;
  public class = "";
  constructor() {}

  ngOnInit() {
    // logged user can not follow himself
    if (this.loggedUser.userId === this.idDestinateUser) this.class = "hidden";

    // if logged user already follows this user
    // to do
  }

  follow() {
    console.log(this.loggedUser, this.idDestinateUser);
  }
}
