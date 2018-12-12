import { Component, OnInit, ViewChild } from "@angular/core";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";
// import {isComponentView} from "@angular/core/src/view/util";
import { UserComment } from "./comment";
import { NgForm } from "@angular/forms";
import { AgreeLabelComponent } from "../agree-label/agree-label.component";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"]
})
export class ImageComponent implements OnInit {
  @ViewChild("msg") Message;
  @ViewChild("msgDelete") msgDelete;
  @ViewChild("confirmLabel") confirmLabel;
  private _image: ImageExact = {
    categoryToolName: "",
    categoryTypeName: "",
    commentsCount: 0,
    creationDate: "",
    description: "",
    id: 0,
    imgLink: "",
    likeCount: 0,
    title: "",
    userId: 0,
    userOwnerImgLink: "",
    userOwnerName: "",
    viewCount: 0
  };
  private _comments: Comment[];
  private userId = 1; // TO DO: logowanie
  private formValid = true;
  private _loading = false;
  private commentIdToRemove = null;

  constructor(private service: ImageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCommentsData();
    this.getImageData();
  }

  getImageData() {
    this.service.ImageByPath(this.route.snapshot.params.id).subscribe(res => {
      this._image = <ImageExact>res[0];
    });
  }

  getCommentsData() {
    this.service
      .CommentsByImgPath(this.route.snapshot.params.id)
      .subscribe(res => {
        this._comments = <Comment[]>res;
      });
  }

  onCommentUpload(form: NgForm) {
    if (
      form.value.text == null ||
      form.value.text === "" ||
      form.value.text.length < 5
    ) {
      // if comment is null
      this.formValid = false;
    } else {
      this._loading = true;
      const comment = {
        PostId: this.route.snapshot.params.id,
        UserId: this.userId,
        Content: form.value.text,
        LikeCount: 0
      };
      // send message
      this.service.uploadComment(comment).subscribe(res => {
        this.Message.showMessage();
        this.formValid = true;
        this._loading = false;
      });

      form.resetForm();
    }
  }

  confirm() {
    this.service.removeComment(this.commentIdToRemove).subscribe(res => {
      this.getCommentsData();
      this.msgDelete.showMessage();
    });
  }

  photoLike() {
    console.log("liked");
  }

  removeComment(id: number) {
    this.commentIdToRemove = id;
    this.confirmLabel.show();
  }

  get image(): ImageExact {
    return this._image;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  get loading(): boolean {
    return this._loading;
  }
}

interface ImageExact {
  categoryToolName: string;
  categoryTypeName: string;
  commentsCount: number;
  creationDate: string;
  description: string;
  id: number;
  imgLink: string;
  likeCount: number;
  title: string;
  userId: number;
  userOwnerImgLink: string;
  userOwnerName: string;
  viewCount: number;
}

interface Comment {
  content: string;
  creationDate: string;
  id: number;
  likeCount: number;
  userId: number;
  userOwnerImgLink: string;
}
