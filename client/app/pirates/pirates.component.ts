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
    app.stage.addChild(this.createShip(130, 73)); // 500, 424
    app.stage.addChild(this.createIsland(610, 310));
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
    shipContainer.addChild(this.createWave(-80, 490));
    shipContainer.addChild(this.createWave(0, 510));
    shipContainer.addChild(this.createWave(-100, 535));
    shipContainer.addChild(this.createWave(-10, 565));
    shipContainer.addChild(this.createWave(80, 525));
    shipContainer.addChild(this.createWave(120, 550));
    shipContainer.addChild(this.createWave(215, 535));
    shipContainer.addChild(this.createWave(255, 515));
    shipContainer.addChild(this.createWave(345, 575));
    shipContainer.addChild(shipImg);

    this.addPirateToShip(shipContainer, 85, 65, IMGS.PIRATE_1, scale);
    this.addPirateToShip(shipContainer, 275, 315, IMGS.PIRATE_2, scale);
    this.addPirateToShip(shipContainer, 435, 295, IMGS.PIRATE_3, scale);
    this.addPirateToShip(shipContainer, 85, 385, IMGS.PIRATE_4, scale);
    this.addPirateToShip(shipContainer, 315, 385, IMGS.PIRATE_5, scale);

    shipContainer.width = shipImg.width + 100;
    shipContainer.height = shipImg.height + shadowImg.height;
    shipContainer.x = x;
    shipContainer.y = y;
    return shipContainer;
  }

  createIsland(x, y) {
    const scale = 0.625;

    const islandContainer = new PIXI.Container();

    const islandImage = new PIXI.Sprite(IMGS.ISLAND);
    islandImage.position = { x: 0, y: 0 };
    islandImage.scale = { x: scale, y: scale };
    islandContainer.addChild(islandImage);

    islandContainer.x = x;
    islandContainer.y = y;
    islandContainer.width = islandImage.width;
    islandContainer.height = islandImage.height;

    return islandContainer;
  }

  createWave(x, y) {
    const scale = 0.625;

    const waveContainer = new PIXI.Container();

    const wavesImage = new PIXI.Sprite(IMGS.WAVES);
    wavesImage.position = { x: 0, y: 0 };
    wavesImage.scale = { x: scale, y: scale };
    waveContainer.addChild(wavesImage);

    waveContainer.x = x;
    waveContainer.y = y;
    waveContainer.width = wavesImage.width;
    waveContainer.height = wavesImage.height;

    return waveContainer;
  }

  addPirateToShip(shipContainer, x, y, pirateResources, scale) {
    const sprite = new PIXI.Sprite(pirateResources);
    sprite.scale = { x: scale, y: scale };
    sprite.position = { x, y };
    shipContainer.addChild(sprite);
  }
}
