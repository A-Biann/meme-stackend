import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-image-try',
  templateUrl: './image-try.component.html',
  styleUrls: ['./image-try.component.css']
})
export class ImageTryComponent {

  imageUrl!: string;
  imageToShow!: any;

  constructor(private http: HttpClient) { }


  loadImage() {
    const apiUrl = 'http://127.0.0.1:8000/api/get_image/';
    this.http.get(apiUrl, { params: { image_url: this.imageUrl }, responseType: 'blob' }).subscribe(data => {
      this.createImageFromBlob(data);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
