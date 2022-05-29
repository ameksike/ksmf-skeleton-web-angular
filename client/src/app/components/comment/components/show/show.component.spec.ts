import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { TagsComponent } from '../tags/tags.component';

import { CommentShowComponent } from './show.component';

describe('CommentShowComponent', () => {
  let component: CommentShowComponent;
  let fixture: ComponentFixture<CommentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        CommentShowComponent,
        TagsComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
