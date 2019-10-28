import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CvModel } from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CvRemoteService {

  constructor(private httpClient: HttpClient) { }


  public getCvPdf(cv: CvModel): any {
    return this.httpClient.post(
      'cv-api/public/cv/generated',
      cv,
      {
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/json' }
      }
    ).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }
}
