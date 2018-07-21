import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { background, IMGS, loadResources } from './Utils';

declare var PIXI: any;

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.css']
})
export class PiratesComponent implements OnInit, AfterViewInit {
  scale = 0.625;

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
    renderer.resolution = 4;
    const container = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(this.createShip(130, 63)); // 500, 424

    const modal1 = this.createWoodenModal('ОСАДА GEEKNIGHT', 975, 30);
    const modal2 = this.createWoodenModal('СОКРОВИЩНИЦА', 975, modal1.height + 60);
    const modal3 = this.createWoodenModal('БОРТЖУРНАЛ', 975, modal1.height + modal2.height + 90);

    app.stage.addChild(modal1);
    app.stage.addChild(modal2);
    app.stage.addChild(modal3);

    const slide = background(containerSize, new PIXI.Sprite(IMGS.BACKGROUND_SEA), 'cover');
    container.addChild(slide);

    renderer.render(app.stage);
  }

  createWoodenModal(text, x, y) {
    const woodenModal = new PIXI.Container();
    woodenModal.x = x;
    woodenModal.y = y;

    const woodenModalTop = new PIXI.Sprite(IMGS.CONT_HEADER);
    const woodenModalBottom = new PIXI.Sprite(IMGS.CONT_FOOTER);
    const woodenModalBackground = new PIXI.extras.TilingSprite(IMGS.CONT_BG);
    woodenModalBackground.width = woodenModalTop.width;
    woodenModalBackground.height = 100;

    const woodenModalTitle = new PIXI.Text(text);
    woodenModalTitle.width = woodenModalBackground.width - 80;
    woodenModalTitle.x = 40;
    woodenModalTitle.y = 30;
    woodenModalTitle.style = {
      fontFamily: 'pixel_bold',
      fontSize: 28,
      wordWrap: true,
      wordWrapWidth: woodenModalBackground.width - 40,
      dropShadow: true,
      dropShadowAlpha: 0.5,
      fill: 0xffffff,
    };

    woodenModal.addChild(woodenModalTop);
    woodenModal.addChild(woodenModalBackground);
    woodenModal.addChild(woodenModalBottom);
    woodenModal.addChild(woodenModalTitle);

    woodenModalBackground.y = woodenModalTop.height;
    woodenModalBottom.y =  woodenModalTop.height + woodenModalBackground.height;

    woodenModal.scale = { x: this.scale, y: this.scale };

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
