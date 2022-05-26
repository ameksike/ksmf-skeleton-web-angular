import { Component, OnInit } from '@angular/core';
import { ToolbarOption, ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  btn: any;

  constructor(private srvToolbar: ToolbarService) {
    this.srvToolbar.model.subscribe(event => {
      if (event.action !== 'click') {
        this.btn = event.data;
      }
    });
  }

  ngOnInit(): void {
    this.srvToolbar.load();
  }

  onClick(item: ToolbarOption) {
    this.srvToolbar.throw(item);
  }

}
