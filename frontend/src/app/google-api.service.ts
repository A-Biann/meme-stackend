import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import {environment} from "../environments/environment";

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '211776908099-bpodr4255bogmbauk2hp60htpst42q9f.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService{
  gmail = 'https://gmail.googleapis.com'

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    // confiure oauth2 service
    oAuthService.configure(authCodeFlowConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = environment.frontendUrl;
    // confiure oauth2 service
    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then( () => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      oAuthService.tryLoginImplicitFlow().then( () => {

        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!oAuthService.hasValidAccessToken()) {
          // oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }

      })
    });
  }
  ngOnInit(): void {
  }
  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
  }
  logIn() {
    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    this.oAuthService.initCodeFlow();
  }
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  logOut() {
    this.oAuthService.logOut();
    alert("You're now logged out!");
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}
