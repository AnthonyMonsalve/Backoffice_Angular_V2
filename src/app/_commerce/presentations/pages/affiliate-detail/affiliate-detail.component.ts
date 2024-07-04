import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@user/application/services/user.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.component.html',
})
export class AffiliateDetailComponent implements OnInit {
  affiliate: Affiliate | null = null;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const affiliateId = this.route.snapshot.paramMap.get('sk');

    if (affiliateId) {
      this.userService
        .getUser(affiliateId)
        .subscribe((affiliate: Affiliate) => {
          this.affiliate = affiliate;
        });

      console.log(affiliateId);
    }
  }
}
