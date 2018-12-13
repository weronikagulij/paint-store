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

  public ImageByPath(userId: string, postId: string) {
    return this._http.get(this.host + "api/Posts/" + userId + "/" + postId);
  }

  public CommentsByImgPath(userId: string, postId: string) {
    return this._http.get(this.host + "api/Comments/" + userId + "/" + postId);
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
    return this._http.get(this.host + "api/Users/" + id + "/GetPosts");
  }

  public getFollowed(id: string) {
    return this._http.get(this.host + "api/Followers/GetFollowed/" + id);
  }

  public getFollowing(id: string) {
    return this._http.get(this.host + "api/Followers/GetFollowing/" + id);
  }

  public getPostLikes(id: string) {
    return this._http.get(this.host + "api/Likes/Post/" + id);
  }

  public unlikePost(data: any) {
    return this._http.post(this.host + "api/Likes/Post/RemoveLike", data);
  }

  public likePost(data: any) {
    return this._http.post(this.host + "api/Likes/Post/AddLike", data);
  }

  public getCommentLikes(id: string) {
    return this._http.get(this.host + "api/Likes/Comment/" + id);
  }

  public likeComment(data: any) {
    return this._http.post(this.host + "api/Likes/Comment/AddLike", data);
  }

  public unlikeComment(data: any) {
    return this._http.post(this.host + "api/Likes/Comment/RemoveLike", data);
  }

  public editComment(data: any) {
    return this._http.put(this.host + "/api/Comments/EditPostComment", data);
  }
}
