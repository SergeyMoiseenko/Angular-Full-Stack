/*
*  PixiJS Background Cover/Contain Script
*   Returns PixiJS Container
*   ARGS:
*   bgSize: Object with x and y representing the width and height of background. Example: {x:1280,y:720}
*   inputSprite: Pixi Sprite containing a loaded image or other asset.  Make sure you preload assets into this sprite.
*   type: String, either "cover" or "contain".
*   forceSize: Optional object containing the width and height of the source sprite, example:  {x:1280,y:720}
*/

declare var PIXI: any;

export const IMG_PATHS = {
  BACKGROUND_SEA: 'assets/img/bg_ocean_middle.png',
  BUBBLE: 'assets/img/bubble.png',
  PIRATE_1: 'assets/img/char_pirate0.png',
  PIRATE_2: 'assets/img/char_pirate1.png',
  PIRATE_3: 'assets/img/char_pirate2.png',
  PIRATE_4: 'assets/img/char_pirate3.png',
  PIRATE_5: 'assets/img/char_pirate4.png',
  PIRATE_6: 'assets/img/char_pirate5.png',
  WAVES: 'assets/img/deco_oceanwaves.png',
  SHIP_SHADOW: 'assets/img/deco_shipshadow.png',
  STAT_BATTLES: 'assets/img/icon_stat_battles.png',
  STAT_CROWN: 'assets/img/icon_stat_crown.png',
  STAT_DIAMOND: 'assets/img/icon_stat_diamond.png',
  STAT_FLAG: 'assets/img/icon_stat_flag.png',
  STAT_GOLD: 'assets/img/icon_stat_gold.png',
  STAT_PARROT: 'assets/img/icon_stat_parrot.png',
  STAT_SKULL: 'assets/img/icon_stat_skull.png',
  GOLD_PILE: 'assets/img/item_goldpile.png',
  ISLAND: 'assets/img/location_island.png',
  SHIP: 'assets/img/location_ship.png',
  BUTTON: 'assets/img/ui_button_default.png',
  BUTTON_HOVER: 'assets/img/ui_button_hover.png',
  BUTTON_PRESSED: 'assets/img/ui_button_pressed.png',
  CONT_BG: 'assets/img/ui_container_bg.png',
  CONT_SEP: 'assets/img/ui_container_sep.png',
  CONT_FOOTER: 'assets/img/ui_container_footer.png',
  CONT_HEADER: 'assets/img/ui_container_header.png',
  PIRATE_HEAD: 'assets/img/ui_piratehead.png',
  BUBBLE: 'assets/img/bubble.png'
};

class ImageAccessor {
  get BACKGROUND_SEA() {
    return PIXI.loader.resources[IMG_PATHS.BACKGROUND_SEA].texture;
  }
  get BUBBLE() {
    return PIXI.loader.resources[IMG_PATHS.BUBBLE].texture;
  }
  get PIRATE_1() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_1].texture;
  }
  get PIRATE_2() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_2].texture;
  }
  get PIRATE_3() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_3].texture;
  }
  get PIRATE_4() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_4].texture;
  }
  get PIRATE_5() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_5].texture;
  }
  get PIRATE_6() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_6].texture;
  }
  get WAVES() {
    return PIXI.loader.resources[IMG_PATHS.WAVES].texture;
  }
  get SHIP_SHADOW() {
    return PIXI.loader.resources[IMG_PATHS.SHIP_SHADOW].texture;
  }
  get STAT_BATTLES() {
    return PIXI.loader.resources[IMG_PATHS.STAT_BATTLES].texture;
  }
  get STAT_CROWN() {
    return PIXI.loader.resources[IMG_PATHS.STAT_CROWN].texture;
  }
  get STAT_DIAMOND() {
    return PIXI.loader.resources[IMG_PATHS.STAT_DIAMOND].texture;
  }
  get STAT_FLAG() {
    return PIXI.loader.resources[IMG_PATHS.STAT_FLAG].texture;
  }
  get STAT_GOLD() {
    return PIXI.loader.resources[IMG_PATHS.STAT_GOLD].texture;
  }
  get STAT_PARROT() {
    return PIXI.loader.resources[IMG_PATHS.STAT_PARROT].texture;
  }
  get STAT_SKULL() {
    return PIXI.loader.resources[IMG_PATHS.STAT_SKULL].texture;
  }
  get GOLD_PILE() {
    return PIXI.loader.resources[IMG_PATHS.GOLD_PILE].texture;
  }
  get ISLAND() {
    return PIXI.loader.resources[IMG_PATHS.ISLAND].texture;
  }
  get SHIP() {
    return PIXI.loader.resources[IMG_PATHS.SHIP].texture;
  }
  get BUTTON() {
    return PIXI.loader.resources[IMG_PATHS.BUTTON].texture;
  }
  get BUTTON_HOVER() {
    return PIXI.loader.resources[IMG_PATHS.BUTTON_HOVER].texture;
  }
  get BUTTON_PRESSED() {
    return PIXI.loader.resources[IMG_PATHS.BUTTON_PRESSED].texture;
  }
  get CONT_BG() {
    return PIXI.loader.resources[IMG_PATHS.CONT_BG].texture;
  }
  get CONT_SEP() {
    return PIXI.loader.resources[IMG_PATHS.CONT_SEP].texture;
  }
  get CONT_FOOTER() {
    return PIXI.loader.resources[IMG_PATHS.CONT_FOOTER].texture;
  }
  get CONT_HEADER() {
    return PIXI.loader.resources[IMG_PATHS.CONT_HEADER].texture;
  }
  get PIRATE_HEAD() {
    return PIXI.loader.resources[IMG_PATHS.PIRATE_HEAD].texture;
  }

  get BUBBLE() {
    return PIXI.loader.resources[IMG_PATHS.BUBBLE].texture;
  }
}

export const IMGS = new ImageAccessor();

export function loadResources(cb: () => void) {
  PIXI.loader
  .add(IMG_PATHS.BACKGROUND_SEA)
  .add(IMG_PATHS.BUBBLE)
  .add(IMG_PATHS.PIRATE_1)
  .add(IMG_PATHS.PIRATE_2)
  .add(IMG_PATHS.PIRATE_3)
  .add(IMG_PATHS.PIRATE_4)
  .add(IMG_PATHS.PIRATE_5)
  .add(IMG_PATHS.PIRATE_6)
  .add(IMG_PATHS.WAVES)
  .add(IMG_PATHS.SHIP_SHADOW)
  .add(IMG_PATHS.STAT_BATTLES)
  .add(IMG_PATHS.STAT_CROWN)
  .add(IMG_PATHS.STAT_DIAMOND)
  .add(IMG_PATHS.STAT_FLAG)
  .add(IMG_PATHS.STAT_GOLD)
  .add(IMG_PATHS.STAT_PARROT)
  .add(IMG_PATHS.STAT_SKULL)
  .add(IMG_PATHS.GOLD_PILE)
  .add(IMG_PATHS.ISLAND)
  .add(IMG_PATHS.SHIP)
  .add(IMG_PATHS.BUTTON)
  .add(IMG_PATHS.BUTTON_HOVER)
  .add(IMG_PATHS.BUTTON_PRESSED)
  .add(IMG_PATHS.CONT_BG)
  .add(IMG_PATHS.CONT_SEP)
  .add(IMG_PATHS.CONT_FOOTER)
  .add(IMG_PATHS.CONT_HEADER)
  .add(IMG_PATHS.PIRATE_HEAD)
  .load(cb);
}

export function background(bgSize, inputSprite, type, forceSize?) {
  const sprite = inputSprite;
  const bgContainer = new PIXI.Container();
  const mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, bgSize.x, bgSize.y).endFill();
  bgContainer.mask = mask;
  bgContainer.addChild(mask);
  bgContainer.addChild(sprite);

  let sp = {x: sprite.width, y: sprite.height};
  if (forceSize) {
    sp = forceSize;
  }

  const winratio = bgSize.x / bgSize.y;
  const spratio = sp.x / sp.y;
  let scale = 1;
  const pos = new PIXI.Point(0, 0);
  if (type === 'cover' ? (winratio > spratio) : (winratio < spratio)) {
      // photo is wider than background
      scale = bgSize.x / sp.x;
      pos.y = -((sp.y * scale) - bgSize.y) / 2;
  } else {
      // photo is taller than background
      scale = bgSize.y / sp.y;
      pos.x = -((sp.x * scale) - bgSize.x) / 2;
  }

  sprite.scale = new PIXI.Point(scale, scale);
  sprite.position = pos;

  return bgContainer;
}
