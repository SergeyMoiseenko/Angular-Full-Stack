import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { background, IMGS, loadResources } from './Utils';

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

    setTimeout( () => {
      loadResources(this.runGame.bind(this));
    }, 0);
  }

  runGame() {
    const containerSize = {x: 1110, y: 624};
    const app = new PIXI.Application(containerSize.x, containerSize.y, {backgroundColor : 0x1099bb});
    this.container.nativeElement.appendChild(app.view);

    const renderer = app.renderer;
    const container = new PIXI.Container();

    app.stage.addChild(container);

    const slide = background(containerSize, new PIXI.Sprite(IMGS.BACKGROUND_SEA), 'cover');
    container.addChild(slide);

    renderer.render(app.stage);
  }

}
