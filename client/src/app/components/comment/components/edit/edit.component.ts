import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Location } from '@angular/common';
import { Tag } from '../../model/tag.model';


@Component({
  selector: 'comment-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  form: FormGroup;
  error?: string;
  tags: Tag[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private srvCommnet: CommentService,
    private location: Location
  ) {

    this.tags = [];
    this.form = this.fb.group({
      id: [''],
      flightId: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
        Validators.pattern(/[0-9]/)
      ]],
      userId: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/)
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
          this.userId = event.data.user?.id;
          this.comment = event.data.comment;
          this.tags = event.data.tags || [];
          break;

        case "error":
          this.error = event.data;
          break;
      }
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.id = id;

    if (id) {
      this.srvCommnet.select(id);
    }
  }

  submitForm() {
    if (this.form.valid) {
      const tags = this.tags.map(tag => tag.id);
      const commnet = this.form.value;
      commnet.tags = tags;
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

  get userId() {
    return this.form.get('userId');
  }
  set userId(value) {
    this.userId?.setValue(value);
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


// https://codesource.io/getting-started-with-angular-reactive-form-validation/
// https://www.educba.com/angular-material-form-validation/
// https://www.positronx.io/angular-material-reactive-forms-validation-tutorial/