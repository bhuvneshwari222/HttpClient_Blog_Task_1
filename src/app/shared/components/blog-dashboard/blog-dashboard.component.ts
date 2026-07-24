import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { Iblogs } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.scss']
})
export class BlogDashboardComponent implements OnInit {
  blogsArr: Array<Iblogs> = [];

  constructor(
    private _blogService: BlogsService,
    private _matDialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getBlogsArr();
  }

  getBlogsArr() {
    this._blogService.fetchBlogs()
      .subscribe({
        next: resp => {
          this.blogsArr = resp;
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  openBlogForm() {
    let config = new MatDialogConfig();
    config.width = '400px';
    config.disableClose = true;
    config.autoFocus = true;
    config.data = null;
    let matDialogRef = this._matDialog.open(BlogFormComponent)
    matDialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.blogsArr.unshift(resp);
      }
    })
  }

  onBlogRemove(removedId : string){
    let getIndex = this.blogsArr.findIndex(p => p.id === removedId);
    this.blogsArr.splice(getIndex,1);
  }
}
