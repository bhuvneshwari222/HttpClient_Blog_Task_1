import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ContactComponent } from './shared/components/contact/contact.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BlogDashboardComponent } from './shared/components/blog-dashboard/blog-dashboard.component';
import { AboutComponent } from './shared/components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogCardComponent } from './shared/components/blog-dashboard/blog-card/blog-card.component';
import { BlogFormComponent } from './shared/components/blog-dashboard/blog-form/blog-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    PageNotFoundComponent,
    BlogDashboardComponent,
    AboutComponent,
    BlogCardComponent,
    BlogFormComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
