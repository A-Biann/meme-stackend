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

  loadImage(imageUrl: string): Promise<string> {
    const apiUrl = environment.backendUrl + 'api/get_image/';
    return this.http
      .get(apiUrl, { params: { image_url: imageUrl }, responseType: 'blob' })
      .toPromise()
      .then(data => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageBase64 = reader.result as string;
            resolve(imageBase64);
          };
          reader.readAsDataURL(data);
        });
      });
  }
}
