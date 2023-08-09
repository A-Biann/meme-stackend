import { Component, OnInit } from '@angular/core';
import {GoogleApiService, UserInfo} from "../google-api.service";
import {Router} from "@angular/router";
import {LanguageService} from "./language.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  userInfo?: UserInfo;
  displayLanguage: string = 'en-US';
  languageList = [
    { code: 'en-US', name: 'English' },
    { code: 'tw', name: 'Traditional-Chinese' },
  ];

  constructor(private readonly googleAPI: GoogleApiService,
              private router: Router,
              private languageService: LanguageService) {
    googleAPI.userProfileSubject.subscribe( (info:UserInfo) => {
        this.userInfo = info;
        console.log(info);
    });
    console.log(localStorage.getItem('locale'));
  }

  ngOnInit() {
    this.displayLanguage = this.getCurrentLanguage();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.googleAPI.isLoggedIn();
  }

  login() {
    this.googleAPI.logIn();
  }


  logout() {
    this.googleAPI.logOut();
  }

  onSelectionChange($event: string) {
    localStorage.setItem('locale', $event);
    this.redirectTo($event);
  }
  // private redirectTo(redirectLang: string) {
  //   const redirectPathName = window.location.pathname.replace(`/${this.displayLanguage}/`, `/${redirectLang}/`);
  //   window.location.pathname = redirectPathName;
  // }
  private redirectTo(redirectLang: string) {
    const newRedirectPath = `/${redirectLang}`;
    window.location.pathname = newRedirectPath;
  }

  private getCurrentLanguage = () => {
    const lang = ['en-US', 'tw'];
    const currentLang = lang.find(l => new RegExp(`/${l}/`).test(window.location.pathname));
    if (!currentLang) {
      return 'en-US';
    }
    return currentLang;
  };
}
