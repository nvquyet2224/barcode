import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeValidatorService } from './services/barcode-validator.service';
import { BarcodeDecoderService } from './services/barcode-decoder.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('isbn') isbn;
  @ViewChild('fileInputbox') fileInputbox;

  resultUrl: any;
  resultCode: any;
  startProgress: boolean = false;
  error: any;
  message: any;
  code$ = new Subject<any>();

  @ViewChild('interactive') interactive;

  constructor(private router: Router, private sanitizer: DomSanitizer,
              private barcodeValidator: BarcodeValidatorService,
              private decoderService: BarcodeDecoderService) {}

  ngOnInit() {
    //this.decoderService.onLiveStreamInit();
    //this.decoderService.onDecodeProcessed();
    /*
    this.barcodeValidator.doSearchbyCode(this.code$)
      .subscribe(
        res => this.message = res,
        err => {
          this.message = `An Error! ${err.json().error}`;
        },
      );*/

  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  setStartProgress() {
    this.startProgress = !this.startProgress;
  }

  onChange(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    this.message = file;
    this.decoderService
      .onDecodeSingle(file)
      .then(code => {
        this.setStartProgress();
        this.resultUrl = this.sanitize(file);
        this.isbn.nativeElement.value = code;
        this.resultCode = code;
        this.decoderService.onPlaySound();
        //this.code$.next(code);
      })
      .catch(err => {
        this.resultUrl = this.sanitize(file);
        this.resultCode = '';
        this.isbn.nativeElement.value = '';
        this.setStartProgress();
        this.error = `Something is wrong: ${err}`;
      });
  }

  onCancel(e) {
    this.setStartProgress();
    this.error = `Something is wrong: Please Select An Image`;
  }

  onClick() {
    this.setStartProgress();
    this.fileInputbox.nativeElement.click();
    this.error = null;
  }

  ngOnDestroy() {
    this.decoderService.onDecodeStop();
  }

  ngAfterContentInit() {
    //this.interactive.nativeElement.children[0].style.position = 'absolute';
  }

}
