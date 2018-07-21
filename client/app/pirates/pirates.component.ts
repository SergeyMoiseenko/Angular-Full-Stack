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
    const containerSize = {x: 1200, y: 675};
    const app = new PIXI.Application(containerSize.x, containerSize.y, {backgroundColor : 0x1099bb});
    this.container.nativeElement.appendChild(app.view);

    const renderer = app.renderer;
    renderer.resolution = 1;
    const container = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(this.createShip(130, 63)); // 500, 424
    app.stage.addChild(this.createWoodenModal());

    const slide = background(containerSize, new PIXI.Sprite(IMGS.BACKGROUND_SEA), 'cover');
    container.addChild(slide);

    renderer.render(app.stage);
  }

  createWoodenModal() {
    const woodenModal = new PIXI.Container();
    woodenModal.width = 286;
    woodenModal.height = 376;
    woodenModal.x = 884;
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
      fontFamily: 'pixel_bold',
      fontSize: 28,
      wordWrap: true,
      wordWrapWidth: 206,
      fill: 0xffffff,
    };

    woodenModal.addChild(woodenModalBackground);
    woodenModal.addChild(woodenModalTop);
    woodenModal.addChild(woodenModalTitle);
    woodenModal.addChild(woodenModalBottom);

    return woodenModal;
  }

  createShip(x, y) {
    const scale = 0.625;

    const shipContainer = new PIXI.Container();

    const shipImg = new PIXI.Sprite(IMGS.SHIP);
    shipImg.position = { x: 0, y: 0 };
    shipImg.scale = { x: scale, y: scale };
    shipContainer.addChild(shipImg);

    const shadowImg = new PIXI.Sprite(IMGS.SHIP_SHADOW);
    shadowImg.scale = { x: scale, y: scale };
    shadowImg.position = { x: 20, y: shipImg.height };
    shipContainer.addChild(shadowImg);

    this.addPirateToShip(shipContainer, 85, 65, IMGS.PIRATE_1, scale);
    this.addPirateToShip(shipContainer, 275, 315, IMGS.PIRATE_2, scale);
    this.addPirateToShip(shipContainer, 435, 295, IMGS.PIRATE_3, scale);
    this.addPirateToShip(shipContainer, 85, 385, IMGS.PIRATE_4, scale);
    this.addPirateToShip(shipContainer, 315, 385, IMGS.PIRATE_5, scale);

    shipContainer.width = shipImg.width;
    shipContainer.height = shipImg.height + shadowImg.height;
    shipContainer.x = x;
    shipContainer.y = y;
    return shipContainer;
  }

  addPirateToShip(shipContainer, x, y, pirateResources, scale) {
    const sprite = new PIXI.Sprite(pirateResources);
    sprite.scale = { x: scale, y: scale };
    sprite.position = { x, y };
    shipContainer.addChild(sprite);
  }
}
