import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  urlDialogVisible = false;
  imageUrl: string = '';
  @Output() imageUrlUpdated: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  openUrlDialog() {
    this.urlDialogVisible = true;
  }

  closeUrlDialog() {
    this.imageUrl = '';
  }

  onUrlSubmit() {
    if (this.imageUrl) {
      this.imageUrlUpdated.emit(this.imageUrl);
      console.log(this.imageUrl);
    }
    this.closeUrlDialog();
  }
}
