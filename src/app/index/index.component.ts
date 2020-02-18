import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Route } from '@angular/router';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { SVGDATA } from './utils';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '@shared/services';
import { concatMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  @ViewChild('video', { static: false })
  video: ElementRef;

  btnShow = true;

  lang = '';

  @ViewChild('bannerSwiper', { read: SwiperDirective, static: false })
  bannerSwiper?: SwiperDirective;

  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    speed: 1000,
    grabCursor: false,
    autoplay: true,
    scrollbar: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    updateOnImagesReady: true
  };
  swiperConfig2: SwiperConfigInterface = {
    slidesPerView: 4,
    direction: 'horizontal',
    speed: 1000,
    grabCursor: false,
    spaceBetween: 0,
    autoplay: true,
    scrollbar: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  logoes = Array.from({ length: 16 }, (item, i) => {
    return `assets/images/logo/logo${i + 1}.png`;
  });

  logoesIndex = Array.from({ length: 8 });

  svgdata = SVGDATA;
  text: any = '';

  formLoading = false;

  // Data about ewei
  path = 'https://bcss-patest.chinacloudsites.cn/ewei/tickets';

  eweiForm: FormGroup;

  emailValidator(control: FormControl): any {   // Valid Email
    const eamilReg = /^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$/i;
    const result = eamilReg.test(control.value);
    return result ? null : { email: { info: '' } };
  }



  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private translate: TranslateService,
    private langService: LangService,
    private toastr: ToastrService
  ) {
    this.eweiForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', this.emailValidator],
      phoneNumber: [''],
      companyName: [''],
      consultContent: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  ngOnInit() {
    // console.log(this.translate.currentLang)
    this.langService.getLangStatus().pipe(
      concatMap((res) => {
        // console.log(res);
        this.lang = res;
        return this.translate.get('index');
      })
    )
      .subscribe(res => {
        this.text = res;
        if (this.bannerSwiper) {
          this.bannerSwiper.update();
        }
      });

  }


  onSubmit() {
    // console.log(this.eweiForm);
    if (this.eweiForm.controls.firstName.invalid) {
      this.toastr.show(this.isEnglish() ? 'First Name cannot be empty!' : '名不能为空！');
      return;
    }
    if (this.eweiForm.controls.lastName.invalid) {
      this.toastr.show(this.isEnglish() ? 'Last Name cannot be empty!' : '姓不能为空！');
      return;
    }
    if (this.eweiForm.controls.emailAddress.invalid) {
      this.toastr.show(this.isEnglish() ? 'Incorrect Email Address!' : '邮箱地址不正确！');
      return;
    }
    if (this.eweiForm.controls.consultContent.invalid) {
      this.toastr.show(this.isEnglish() ? 'How can we asist you?' : '请填写您的需求！');
      return;
    }
    if (this.eweiForm.valid) {

      const headers = new HttpHeaders().set('Content-type', 'application/json');
      const obj = {
        Subject: this.eweiForm.controls.consultContent.value,
        Description: this.eweiForm.controls.consultContent.value,
        Priority: 0,
        ServiceDesk: {
          Id: 27175
        },
        Channel: {
          Channel: 'api',
          ChannelName: 'Bcss-En-Store-Pc',
          Source: location.host
        },
        Requester: {
          Name: this.eweiForm.controls.firstName.value + this.eweiForm.controls.lastName.value,
          MobilePhone: this.eweiForm.controls.phoneNumber.value,
          Email: this.eweiForm.controls.emailAddress.value
        },
        Fields: [
          {
            value: this.eweiForm.controls.companyName.value,
            customField: {
              id: 153187
            }
          }
        ]
      };
      this.formLoading = true;
      this.http.post(this.path,
        obj, { headers })
        .subscribe(data => {
          this.formLoading = false;
          this.toastr.show('提交成功！');
        }, (err) => {
          this.formLoading = false;
          this.toastr.show(err.error.Message, 'Request Error');
        });
    }
  }

  isEnglish(): boolean {
    return this.lang === 'en';
  }

  play() {
    this.btnShow = false;
    this.video.nativeElement.play();
  }
}
