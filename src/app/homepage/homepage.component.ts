import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // private images: any = [];
  
  // private animationSpeed = 500;
  // private animationDelay = 1000;

  constructor(private imgService: ImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.menuLeft.nativeElement);
    // this.params = this.activatedRoute.snapshot.queryParams;
    // console.log(this.params);
    // this.imgService.selectImages()
    //   .subscribe(res => {
    //     this.images = res;
    //     //console.log(res);
    //   }, error => {
    //     //console.log(error);
    //   });
    //
    
    // this.animatePage();
    // $(document).one('mousewheel', this.animatePage);

    
  }

  // animatePage() {
  //   $('.animation-content').addClass('hidden');

  //   setTimeout(function() {
  //     $('.animation-container').addClass('completed');
  //   }, 600 + 400);

  //   setTimeout(function() {
  //     $('.animation-content').removeClass('hidden');
  //   }, 1200 + 400);
  // }

  // animateBackground() {
  //   var movementStrength = 25;
  //   var height = movementStrength / $(window).height();
  //   var width = movementStrength / $(window).width();
  //   $(".animation-content").mousemove(function(e){
  //     var pageX = e.pageX - ($(window).width() / 2);
  //     var pageY = e.pageY - ($(window).height() / 2);
  //     var newvalueX = width * pageX * -1 - 25;
  //     var newvalueY = height * pageY * -1 - 50;
  //     $('.animation-content').css("background-position", newvalueX+"px     "+newvalueY+"px");
  //   });
  // }

}
