import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../model/comment.model';
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

  constructor(
    private route: ActivatedRoute,
    private srvCommnet: CommentService,
    private location: Location
  ) {
    this.commnetId = -1;

    this.srvCommnet.model.subscribe(event => {
      console.log('srvCommnet', event);

      switch (event.action) {
        case "select":
          this.model = event.data;
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
    console.log('AAAAAAAAAAAAA');
    this.location.back();
  }

}
