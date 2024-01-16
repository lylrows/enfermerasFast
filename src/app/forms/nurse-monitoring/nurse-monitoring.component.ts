import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nurse-monitoring',
  templateUrl: './nurse-monitoring.component.html',
  styleUrls: ['./nurse-monitoring.component.scss'],
})
export class NurseMonitoringComponent implements OnInit {

  location = new Location();
  constructor() { }

  ngOnInit() {}


}
