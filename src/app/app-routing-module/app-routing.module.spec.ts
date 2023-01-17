import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ActivatedRoute, Router} from "@angular/router";
import { routes } from "./app-routing.module";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import {AppComponent} from "../app.component";
import {ToasterComponent} from "../toast/toaster/toaster.component";
import {NavBarComponent} from "../header-footer/nav-bar/nav-bar.component";
import {HomePageComponent} from "../home/home-page/home-page.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ArticleListComponent} from "../article/article-list-component/article-list.component";
import {PaginatorComponent} from "../pagination/paginator/paginator.component";
import {FooterComponent} from "../header-footer/footer/footer.component";
import {RecFilmCardComponent} from "../film/rec-film-card/rec-film-card.component";
import {ArticleDetailComponent} from "../article/article-detail/article-detail.component";

describe('Routes test', () => {
  let location: Location;
  let router: Router;
  let route: ActivatedRoute;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HomePageComponent,
        NavBarComponent,
        ToasterComponent,
        ArticleListComponent,
        ArticleDetailComponent,
        PaginatorComponent,
        FooterComponent,
        RecFilmCardComponent,
        PageNotFoundComponent
      ]
    });

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('navigate to "" should redirect to /home which is HomePageComponent', fakeAsync( () => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('navigate to "article/artId" should redirect to ArticleDetailComponent', fakeAsync( () => {
    router.navigate(['article', 5]);
    tick();
    expect(location.path()).toBe('/article/5');
  }));

});
