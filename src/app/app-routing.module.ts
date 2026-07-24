import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/components/home/home.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { BlogDashboardComponent } from "./shared/components/blog-dashboard/blog-dashboard.component";
import { AboutComponent } from "./shared/components/about/about.component";
import { ContactComponent } from "./shared/components/contact/contact.component";


const routes : Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent
    },
    {
        path: 'blogs',
        title: 'Blogs',
        component: BlogDashboardComponent
    },
    {
        path: 'about',
        title: 'About',
        component: AboutComponent
    },
    {
        path: 'contact',
        title: 'Contact',
        component: ContactComponent
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}