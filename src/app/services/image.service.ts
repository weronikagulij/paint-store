import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserComment } from '../image/comment';

@Injectable()
export class ImageService {

  constructor(private _http: HttpClient) { }

  public selectImages() {
    return this._http.get('http://localhost/rysujemy/selectImages.php');
  }

  public ImageByPath(path: string) {
    return this._http.post('http://localhost/rysujemy/selectImageById.php', path);
  }

  public CommentsByImgPath(path: string) {
    return this._http.post('http://localhost/rysujemy/commentsByImgId.php', path);
  }

  public userByPath(path: string) {
    return this._http.post('http://localhost/rysujemy/userById.php', path);
  }

  public imagesByUserPath(path: string) {
    return this._http.post('http://localhost/rysujemy/ImagesByUserId.php', path);
  }

  public uploadImages(image: FormData) {
    //console.log(image, description);
    return this._http.post('http://localhost/rysujemy/imgUpload.php', image);
  }

  public uploadComment(comment: string) {
    return this._http.post('http://localhost/rysujemy/uploadComment.php', comment);
  }

}
