import {Component, OnInit, ViewChild} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatStepper) stepper!: MatStepper;
  imgUrl!: string;
  constructor() { }
  ngOnInit() {
  }
  onImageUpdate(imgUrl: string) {
    this.imgUrl = imgUrl;
    if (this.stepper.selected) {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }
  }

}
