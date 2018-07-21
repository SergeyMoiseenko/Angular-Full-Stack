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
      const app = new PIXI.Application(containerSize.x, containerSize.y, { backgroundColor : 0x1099bb });
      this.container.nativeElement.appendChild(app.view);

      const renderer = app.renderer;
      const container = new PIXI.Container();

      app.stage.addChild(container);

      const woodenModal = new PIXI.Container();
      woodenModal.width = 286;
      woodenModal.height = 376;
      woodenModal.x = 794;
      woodenModal.y = 30;

      const woodenModalBackground = new PIXI.extras.TilingSprite.fromImage('assets/img/ui_container_bg.png');
      // woodenModalBackground.height = 100;
      woodenModalBackground.width = 286;
      woodenModalBackground.height = 300;
      woodenModalBackground.y = 38;

      const woodenModalTop = new PIXI.Sprite.fromImage('assets/img/ui_container_header.png');
      woodenModalTop.width = 286;
      woodenModalTop.height = 38;

      const woodenModalBottom = new PIXI.Sprite.fromImage('assets/img/ui_container_footer.png');
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

      PIXI.loader.add('assets/img/bg_ocean_middle.png').load(function () {
          const slide = background(containerSize, new PIXI.Sprite.fromImage('assets/img/bg_ocean_middle.png'), 'cover');
          container.addChild(slide);
          container.addChild(woodenModal);

          renderer.render(app.stage);
      });
    }, 0);
  }
}
