import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams
} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HttpRequestService {
  private postHeaders: any;
  private getHeaders: any;
  private APIEndPoint = "http://localhost:3000/";
  constructor(private http: HttpClient) {
    this.setHeaders();
    if (window.location.hostname === "localhost") {
      this.APIEndPoint = "http://localhost:3000/";
    } else {
      this.APIEndPoint = "http://localhost:3000/";
    }
  }
  setHeaders() {
    this.postHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      AccessToken: localStorage.getItem("token"),
      AccessCode: localStorage.getItem("code")
    });
    this.getHeaders = new HttpHeaders({
      AccessToken: localStorage.getItem("token"),
      AccessCode: localStorage.getItem("code")
    });
  }

  doPost(path, data, headers?) {
    if (headers) {
      return this.http.post(this.APIEndPoint + path, data, {
        headers: headers
      });
    } else {
      return this.http.post(this.APIEndPoint + path, data, {
        headers: this.postHeaders
      });
    }
  }

  doPostWithoutHeader(path, data, headers?) {
    if (headers) {
      return this.http.post(this.APIEndPoint + path, data, {});
    } else {
      return this.http.post(this.APIEndPoint + path, data, {});
    }
  }
  doPut(path, data, headers?) {
    if (headers) {
      return this.http.put(this.APIEndPoint + path, data, { headers: headers });
    } else {
      return this.http.put(this.APIEndPoint + path, data, {
        headers: this.postHeaders
      });
    }
  }
  doPutWithoutHeader(path, data) {
    return this.http.put(this.APIEndPoint + path, data);
  }

  doGet(path) {
    return this.http.get(this.APIEndPoint + path);
    // return this.http.get(this.APIEndPoint + path, { headers: this.getHeaders });
  }

  doDelete(path) {
    return this.http.delete(this.APIEndPoint + path, {
      headers: this.getHeaders
    });
  }
  doDeleteWithoutHeader(path) {
    return this.http.delete(this.APIEndPoint + path);
  }
  doGetEndPointURL() {
    return this.APIEndPoint;
  }
  getHeader() {
    this.setHeaders();
    return this.getHeaders;
  }
}
