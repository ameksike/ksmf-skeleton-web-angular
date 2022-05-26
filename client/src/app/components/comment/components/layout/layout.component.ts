import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'comment-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class CommentLayoutComponent implements OnInit {

  container: { [key: string]: boolean } = {};
  left: { [key: string]: boolean } = {};
  right: { [key: string]: boolean } = {};

  constructor(
    private responsive: BreakpointObserver,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('????-id', id);

    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      const breakpoints = result.breakpoints;
      this.container = {};
      if (breakpoints[Breakpoints.XSmall]) {
        this.container['box-vertical'] = true;
        this.left['center'] = true;
        this.right['center'] = true;
        this.left['left'] = false;
        this.right['right'] = false;
      } else {
        this.container['box-horizontal'] = true;
        this.left['left'] = true;
        this.right['right'] = true;
        this.left['center'] = false;
        this.right['center'] = false;
      }
    });
  }

}
