import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Comment } from '../../model/comment.model';
import { CommentService } from '../../services/comment.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortHeader, Sort, SortDirection } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CommentListComponent implements AfterViewInit, OnInit {

  routehandler: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns: string[] = ['comment', 'flightId', 'user', 'action'];
  dataSource = new MatTableDataSource<Comment>([]);
  flightId: string | null;
  data: Comment[] = [];
  error: string;

  pageEvent?: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 10;
  filter: FormControl;
  sortState: string[][] = [];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private srvComment: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {
    this.error = '';
    this.flightId = '';
    this.filter = new FormControl('', { initialValueIsDefault: true });
  }

  ngOnInit(): void {
    //... define responsive design
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
    console.log('this.dataSource.sort', this.dataSource.sort);

    this.srvComment.model.subscribe(event => {
      switch (event.action) {
        case "list":
          this.pageIndex = event.page ? event.page - 1 : this.pageIndex;
          this.pageSize = event.size ? event.size : this.pageSize;
          this.length = event.total ? event.total : this.length;
          this.dataSource.data = event.data;
          this.isLoadingResults = false;
          const sort = event.sort ? event.sort : [];
          if (sort[0]) {
            this.setSort(sort[0][0], (sort[0][1] as 'asc' | 'desc'));
          }
          break;

        case "error":
          this.error = event.data;
          console.log('[ERROR]', this.error);
          break;

        default:
          this.load();
          break;
      }
    });

    //... first load of data
    this.routehandler = this.route.paramMap.subscribe((params: ParamMap) => {
      this.flightId = params.get('id');
      this.load();
    });
  }

  getFilters() {
    let str = this.dataSource.filter;
    str = str.trim().toLowerCase();
    const filters = [];
    if (this.flightId) {
      filters.push(['flightId', this.flightId]);
    }
    if (str) {
      filters.push(['comment', str, 'iLike']);
    }
    return filters;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.pageIndex = 0;
    this.load();
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

  onPage(event?: PageEvent) {
    this.pageIndex = event ? event.pageIndex : this.pageIndex;
    this.pageSize = event ? event.pageSize : this.pageSize;
    this.load();
    return event;
  }

  onSortChange(sortState: Sort) {
    this.sortState = [[sortState.active, sortState.direction]];
    this.load();
  }

  load() {
    this.isLoadingResults = true;
    this.srvComment.list(
      this.getFilters(),
      this.pageIndex,
      this.pageSize,
      this.sortState
    );
  }

  setSort(id: string, start?: 'asc' | 'desc') {
    start = start || 'asc';
    const matSort = this.dataSource.sort;
    if (matSort) {
      matSort.sort({ id, start, disableClear: true });
      (matSort.sortables.get(id) as MatSortHeader)._setAnimationTransitionState({ toState: 'active' });
    }
  }
}
