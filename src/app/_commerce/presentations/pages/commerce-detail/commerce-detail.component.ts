import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@user/application/services/user.service';
import { AffiliateMaster } from 'src/app/_commerce/domain/models/affiliate-master.model';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './commerce-detail.component.html',
})
export class AffiliateMasterDetailComponent implements OnInit {
  affiliate: AffiliateMaster | null = null;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Comercios', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const affiliateMasterSk = this.route.snapshot.paramMap.get('sk');

    if (affiliateMasterSk) {
      this.userService
        .getUser(affiliateMasterSk)
        .subscribe((affiliateMaster: AffiliateMaster) => {
          this.affiliate = affiliateMaster;
        });

      console.log(affiliateMasterSk);
    }
  }
}
