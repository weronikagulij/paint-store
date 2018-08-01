import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from '../services/image.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private images: any = [];
  
  private animationSpeed = 500;
  private animationDelay = 1000;

  constructor(private imgService: ImageService) { }

  ngOnInit() {
    // this.imgService.selectImages()
    //   .subscribe(res => {
    //     this.images = res;
    //     //console.log(res);
    //   }, error => {
    //     //console.log(error);
    //   });
    //
    window.addEventListener('scroll', this.animatePage);

      var movementStrength = 25;
      var height = movementStrength / $(window).height();
      var width = movementStrength / $(window).width();
      $(".animation-content").mousemove(function(e){
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
        $('.animation-content').css("background-position", newvalueX+"px     "+newvalueY+"px");
      });
  }

  animatePage() {
    console.log('hello');
    $('.animation-content').addClass('hidden');

    setTimeout(function() {
      $('.animation-container').addClass('completed');
    }, 600 + 400);

    setTimeout(function() {
      $('.animation-content').removeClass('hidden');
    }, 1200 + 400);
    // $('.animation-container').addClass('completed');
    // window.removeEventListener('scroll', this.doSth);
  }

}
