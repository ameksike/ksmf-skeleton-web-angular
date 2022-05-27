import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Location } from '@angular/common';
import { Tag } from '../../model/tag.model';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'comment-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  form: FormGroup;
  error?: string;
  tags: Tag[];
  users: User[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private srvCommnet: CommentService,
    private srvUser: UserService,
    private location: Location
  ) {
    this.users = [];
    this.tags = [];
    this.form = this.fb.group({
      id: [''],
      flightId: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
        Validators.pattern(/[0-9]/)
      ]],
      user: ['', [
        Validators.required
      ]],
      comment: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.srvCommnet.model.subscribe(event => {
      switch (event.action) {

        case "select":
          this.id = event.data.id;
          this.flightId = event.data.flightId;
          this.user = event.data.user;
          this.comment = event.data.comment;
          this.tags = event.data.tags || [];
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });

    this.srvUser.model.subscribe(event => {
      switch (event.action) {
        case "list":
          this.users = event.data;
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });

    this.user?.valueChanges.subscribe(s => {
      //console.log(`The selected value is:`, s);
    });
  }

  compareSelection(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.id = id;

    if (id) {
      this.srvCommnet.select(id);
    }

    this.srvUser.list();
  }

  submitForm() {
    if (this.form.valid) {
      const tags = this.tags.map(tag => tag.id);
      const commnet = this.form.value;
      commnet.tags = tags;
      commnet.userId = commnet.user?.id;

      console.log('submitForm', commnet, tags);
      this.srvCommnet.save(commnet);
      this.location.back();
    }
  }

  onCancel() {
    this.location.back();
  }

  //... SET and GET
  get id() {
    return this.form.get('id');
  }
  set id(value) {
    this.id?.setValue(value);
  }

  get flightId() {
    return this.form.get('flightId');
  }
  set flightId(value) {
    this.flightId?.setValue(value);
  }

  get user() {
    return this.form.get('user');
  }
  set user(value) {
    this.user?.setValue(value);
  }

  get comment() {
    return this.form.get('comment');
  }
  set comment(value) {
    this.comment?.setValue(value);
  }

  public onError = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
}
