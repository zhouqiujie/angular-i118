import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class LangService {

    private langSubject = new BehaviorSubject<string>('');

    constructor(
        private storageService: LocalStorageService
        ) {

    }

    updateLang(lang: string) {
        this.langSubject.next(lang);
        this.storageService.store('lang', lang);
    }

    getLangStatus(): Observable<any> {
        return this.langSubject.asObservable();
    }

    clearLangStatus() {
        this.langSubject.next(null);
        this.storageService.clear('lang');
    }


}
