

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SmartTableService {

  constructor(private http: Http) { }

  data = [{
    "column1": "Scenario ID: xxx",
    "column2": "Product: xxx",
    "column3": "Ref Competitor: xxx",
  }, {
    "column1": "Category: xxx",
    "column2": "Zone/Stores: xxx",
    "column3": "Ref Cost Type: xxx",
  }, {
    "column1": "Division: xxx",
    "column2": "Line Group: xxx",
  }];

  getData() {
    return this.data;
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private spcaUrl = 'assets/spca.json';  // URL to web api

  getSpcas(): Promise<any> {
    return this.http.get(this.spcaUrl)
               .toPromise()
               .then(response => {
                  // console.log(response.json());
                  return response.json();
                })
               .catch(this.handleError);
  }


  getSpca(id: number): Promise<any> {
    const url = `${this.spcaUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.spcaUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(spca: any): Promise<any> {
    return this.http
      .post(this.spcaUrl, JSON.stringify(spca), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(spca: any): Promise<any> {
    const url = `${this.spcaUrl}/${spca.id}`;
    return this.http
      .put(url, JSON.stringify(spca), {headers: this.headers})
      .toPromise()
      .then(() => spca)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
