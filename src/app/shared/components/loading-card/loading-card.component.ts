import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.scss'],
})
export class LoadingCardComponent implements OnChanges {
  @Input() isLoading: boolean = false;
  showLoad: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading']) {
      this.showLoad = this.isLoading;
    }
  }
}
