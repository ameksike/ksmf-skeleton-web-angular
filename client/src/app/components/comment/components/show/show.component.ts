import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../model/comment.model';
import { Tag } from '../../model/tag.model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'comment-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class CommentShowComponent implements OnInit {

  commnetId: number;
  model?: Comment;
  error?: string;
  tags: Tag[];

  constructor(
    private route: ActivatedRoute,
    private srvCommnet: CommentService,
    private location: Location
  ) {
    this.commnetId = -1;
    this.tags = [];

    this.srvCommnet.model.subscribe(event => {
      console.log('srvCommnet', event);

      switch (event.action) {
        case "select":
          this.model = event.data;
          this.tags = event.data.tags;
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });
  }

  ngOnInit(): void {
    this.commnetId = this.route.snapshot.params['id'];
    if (this.commnetId) {
      this.srvCommnet.select(this.commnetId);
    }
  }

  onCancel() {
    this.location.back();
  }

}
