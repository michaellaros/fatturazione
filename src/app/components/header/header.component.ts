import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentRoute?: string;
  constructor(
    public data: DataService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).url;
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      if (data['retailstoreid'] != null) {
        this.data.store_id =
          data['retailstoreid'] == 10000 ? null : data['retailstoreid'];
      }
    });
  }

  Navigate() {
    console.log(this.currentRoute);
    if (this.currentRoute == '/Storico') this.router.navigate(['']);
    else this.router.navigate(['/Storico']);
  }
}
