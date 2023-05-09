import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public data: DataService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      if (data['retailstoreid'] != null) {
        this.data.store_id =
          data['retailstoreid'] == 10000 ? null : data['retailstoreid'];
      }
    });
  }

  Navigate(path: string) {
    this.router.navigate([path]);
  }
}
