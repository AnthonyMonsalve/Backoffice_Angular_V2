import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-web-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})

/**
 * Starter Component
 */
export class SummaryWebComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Insta Web' },
      { label: 'Summary', active: true },
    ];
  }
}
