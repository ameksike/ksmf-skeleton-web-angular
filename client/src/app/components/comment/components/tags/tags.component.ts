import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tag } from '../../model/tag.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'tags-selector',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  allTags: Tag[] = [];

  @Input() editable: boolean = true;
  @Input() tags: Tag[] = [];
  @Output() onSelect = new EventEmitter<Tag>();
  @Output() onDelete = new EventEmitter<Tag>();
  @Output() onAdd = new EventEmitter<Tag>();
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  tagCtrl = new FormControl();
  filteredTags!: Observable<Tag[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private srvTag: TagService) {
    this.srvTag.model.subscribe(event => {
      switch (event.action) {
        case "list":
          this.allTags = event.data;
          this.loadData(this.allTags);
          break;

        case "error":
          console.log('[ERROR]', event.data);
          break;

        default:
          this.srvTag.list();
          break;
      }
    });
  }

  loadData(allTags: any) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: Tag | null) => (tag ? this.filter(tag) : allTags.slice()))
    );
  }

  ngOnInit(): void {
    this.srvTag.list();
  }

  add(event: MatChipInputEvent): void {
    console.log('add');
    const value = (event.value || '').trim();
    //... Add our tag
    if (value) {
      this.srvTag.create({ name: value })
        .then(data => {
          if (data) {
            this.tags.push(data);
            this.onAdd.emit(data);
          }
          console.log('this.srvTag.create', data);
        });

    }
    //... Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    this.onDelete.emit(tag);
    const index = this.tags.findIndex(elem => elem.id === tag.id);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.onSelect.emit(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private filter(value: Tag): Tag[] {
    const filterValue = value && value.name ? value.name.toLowerCase() : '';
    return this.allTags.filter(tag => tag && tag.name ? tag.name.toLowerCase().includes(filterValue) : false);
  }
}
