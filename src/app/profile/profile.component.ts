import { Component, OnInit } from "@angular/core";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  private section: String;
  private person: any;
  private url = this.route.snapshot.params.id;

  constructor(private service: ImageService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    // this.service.userByPath(this.route.snapshot.params.id).subscribe(res => {
    //   this.person = res[0];
    //   console.log("kaappa", res);
    // });
  }

  getUrl() {
    return this.url;
  }
}
