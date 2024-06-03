import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss'],
})

/**
 * Starter Component
 */
export class DashboardReportComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Utility' },
      { label: 'Starter Page', active: true },
    ];
  }
}
