import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ImageUploadService {
  imageToShow: any;

  constructor(private http: HttpClient) { }

  loadImage(imageUrl: string) {
    const apiUrl = environment.backendUrl+'api/get_image/';
    return this.http.get(apiUrl, { params: { image_url: imageUrl }, responseType: 'blob' }) as Observable<Blob>;
  }
}
