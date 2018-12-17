import { Component, OnInit, ViewChild } from "@angular/core";
import { ImageService } from "../services/image.service";
import { ActivatedRoute } from "@angular/router";
// import {isComponentView} from "@angular/core/src/view/util";
import { UserComment } from "./comment";
import { NgForm } from "@angular/forms";
import { AgreeLabelComponent } from "../agree-label/agree-label.component";
import { ShortUserInfo } from "../classes/short-user-info";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"]
})
export class ImageComponent implements OnInit {
  @ViewChild("msg") Message;
  @ViewChild("msgDelete") msgDelete;
  @ViewChild("confirmLabel") confirmLabel;
  @ViewChild("label") label;
  private _image: ImageExact = {
    commentsCount: 0,
    creationDate: "",
    description: "",
    id: 0,
    imgLink: "",
    likeCount: 0,
    tagsList: [],
    title: "",
    userId: 0,
    userOwnerImgLink: "",
    userOwnerName: "",
    liked: false
  };

  private _comments: Comment[];
  private userId = 1; // TO DO: logowanie
  private formValid = true;
  private _loading = false;
  private commentIdToRemove = null;
  private _loggedUser = {
    isLoggedIn: true,
    userId: 1
  };

  constructor(private service: ImageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCommentsData();
    this.getImageData();
  }

  getImageData() {
    this.service
      .ImageByPath(
        this._loggedUser.userId.toString(),
        this.route.snapshot.params.id
      )
      .subscribe(res => {
        this._image = <ImageExact>res;
        // console.log(res);
      });
  }

  getCommentsData() {
    this.service
      .CommentsByImgPath(
        this._loggedUser.userId.toString(),
        this.route.snapshot.params.id
      )
      .subscribe(res => {
        this._comments = <Comment[]>res;
        this._comments.forEach(comm => {
          comm.isEditing = false;
          comm.editValid = true;
        });

        // console.log(this._comments);
      });
  }

  isCommentValid(text: string): boolean {
    if (text === null) return false;
    if (typeof text === undefined) return false;
    if (text === "") return false;
    if (typeof text.length === undefined || text.length < 5) return false;
    return true;
  }

  onCommentUpload(form: NgForm) {
    if (!this.isCommentValid(form.value.text)) {
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
        this.Message.show("Comment uploaded succesfully.");
        this.formValid = true;
        this._loading = false;
        this.getCommentsData();
      });

      form.resetForm();
    }
  }

  confirm() {
    this.service.removeComment(this.commentIdToRemove).subscribe(res => {
      this.getCommentsData();
      this.Message.show("Comment deleted succesfully.");
    });
  }

  photoLike() {
    this._image.likeCount += 1;
    this._image.liked = true;
    this.service
      .likePost({
        userId: this._loggedUser.userId,
        postId: this.route.snapshot.params.id
      })
      .subscribe(res => {
        // console.log(res);
      });
  }

  photoUnlike() {
    this._image.likeCount -= 1;
    this._image.liked = false;
    this.service
      .unlikePost(
        this._loggedUser.userId.toString(),
        this.route.snapshot.params.id
      )
      .subscribe(res => {
        // console.log(res);
      });
  }

  showLiking() {
    let informationToSend: ShortUserInfo[];
    this.service
      .getPostLikes(
        this._loggedUser.userId.toString(),
        this.route.snapshot.params.id
      )
      .subscribe(res => {
        console.log("polubili ten post:\n", res);
        informationToSend = <ShortUserInfo[]>res;
        this.label.show(informationToSend, "Liked this image");
      });
  }

  commentShowLiked(id: number) {
    let informationToSend: ShortUserInfo[];
    this.service
      .getCommentLikes(this._loggedUser.userId.toString(), id.toString())
      .subscribe(res => {
        informationToSend = <ShortUserInfo[]>res;
        this.label.show(informationToSend, "Liked this comment");
      });
  }

  commentLike(comment) {
    comment.liked = true;
    comment.likeCount += 1;
    this.service
      .likeComment({
        userId: this._loggedUser.userId,
        commentId: comment.id
      })
      .subscribe(res => {
        // console.log(res);
      });
  }

  commentUnlike(comment) {
    comment.liked = false;
    comment.likeCount -= 1;
    this.service
      .unlikeComment(this._loggedUser.userId.toString(), comment.id)
      .subscribe(res => {
        // console.log(res);
      });
  }

  removeComment(id: number) {
    this.commentIdToRemove = id;
    this.confirmLabel.show();
  }

  editComment(comment) {
    comment.isEditing = true;
  }

  sendEditComment(form: NgForm, comment: Comment) {
    let text = form.form.value.value;
    if (this.isCommentValid(text)) {
      comment.editValid = true;
      let data = {
        id: comment.id,
        content: text
      };
      this.service.editComment(data).subscribe(res => {
        this.Message.show("Comment edited succesfully.", res);
        comment.isEditing = false;
        comment.edited = true;
        comment.content = text;
      });
    } else {
      comment.editValid = false;
    }
  }

  discard(comment) {
    comment.isEditing = false;
    comment.editValid = true;
  }

  get loggedUser() {
    return this._loggedUser;
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
  commentsCount: number;
  creationDate: string;
  description: string;
  id: number;
  imgLink: string;
  likeCount: number;
  tagsList: number[];
  title: string;
  userId: number;
  userOwnerImgLink: string;
  userOwnerName: string;
  liked: boolean;
}

interface Comment {
  content: string;
  creationDate: string;
  edited: boolean;
  id: number;
  likeCount: number;
  liked: boolean;
  userId: number;
  userName: string;
  userOwnerImgLink: string;
  isEditing: boolean;
  editValid: boolean;
}
