import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-pos-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})

/**
 * Starter Component
 */
export class SummaryPosComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Insta Pos' },
      { label: 'Summary', active: true },
    ];
  }
}
