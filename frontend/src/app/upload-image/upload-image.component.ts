import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ImageUploadService } from './load-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  urlDialogVisible = false;
  imageUrl: string = '';
  urlToShow: string = '';
  @Output() imageUrlUpdated: EventEmitter<string> = new EventEmitter<string>();
  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {}

  openUrlDialog() {
    this.urlDialogVisible = !this.urlDialogVisible;
  }

  closeUrlDialog() {
    this.imageUrl = '';
  }

  onUrlSubmit() {
    if (this.imageUrl) {
      this.imageUploadService
        .loadImage(this.imageUrl)
        .then(imageUrl => {
          this.urlToShow = imageUrl;
          this.imageUrlUpdated.emit(this.urlToShow);
        })
        .catch(error => {
          console.error('Error loading image:', error);
        });
      console.log(this.imageUrl);
    }
    this.closeUrlDialog();
  }
  onFileChange(fileEvent: Event) {
    const fileInput = fileEvent.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          this.urlToShow = e.target?.result as string;
          this.imageUrlUpdated.emit(this.urlToShow);
        };
        fileReader.readAsDataURL(file);
      }
    }
  }
}
