import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Iblogs } from 'src/app/shared/models/posts';
import { BlogsService } from 'src/app/shared/services/blogs.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { BlogFormComponent } from '../blog-form/blog-form.component';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog !: Iblogs;
  @Output() emitRemoveId : EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _blogService: BlogsService,
    private _snackBar: SnackBarService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEditBlog(){
    let config = new MatDialogConfig();
    config.data = this.blog;
    config.width = '400px';
    config.disableClose = true;
    config.autoFocus = true;
    let matRef = this._matDialog.open(BlogFormComponent, config);
    matRef.afterClosed().subscribe({
      next: resp =>{
        if(resp){
          this.blog = resp;
        }
      }
    })
  }

  onRemoveBlog() {
    let config = new MatDialogConfig;
    config.disableClose = true;
    config.width = '400px';
    config.data = `Are you sure, you want to remove this blog with id ${this.blog.id}?`;
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config);
    matDialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this._blogService.removeBlog(this.blog.id)
          .subscribe({
            next: resp => {
              this._snackBar.openSnackBar(`The blog with id ${this.blog.id} is deleted successfully !!!`);
              this.emitRemoveId.emit(this.blog.id);
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }
}
