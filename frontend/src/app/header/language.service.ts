// language.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private selectedLanguageKey = 'en-US';

  getSelectedLanguage(): string | null {
    return localStorage.getItem(this.selectedLanguageKey);
  }

  setSelectedLanguage(language: string): void {
    localStorage.setItem(this.selectedLanguageKey, language);
  }
}
