import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-image-small-name',
  templateUrl: './bank-image-small-name.component.html',
  styleUrls: ['./bank-image-small-name.component.scss'],
})
export class BankImageSmallName implements OnInit {
  @Input() bankName: string = '';
  @Input() width: number = 120;

  imageUrl: string = '';

  private imageMap: { [key: string]: string } = {
    banesco: 'assets/images/banks/Banesco.png',
    provincial: 'assets/images/banks/Provincial.png',
    mercantil: 'assets/images/banks/Mercantil.png',
    bancaribe: 'assets/images/banks/Bancaribe.png',
  };

  ngOnInit(): void {
    this.updateImageUrl();
  }

  ngOnChanges(): void {
    this.updateImageUrl();
  }

  private updateImageUrl(): void {
    this.imageUrl = this.imageMap[this.bankName.toLowerCase()];
  }
}
