import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LangService } from '@shared/services';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { filter, concatMap } from 'rxjs/operators';

import {
  LANG_CH_JSON as lang_ch, LANG_EN_JSON as lang_en,
  SITE_LANGS, DEFAULT_LANG, LANG_REG
} from 'assets/i18n/lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private langService: LangService,
    private activeRoute: ActivatedRoute,
    private storageService: LocalStorageService,
    private router: Router
  ) {
    lang_en.translation.forEach(item => {
      translate.setTranslation(lang_en.lang, require('assets/i18n/' + item), true);
    });

    lang_ch.translation.forEach(item => {
      translate.setTranslation(lang_ch.lang, require('assets/i18n/' + item), true);
    });

  }

  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  ngOnInit() {

    this.translate.addLangs(SITE_LANGS);
    this.translate.setDefaultLang(DEFAULT_LANG);
    // this.langService.updateLang(this.DEFAULT_LANG);
    const lanReg = LANG_REG;
    const browserLang = this.translate.getBrowserLang();
    // console.log('browser lang:' + browserLang);
    // url.param > cookie > browser > customer
    const storageLan = this.storageService.retrieve('lang');

    this.router.events.pipe(
      filter(res => res instanceof NavigationEnd),
      concatMap(() => this.activeRoute.queryParams)
    ).subscribe(res => {
      // console.log(res)
      let siteLang = '';
      if (res.lang && res.lang.match(lanReg)) {
        siteLang = res.lang;
      } else if (storageLan && storageLan.match(lanReg)) {
        siteLang = storageLan;
      } else {
        siteLang = browserLang.match(lanReg) ? browserLang : this.translate.defaultLang;
      }

      this.translate.use(siteLang).subscribe(() => this.langService.updateLang(this.translate.currentLang));
    });


  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > this.showScrollHeight) {
      this.showScroll = true;
    } else if (this.showScroll && scrollTop < this.hideScrollHeight) {
      this.showScroll = false;
    } else { }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
