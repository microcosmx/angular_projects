

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SmartTableService {

  constructor(private http: Http) { }

  data = {"result": [{
    "column1": {"name": "Category", "value":"Coffee"},
    "column2": {"name": "Product", "value":"666"},
    "column3": {"name": "Zone", "value":"333"}
  }, {
    "column1": {"name": "Division", "value":"Chain"},
    "column2": {"name": "UPC", "value":"666"},
    "column3": {"name": "Competitor", "value":"666"}
  }]};

  getData() {
    return this.data;
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private spcaUrl = 'assets/spca.json';  // URL to web api
  // https://localhost/demandtec/price/api/spcha/spchainfo?runId=3&resultId=1&fromSkuZone=1
  // private spcaUrl = "/dt/demandtec/price/api/spcha/spchainfo?runId=3&resultId=1&fromSkuZone=1"

  getSpcas(): Promise<any> {
    return this.http.get(this.spcaUrl)
               .toPromise()
               .then(response => {
                  // console.log(response.json());
                  // return response.json();
                  return response;
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
