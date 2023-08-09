import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTryComponent } from './image-try.component';

describe('ImageTryComponent', () => {
  let component: ImageTryComponent;
  let fixture: ComponentFixture<ImageTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
