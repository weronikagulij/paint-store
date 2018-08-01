import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Photo } from './photo';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  private selectedFile = null;
  private formValid = false;
  private validationText = "";

  constructor(private service: ImageService) { }
  ngOnInit() {}
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
  }
  onFormUpload(form: NgForm) {
    if (form.value.description === ''
        || form.value.description == null
        || form.value.title === ''
        || form.value.title == null
        || this.selectedFile === null) {
          this.formValid = false;
          this.validationText = "Proszę wypełnić wszystkie pola.";
          this.show(1);
          this.fade(0);
    }
    else this.formValid = true;

    if (this.formValid === true) {

      const fd = new FormData();
      fd.append('author', 'zosia');
      fd.append('title', form.value.title);
      fd.append('description', form.value.description);
      fd.append('image', this.selectedFile);


      this.service.uploadImages(fd)
        .subscribe(res => {
          form.resetForm();
          this.show(0);
          this.fade(1);
        }, err => {
          //console.log('Sorry, there was an error.');
          console.log(err);
        });
    }
    form.resetForm();
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

