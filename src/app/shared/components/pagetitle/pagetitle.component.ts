import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss'],
})

/**
 * Page Title Component
 */
export class PagetitleComponent implements OnInit {
  @Input()
  breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
  }>;
  @Input() superTitle: string | undefined; // Super título opcional
  @Input() superTitleLink: string | undefined;
  @Input() bankName: string | undefined;

  @Input() title: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
