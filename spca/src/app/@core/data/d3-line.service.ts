

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

  d3LinesData: any;
  
  constructor(private http: HttpClient,private global: Globals) { 
    this.runId = this.global.runid;
    this.resultId = this.global.resultid;
    this.fromSkuZone = this.global.fromskuzone;
  }

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  // private d3lineUrl = '/demandtec/price/api/spcha/spchachart';  // URL to web api
  
  private d3lineUrl = 'assets/d3line.json';  // URL to web api
  private d3lineMoreUrl = 'assets/d3line3.json';  // URL to web api
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
                  this.d3LinesData = response;
                  return this.d3LinesData;
                })
               .catch(this.handleError);
  }

  getMoreD3Lines(): Promise<any> {
    let httpParams : HttpParams;
    httpParams = new HttpParams()
                      .set('runId', this.runId)
                      .set('resultId', this.resultId)
                      .set('fromSkuZone', this.fromSkuZone)
                      .set('duplicateFromRunId', this.d3LinesData.result.baseInfos.duplicateFromRunId)
                      .set('duplicateFromResultId', this.d3LinesData.result.baseInfos.duplicateFromResultId);
    return this.http.get(this.d3lineMoreUrl,{params: httpParams})
               .toPromise()
               .then(response => {
                  // console.log(response.json());
                  this.d3LinesData = this.mergeD3Data(response);
                  return this.d3LinesData;
                })
               .catch(this.handleError);
  }

  mergeD3Data(newData: any): any {
    if(newData.result.xinfos && newData.result.xinfos.length > 0){
      // xinfos
      let newXLen = newData.result.xinfos.length;
      let baseXs = [...this.d3LinesData.result.xinfos];
      let newBaseXs = baseXs.map(xinfo => {
        xinfo.name = parseInt(xinfo.name) + newXLen;
        return xinfo;
      })
      this.d3LinesData.result.xinfos = [...newData.result.xinfos, ...newBaseXs];

      // series
      let baseSeries = [...this.d3LinesData.result.series];
      let newBaseSeries = baseSeries.map(bs => {
        let newBss = bs.series.map(ss => {
          ss.name = parseInt(ss.name) + newXLen;
          return ss;
        });
        let newSeries = newData.result.series.filter(ns => ns.name == bs.name);
        if(newSeries && newSeries.length > 0){
          let newSs = newSeries[0].series;
          if(newSs && newSs.length > 0){
            // force to number
            newSs = newSs.map(nss => {
              nss.name = parseInt(nss.name);
              return nss;
            })
          }
          newBss = [...newSs, ...newBss];
        }
        bs.series = newBss;
        return bs;
      });
      this.d3LinesData.result.series = [...newBaseSeries];

      // pinfos
      let basePInfos = Object.assign({}, ...this.d3LinesData.result.pinfos);
      for (let key of Object.keys(basePInfos)) {
        let info = basePInfos[key];
        for (let [k, v] of Object.entries(info)) {
          let newKey = parseInt(k) + newXLen;
          info[newKey] = v;
          info = Object.assign({}, info, ...newData.result.pinfos[key]);
        }
        basePInfos[key] = info;
      }
      this.d3LinesData.result.pinfos = basePInfos;

      // binfos
      this.d3LinesData.result.baseInfos = Object.assign({}, ...this.d3LinesData.result.baseInfos, ...newData.result.baseInfos);
    }

    return this.d3LinesData;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
