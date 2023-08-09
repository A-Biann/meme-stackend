import {Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as p5 from 'p5';
import {ImageUploadService} from "./load-image.service";

@Component({
  selector: 'app-generate-meme',
  templateUrl: './generate-meme.component.html',
  styleUrls: ['./generate-meme.component.css'],
})
export class GenerateMemeComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() imageUrl: string = 'https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2023-07/cover_2.jpg?VersionId=ea6adZihcm_DZF_oAnjw_4mfc04IUinp';
  @ViewChild('imageCanvas') imageCanvas!: ElementRef;
  imageToShow!: string | ArrayBuffer | null;
  urlToShow!: string;
  p5Sketch!: p5;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private imageUploadService: ImageUploadService) {
    this.form = this.formBuilder.group({
      topText: [],
      bottomText: [],
      fontSize: [30, Validators.required]
    });
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.initCanvas(this.urlToShow);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.imageUrl.currentValue && !changes.imageUrl.firstChange) {
      this.imageUploadService.loadImage(this.imageUrl).subscribe(data => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          this.imageToShow = reader.result as string;
          this.p5Sketch.remove();
          this.form.reset();
          if (typeof this.imageToShow === 'string') {
            this.urlToShow = this.imageToShow;
            this.initCanvas(this.urlToShow);
          }
        }, false);

        if (data) {
          reader.readAsDataURL(data);
        }
      });
    }
  }
  generateMeme() {
    this.p5Sketch.remove();
    this.initCanvas(this.urlToShow);
  }
  downloadMeme() {
    if (this.form.valid) {
      this.p5Sketch.save('meme');
    }
  }
  private initCanvas(url: string) {
    this.p5Sketch = new p5((p: p5) => {
      const imageUrl = url;
      p.setup = () => {
        p.createCanvas(600,400);
        p.loadImage(imageUrl, (img) => {
          p.image(img, 0, 0, 600, 400);

          const formValue = this.form.getRawValue();
          const impactFont = p.loadFont('assets/fonts/impact.ttf');

          p.textSize(Number(this.form.get('fontSize')?.value));
          p.fill(255, 255, 255, 255);
          p.textStyle('bold');
          p.textFont(impactFont);
          p.stroke(0);
          p.strokeWeight(5);

          if (formValue.topText) {
            p.textAlign('center', 'top');
            p.text(formValue.topText, p.width/2, 15);
          }
          if (formValue.bottomText) {
            p.textAlign('center', 'bottom');
            p.text(formValue.bottomText, p.width/2, p.height-15);
          }
        });
      }
    }, this.imageCanvas.nativeElement);
  }
}
