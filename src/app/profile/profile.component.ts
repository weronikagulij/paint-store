import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private section: String;
  private person: any;
  constructor(private service: ImageService, private route: ActivatedRoute) {
    this.section = 'gallery';
  }

  ngOnInit() {
    this.service.userByPath(this.route.snapshot.params.id)
      .subscribe(res => {
        this.person = res[0];
      });
  }

  onClick($e) {
    if($e==='gallery') this.section = 'gallery';
    if($e==='information') this.section = 'information';
    if($e==='followed') this.section = 'followed';
  }

}
