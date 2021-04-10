import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HomeService {
  constructor(private _router: Router, private http: HttpClient) {}

  getStockInformation(searchTerm) {
    return this.http.get(`${environment.stockDatApiUrl}/stocks/${searchTerm}`);
  }

  // navigateToInterview(interviewId: string) {
  //   this._router.navigate([`/interview/${interviewId}`]);
  // }
}
