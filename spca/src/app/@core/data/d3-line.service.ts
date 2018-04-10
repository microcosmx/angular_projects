

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class D3LineService {

  constructor(private http: Http) { }

  data = {
    "xinfos": [{
      "reason": "optimized",
      "name": "1001",
      "runstate": "pass",
      "date": "2018/3/6"
    }, {
      "reason": "optimized",
      "name": "1002",
      "date": "2018/3/6"
    }, {
      "reason": "optimized",
      "name": "1003",
      "runstate": "pass",
      "date": "2018/3/6"
    }, {
      "reason": "optimized",
      "name": "1004",
      "date": "2018/3/6"
    }, {
      "reason": "optimized",
      "name": "1005",
      "date": "2018/3/6"
    }, {
      "reason": "optimized",
      "name": "1006",
      "runstate": "pass",
      "date": "2018/3/6"
    }],
    "series": [{
      "name": 'Cost',
      "series": [
        {
          "name": "1001",
          "value": 6
        },
        {
          "name": "1002",
          "value": 5
        },
        {
          "name": "1003",
          "value": 3
        },
        {
          "name": "1004",
          "value": 1
        },
        {
          "name": "1005",
          "value": 3
        },
        {
          "name": "1006",
          "value": 8
        }
      ]
    }],
    "pinfos": {
      "Cost": {
        "1002": [
          {"name": "info0", "value": "value0"}
        ],
        "1004": [
          {"name": "info1", "value": "value1"},
          {"name": "info2", "value": "value2"},
          {"name": "info3", "value": "value3"}
        ]
      }
    }
  
  };

  private headers = new Headers({'Content-Type': 'application/json'});
  private d3lineUrl = 'assets/d3line.json';  // URL to web api

  getD3Lines(): Promise<any> {
    return this.http.get(this.d3lineUrl)
               .toPromise()
               .then(response => {
                  // console.log(response.json());
                  return response.json();
                })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
