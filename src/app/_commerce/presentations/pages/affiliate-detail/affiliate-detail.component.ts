import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffiliateService } from '@services/affiliate.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.component.html',
})
export class AffiliateDetailComponent implements OnInit {
  affiliate: Affiliate | null = null;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados' },
    { label: 'Detalle', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService
  ) {}

  ngOnInit(): void {
    const affiliateSK = this.route.snapshot.paramMap.get('sk');

    if (affiliateSK) {
      this.affiliateService
        .getAffiliate(affiliateSK)
        .subscribe((affiliate: Affiliate) => {
          this.affiliate = affiliate;
        });
    }
  }
}
