import { Injectable } from '@angular/core';
import { CvRemoteService } from './cv-remote.service';
import { CvModel } from '../models/cv.model';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private cvRemote: CvRemoteService) { }

  public displayCvPdf(cv: CvModel): Observable<boolean> {
    return this.cvRemote.getCvPdf(cv).pipe(switchMap(pdf => {
      const fileURL = URL.createObjectURL(pdf);
      window.open(fileURL, '_blank');
      return of(true);
    }));
  }
}
