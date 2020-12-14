import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopnewsComponent } from './popnews.component';

describe('PopnewsComponent', () => {
  let component: PopnewsComponent;
  let fixture: ComponentFixture<PopnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopnewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
