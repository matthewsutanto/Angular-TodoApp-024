import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-emulated-encapsulation',
  templateUrl: './emulated-encapsulation.component.html',
  styleUrls: ['./emulated-encapsulation.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EmulatedEncapsulationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
