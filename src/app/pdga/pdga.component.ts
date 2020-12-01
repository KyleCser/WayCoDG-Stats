import { Component, OnInit } from '@angular/core';
import {StatsService} from "../stats.service";

@Component({
  selector: 'app-pdga',
  templateUrl: './pdga.component.html',
  styleUrls: ['./pdga.component.css']
})
export class PdgaComponent implements OnInit {
  player = {
    first_name: '',
    last_name: '',
    pdga_number: '',
    class: '',
    city: '',
    state_prov: 'MI',
    country: 'US',
    last_modified: '',
    offset: 0,
    limit: 200
  };

  constructor(protected stats: StatsService) { }

  ngOnInit() {
  }

  search(criteria: any) {
    this.stats.players(criteria).subscribe((results: any) => {
      return results;
    }, (error) => {
      console.error(error);
    });
  }
}
