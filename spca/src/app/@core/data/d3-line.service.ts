

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from '../../globals';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class D3LineService {
  
  runId : string;
  resultId : string;
  fromSkuZone : string;
  
  constructor(private http: HttpClient,private global: Globals) { 
    this.runId = this.global.runid;
    this.resultId = this.global.resultid;
    this.fromSkuZone = this.global.fromskuzone;
  }

  data = {
    "result": {
      "xinfos": [{
        "name": 1,
        "reason": "optimized",
        "runid": "1001",
        "runstate": "pass",
        "date": "2018/3/6"
      }, {
        "name": 2,
        "reason": "optimized",
        "runid": "1002",
        "date": "2018/3/6"
      }, {
        "name": 3,
        "reason": "optimized",
        "runid": "1003",
        "runstate": "pass",
        "date": "2018/3/6"
      }],
      "series": [{
        "name": 'Cost',
        "series": [
          {
            "name": 1,
            "value": 6
          },
          {
            "name": 2,
            "value": 5
          },
          {
            "name": 3,
            "value": 3
          }
        ]
      }],
      "pinfos": {
        "Cost": {
          "2": [
            {"name": "info0", "value": "value0"}
          ]
        }
      }
    }
  };

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  // private d3lineUrl = '/demandtec/price/api/spcha/spchachart';  // URL to web api
  
  private d3lineUrl = 'assets/d3line.json';  // URL to web api
  // https://localhost/demandtec/price/api/spcha/spchachart?runId=3&resultId=1&fromSkuZone=1
  // private d3lineUrl = "/dt/demandtec/price/api/spcha/spchachart?runId=3&resultId=1&fromSkuZone=1"

  getD3Lines(): Promise<any> {
    let httpParams : HttpParams;
    httpParams = new HttpParams()
                      .set('runId', this.runId)
                      .set('resultId', this.resultId)
                      .set('fromSkuZone', this.fromSkuZone);
    return this.http.get(this.d3lineUrl,{params: httpParams})
               .toPromise()
               .then(response => {
                  // console.log(response.json());
                  return response;
                })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
