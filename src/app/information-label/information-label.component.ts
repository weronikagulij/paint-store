import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ShortUserInfo } from "../classes/short-user-info";
import { IsUserLoggedIn } from "../classes/is-user-logged-in";

@Component({
  selector: "app-information-label",
  templateUrl: "./information-label.component.html",
  styleUrls: ["./information-label.component.scss"]
})
export class InformationLabelComponent implements OnInit {
  @ViewChild("wrapper") wrapper;
  @Input() loggedUser: IsUserLoggedIn;
  private labelName: string;
  private data: ShortUserInfo[];

  constructor() {}

  ngOnInit() {
    console.log(this.loggedUser);
    document.addEventListener("click", e => {
      if ((<any>e).path[0].classList.contains("message-container")) {
        this.close();
      }
    });
  }

  close() {
    const el = this.wrapper.nativeElement;
    el.classList.remove("opacity");
    setTimeout(() => {
      el.classList.remove("display");
      document.querySelector("body").classList.remove("stop-scrolling");
    }, 200);
  }

  show(data, name) {
    document.querySelector("body").classList.add("stop-scrolling");
    const el = this.wrapper.nativeElement;
    el.classList.add("display");
    setTimeout(() => {
      el.classList.add("opacity");
    }, 0);
    this.labelName = name;
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getLabelName() {
    return this.labelName;
  }
}
