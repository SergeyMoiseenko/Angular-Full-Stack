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

      const woodenModal = new PIXI.Container();
      woodenModal.width = 286;
      woodenModal.height = 376;
      woodenModal.x = 794;
      woodenModal.y = 30;

      const woodenModalBackground = new PIXI.extras.TilingSprite(IMGS.CONT_BG);
      woodenModalBackground.width = 286;
      woodenModalBackground.height = 300;
      woodenModalBackground.y = 38;

      const woodenModalTop = new PIXI.Sprite(IMGS.CONT_HEADER);
      woodenModalTop.width = 286;
      woodenModalTop.height = 38;

      const woodenModalBottom = new PIXI.Sprite(IMGS.CONT_FOOTER);
      woodenModalBottom.width = 286;
      woodenModalBottom.height = 38;
      woodenModalBottom.y = 338;

      const woodenModalTitle = new PIXI.Text('СОКРОВИЩНИЦА');
      woodenModalTitle.width = 206;
      woodenModalTitle.x = 40;
      woodenModalTitle.y = 30;
      woodenModalTitle.style = {
        fontFamily: 'Arial',
        fontSize: 16,
        wordWrap: true,
        wordWrapWidth: 206,
        fill: 0xffffff,
      };

      woodenModal.addChild(woodenModalBackground);
      woodenModal.addChild(woodenModalTop);
      woodenModal.addChild(woodenModalTitle);
      woodenModal.addChild(woodenModalBottom);

    app.stage.addChild(container);

    const slide = background(containerSize, new PIXI.Sprite(IMGS.BACKGROUND_SEA), 'cover');
    container.addChild(slide);
    container.addChild(woodenModal);

    renderer.render(app.stage);
  }
}
