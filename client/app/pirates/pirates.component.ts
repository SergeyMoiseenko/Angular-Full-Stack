import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { background } from './Utils';

declare var PIXI: any;

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.css']
})
export class PiratesComponent implements OnInit, AfterViewInit {

  constructor(
    /* @Inject('PIXI') public pixi: typeof PIXI, */
  ) {}

  @ViewChild('gameContainer') container: ElementRef;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const containerSize = {x: 1110, y: 624};
    setTimeout( () => {
      const app = new PIXI.Application(containerSize.x, containerSize.y, {backgroundColor : 0x1099bb});
      this.container.nativeElement.appendChild(app.view);



      const renderer = app.renderer;
      const container = new PIXI.Container();

      app.stage.addChild(container);

      PIXI.loader.add('assets/img/bg_ocean_middle.png').load(function () {
          const slide = background(containerSize, new PIXI.Sprite.fromImage('assets/img/bg_ocean_middle.png'), 'cover');
          container.addChild(slide);

          renderer.render(app.stage);
      });

    }, 0);
  }

}
