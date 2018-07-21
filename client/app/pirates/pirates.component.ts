import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import * as PIXI from 'pixi.js';

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
      const app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
      this.container.nativeElement.appendChild(app.view);
    }, 0);
  }

}
