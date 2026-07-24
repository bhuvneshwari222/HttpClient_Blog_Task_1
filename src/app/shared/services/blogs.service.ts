import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iblogs } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  BASE_URL = environment.base_url;
  BLOGS_URL = `${this.BASE_URL}/BLOGS.json`;

  constructor(
    private _http: HttpClient
  ) { }

  fetchBlogs(): Observable<any> {
    return this._http.get(this.BLOGS_URL)
      .pipe(
        map((obj: any) => {
          let blogs = [];
          for (const key in obj) {
            blogs.push({ ...obj[key], id: key })
          }
          return blogs;                  
        })
      )
  }

  createBlog(blog: Iblogs): Observable<any>{
    return this._http.post<Iblogs>(this.BLOGS_URL,blog);
  }

  updateBlog(updatedBlog: Iblogs): Observable<any>{
    let UPDATED_BLOG_URL = `${this.BASE_URL}/blogs/${updatedBlog.id}.json`;
    return this._http.patch(UPDATED_BLOG_URL, updatedBlog);
  }

  removeBlog(id: string): Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/blogs/${id}.json`;
    return this._http.delete(REMOVE_URL);
  }
}
