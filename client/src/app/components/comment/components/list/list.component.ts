import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Comment } from '../../model/comment.model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CommentListComponent implements AfterViewInit, OnInit {

  routehandler: any;

  displayedColumns: string[] = ['comment', 'flightId', 'user', 'action'];
  dataSource = new MatTableDataSource<Comment>([]);
  error: string;
  flightId: string;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private srvComment: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver,
    private srvToolbar: ToolbarService
  ) {
    this.error = '';
    this.flightId = '';

    this.srvComment.model.subscribe(event => {
      switch (event.action) {
        case "list":
          this.dataSource.data = event.data; //new MatTableDataSource(event.data);
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });

    this.srvToolbar.model.subscribe(event => {
      if (event.action === 'click' && event.data.action === 'create') {
        this.router.navigate(['/comment/new']);
      }
    });
  }

  ngOnInit(): void {

    this.routehandler = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.srvComment.list(id ? { flightId: id } : {});
    });

    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      const breakpoints = result.breakpoints;

      if (breakpoints[Breakpoints.XSmall]) {
        this.displayedColumns = ['comment', 'action'];
      } else {
        this.displayedColumns = ['comment', 'flightId', 'user', 'action'];
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onShow(item: Comment) {
    this.router.navigate(['/comment/show/' + item.id]);
  }

  onEdit(item: Comment) {
    this.router.navigate(['/comment/edit/' + item.id]);
  }

  onDelete(item: Comment) {
    if (item && item.id) {
      this.srvComment.delete(item.id);
    }
  }

}
