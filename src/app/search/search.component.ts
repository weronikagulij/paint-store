import { Component, OnInit } from "@angular/core";
import { ImageService } from "../services/image.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  constructor(private service: ImageService) {}

  ngOnInit() {}

  search(value) {
    // console.log(value);
    this.service.search(value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log("error!", error);
      }
    );
  }
}
