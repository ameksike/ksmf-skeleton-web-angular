import { EventEmitter, Injectable } from '@angular/core';

export interface ToolbarOption {
  label: string,
  action: string,
  icon: string,
  tooltip?: string
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  model!: EventEmitter<{ action: string; data: any; }>;
  data: Array<ToolbarOption>;

  constructor() {
    this.model = new EventEmitter;
    this.data = [
      {
        label: 'Add to favorite this app',
        tooltip: 'Add to favorite this app',
        action: 'favorite',
        icon: 'favorite'
      }, {
        label: 'Share this app',
        tooltip: 'Share this app',
        action: 'share',
        icon: 'share'
      }
    ]
  }

  load() {
    this.model.emit({ action: 'load', data: this.data });
  }

  add(item: ToolbarOption) {
    this.data.push(item);
    this.model.emit({ action: 'update', data: this.data });
  }

  set(items: Array<ToolbarOption>) {
    this.data = items;
    this.model.emit({ action: 'update', data: this.data });
  }

  throw(item: ToolbarOption) {
    this.model.emit({ action: 'click', data: item });
  }
}
