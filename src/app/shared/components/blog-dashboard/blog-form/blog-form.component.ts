import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { title } from 'process';
import { Iblogs } from 'src/app/shared/models/posts';
import { BlogsService } from 'src/app/shared/services/blogs.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  blogsForm !: FormGroup;
  isInEditMode: boolean = false;
  editBlogsData !: Iblogs;

  constructor(
    private _matDialogRef: MatDialogRef<BlogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private _blogService: BlogsService,
    private _snackBar: SnackBarService
  ) {
    this.createBlogsForm();
    if (data) {
      this.isInEditMode = true;
      this.editBlogsData = data;
      this.blogsForm.patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  createBlogsForm() {
    this.blogsForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
    })
  }

  onCancel() {
    this._matDialogRef.close(false);
  }

  onSubmitBlog() {
    if (this.blogsForm.invalid) {
      return this.blogsForm.markAllAsTouched();
    } else {
      let blogsData: Iblogs = this.blogsForm.value;
      this._blogService.createBlog(blogsData)
        .subscribe({
          next: resp => {
            this.blogsForm.reset();
            this._matDialogRef.close({ ...blogsData, id: resp.name })
          }
        })
    }
  }

  onUpdateBlog() {
    if (this.blogsForm.invalid) {
      return this.blogsForm.markAllAsTouched();
    } else {
      let updatedBlog: Iblogs = { ...this.blogsForm.value, id: this.editBlogsData.id };
      this._blogService.updateBlog(updatedBlog)
        .subscribe({
          next: resp => {
            this._matDialogRef.close(updatedBlog);
            this.blogsForm.reset();
            this._snackBar.openSnackBar(`The blog with id ${updatedBlog.id} is updated successfully !!!`)
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

}