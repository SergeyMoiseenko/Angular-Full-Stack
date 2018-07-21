import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { background, IMGS, loadResources, IMG_PATHS } from './Utils';

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
    renderer.resolution = 1;
    const container = new PIXI.Container();

    app.stage.addChild(container);
    app.stage.addChild(this.createShip(130, 63)); // 500, 424
    app.stage.addChild(this.createIsland(610, 310));
    app.stage.addChild(this.createPirateHead(470, 10));

    const modal1 = this.createWoodenModal('ОСАДА GEEKNIGHT', [], 975, 30);
    const modal2 = this.createWoodenModal(
      'СОКРОВИЩНИЦА',
      [
        this.createLabel(IMGS.STAT_GOLD, 5000),
        this.createLabel(IMGS.STAT_DIAMOND, 5000),
        this.createLabel(IMGS.STAT_SKULL, 5000),
        this.createLabel(IMGS.STAT_PARROT, 5000),
        this.createLabel(IMGS.STAT_CROWN, 5000)
      ],
      975,
      modal1.height + 60
    );
    const modal3 = this.createWoodenModal('БОРТЖУРНАЛ', [], 975, modal1.height + modal2.height + 90);

    app.stage.addChild(modal1);
    app.stage.addChild(modal2);
    app.stage.addChild(modal3);


    const slide = background(containerSize, new PIXI.Sprite(IMGS.BACKGROUND_SEA), 'cover');
    container.addChild(slide);

    renderer.render(app.stage);
  }

  createWoodenModal(text, content, x, y) {
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
    if (content.length) {
      const contentContainer = new PIXI.Container();

      content.forEach((element, index) => {
        element.y = index * (element.height + 10);
        contentContainer.addChild(element);
      });

      woodenModal.addChild(contentContainer);
      contentContainer.x = woodenModalTitle.x;
      contentContainer.y = woodenModalTitle.height + woodenModalTitle.y + 10;
      woodenModalBackground.height = contentContainer.height + woodenModalTitle.height + woodenModalTitle.y;
    }
    woodenModal.addChild(woodenModalBottom);
    woodenModal.addChild(woodenModalTitle);

    woodenModalBackground.y = woodenModalTop.height;
    woodenModalBottom.y =  woodenModalTop.height + woodenModalBackground.height;

    woodenModal.scale = { x: this.scale, y: this.scale };

    return woodenModal;
  }

  createLabel(icon, text) {
    const labelContainer = new PIXI.Container();
    const iconSprite = new PIXI.Sprite(icon);
    const label = new PIXI.Text(text);

    labelContainer.addChild(iconSprite);
    labelContainer.addChild(label);

    label.style = {
      fontFamily: 'pixel_bold',
      fontSize: 28,
      dropShadow: true,
      dropShadowAlpha: 0.5,
      fill: 0xefb775,
    };
    label.y = (iconSprite.height - label.height) / 2;
    label.x = iconSprite.width + 10;

    return labelContainer;
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

  createPirateHead(x, y) {
    const scale = 0.625;

    const headContainer = new PIXI.Container();

    const headImage = new PIXI.Sprite(IMGS.PIRATE_HEAD);
    headImage.position = { x: 0, y: 0 };
    headImage.scale = { x: scale, y: scale };
    headContainer.addChild(headImage);

    headContainer.x = x;
    headContainer.y = y;
    headContainer.width = headImage.width;
    headContainer.height = headImage.height;

    return headContainer;
  }
}
