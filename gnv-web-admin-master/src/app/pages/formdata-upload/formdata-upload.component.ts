import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Photo} from '../../models/photo';
import { FormdataUploadService } from '../../services/formdata-upload.service';

@Component({
  selector: 'app-formdata-upload',
  templateUrl: './formdata-upload.component.html'
})
export class FormdataUploadComponent implements OnInit {

  photos: Photo[] = [];
  form: FormGroup;
  loading: boolean = false;
  private target_id = this.route.snapshot.paramMap.get('id');

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private formdataUploadService: FormdataUploadService,
              private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.form = this.fb.group({
      path: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('path').setValue(file);
    }
  }

  private prepareSave(): any {
    let formData = new FormData();
    formData.append('path', this.form.get('path').value);
    return formData;
  }

  onSubmit() {
    console.log(this.prepareSave());
    const fileData = this.prepareSave();
    this.loading = true;
    this.formdataUploadService.formdataUpload( fileData )
      .subscribe(photo => {
        this.photos.push(photo);
      });
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here

      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('path').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
