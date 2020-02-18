import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(
        private translate: TranslateService,
        private langService: LangService,
        private router: Router,
        private location: Location
    ) {
        this.currentLang = translate.currentLang;
    }

    text: any = '';
    currentLang = '';
    collapse = false;

    ngOnInit() {
        this.langService.getLangStatus().subscribe(res => {
            this.currentLang = res;
            // console.log(res)
            this.translate.get('header').subscribe(res2 => {
                this.text = res2;

            });
        });
    }

    clickCollapse() {
        this.collapse = !this.collapse;
    }

    changeLan(lang) {
        this.translate.use(lang).subscribe(res => {
            this.langService.updateLang(lang);
            // this.router.navigateByUrl('/?lang=' + lang);
            // this.location.go('/')
            this.collapse = false;
        });
    }

    hideNavList() {
        this.collapse = false;
    }
}
