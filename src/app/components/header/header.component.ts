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

  ngOnInit() {}

  Navigate(path: string) {
    console.log(this.data.store_id);
    this.router.navigate([path]);
  }
}
