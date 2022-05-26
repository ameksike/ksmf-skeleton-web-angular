import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../../model/Fligh';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'flight-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: Flight[] = [];
  error: string;

  constructor(private srvFliht: FlightService, private router: Router) {
    this.error = '';
  }

  ngOnInit(): void {
    this.srvFliht.model.subscribe(event => {
      switch (event.action) {
        case "list":
          this.data = event.data;
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });

    this.srvFliht.load();
  }

  onSelect(item?: Flight) {
    this.router.navigateByUrl("/comment/list/" + (item ? item.id : ''));
  }
}
