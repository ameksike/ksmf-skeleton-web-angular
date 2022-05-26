import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentLayoutComponent } from './layout.component';

describe('CommentLayoutComponent', () => {
  let component: CommentLayoutComponent;
  let fixture: ComponentFixture<CommentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
