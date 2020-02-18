import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})



export class FooterComponent implements OnInit {

    constructor(
        private translate: TranslateService,
        private langService: LangService
    ) {
        this.currentLang = translate.currentLang;
    }

    text: any = '';
    currentLang = '';

    ngOnInit() {
        this.langService.getLangStatus().subscribe(res => {
            this.currentLang = res;
            this.translate.get('footer').subscribe(res2 => {
                this.text = res2;

            });
        });
    }
}
