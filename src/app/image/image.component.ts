import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';
// import {isComponentView} from "@angular/core/src/view/util";
import { UserComment } from './comment';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  private image: any = null;
  private comments: any = null;
  private numberOfComments = 0;

  private formValid = false;
  private formSend = false;

  constructor(private service: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.ImageByPath({ImgLink: this.route.snapshot.params.id})
       .subscribe(res => {
         this.image = res[0];
         console.log("KUPA", res);
       });
    this.service.CommentsByImgPath(this.route.snapshot.params.id)
      .subscribe(res => {
        this.comments = res;
        this.numberOfComments = this.comments.length;
        console.log(res);
      }, error => {});
  }
  onCommentUpload(form: NgForm) {

    if ( form.value.text == null || form.value.text === '') {

      // if comment is null
      this.formValid = false;
      this.show(1);
      this.fade(0);
    } else {

      // utworz komentarz
      const comment = new UserComment('Zosia', form.value.text, this.route.snapshot.params.id);
      // wyslij
      this.service.uploadComment( JSON.stringify( comment ) )
        .subscribe(res => {
          this.show(0);
          this.fade(1);
        }, err => {
          //console.log(err);
        });

      form.resetForm();
    }
    //autor
  }

  show($event) {
    document.getElementsByClassName('alert')[$event].classList.remove('fade');
    document.getElementsByClassName('alert')[$event].classList.add('show');
  }

  fade($event) {
    document.getElementsByClassName('alert')[$event].classList.remove('show');
    document.getElementsByClassName('alert')[$event].classList.add('fade');
  }

}
