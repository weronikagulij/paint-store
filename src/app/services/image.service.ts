import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserComment } from "../image/comment";

@Injectable()
export class ImageService {
  private host = "http://paintstorerest.azurewebsites.net/";
  constructor(private _http: HttpClient) {}

  public selectRecentImages() {
    return this._http.get(this.host + "api/Posts/AllPosts/the_newest");
  }

  public selectPopularImages() {
    return this._http.get(this.host + "api/Posts/AllPosts/most_popular");
  }

  public selectFollowedImages(id: number) {
    return this._http.get(this.host + "api/Posts/" + id + "/GetFollowingPosts");
  }

  public ImageByPath(id: string) {
    return this._http.get(this.host + "api/Posts/" + id);
  }

  public CommentsByImgPath(id: string) {
    return this._http.get(this.host + "api/Comments/" + id);
  }

  public userByPath(path: string) {
    return this._http.post("http://localhost/rysujemy/userById.php", path);
  }

  public imagesByUserPath(path: string) {
    return this._http.post(
      "http://localhost/rysujemy/ImagesByUserId.php",
      path
    );
  }

  public uploadImages(image: FormData) {
    //console.log(image, description);
    return this._http.post("http://localhost/rysujemy/imgUpload.php", image);
  }

  public uploadComment(comment) {
    return this._http.post(this.host + "api/Comments/AddPostComment", comment);
  }

  public removeComment(id: number) {
    return this._http.delete(
      this.host + "api/Comments/DeletePostComment/" + id
    );
  }

  public selectUserById(id: number) {
    return this._http.get(this.host + "api/Users/" + id);
  }

  public selectUserRecentImages(id: string) {
    // console.log(this.host + "api/Users/" + id + "/GetPosts");
    return this._http.get(this.host + "api/Users/" + id + "/GetPosts");
  }
}
