/**
 * Banco api.
 */
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/dom/ajax'
import {v1 as uuid} from 'uuid'
import {SHA256} from 'crypto-js'

class BancoRestAPI {
  public url: string
  public token: string
  public userId: string


  constructor(param: string) {
    switch (typeof param) {
      case 'string':
        this.url = param as string
        break
      default:
        throw new Error(`param error with "${typeof param}"`)
    }
  }

  public setToken(token: string) {
    this.token = token
  }

  public setUserId(userId: string) {
    this.userId = userId
  }

  public get(url: string) {
    return Observable.ajax({
        url         :  this.url + url,
        method      : 'GET',
        responseType: 'json',
        headers     : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.token,
          'X-User-Id'    : this.userId,
        }
      })
  }

  public post(url: string, params: any) {
    return Observable.ajax({
      url         : this.url + url,
      method      : 'POST',
      responseType: 'json',
      body        : params,
      headers     : {
        'Accept'       : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'X-Auth-Token' : this.token,
        'X-User-Id'    : this.userId,
        'cache-control': 'no-cache'
      }
    })
  }

  public put(url: string, params: any) {
    return Observable.ajax({
      url         : this.url + url,
      method      : 'PUT',
      responseType: 'json',
      body        : params,
      headers     : {
        'Accept'       : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'X-Auth-Token' : this.token,
        'X-User-Id'    : this.userId,
        'cache-control': 'no-cache'
      }
    })
  }

  public del(url: string) {
    return Observable.ajax({
      url         : this.url + url,
      method      : 'DELETE',
      responseType: 'json',
      headers     : {
        'Accept'       : 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'X-Auth-Token' : this.token,
        'X-User-Id'    : this.userId,
        'cache-control': 'no-cache'
      }
    })
  }
}

export default BancoRestAPI