/**
 * Banco api.
 */
import {Observable} from 'rxjs'
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject'
import {v1 as uuid} from 'uuid'
import {SHA256} from 'crypto-js'
import * as ws from 'websocket'

class BancoRealtimeAPI {
  public url: string
  public webSocket: WebSocketSubject<{}>
  public isKeepAlive: boolean

  constructor(param: string) {
    switch (typeof param) {
      case 'string':
        this.url = param as string
        this.webSocket = this.createWebSocket(this.url)
        this.isKeepAlive = false
        break
      default:
        throw new Error(`param error with "${typeof param}"`)
    }
  }

  public createWebSocket(url: string) {
    const socket = new WebSocketSubject({
      url          : url,
      WebSocketCtor: ws.w3cwebsocket
    })

    return socket
  }

  /**
   * Returns the Observable to the Banco API Socket
   */
  public getObservable() {
    return this.webSocket.catch(err => Observable.of(err))
  }

  /**
   * onMessage
   */
  public onMessage(messageHandler?: ((value: {}) => void) | undefined): void {
    this.subscribe(messageHandler, undefined, undefined)
  }

  /**
   * onError
   */
  public onError(errorHandler?: ((error: any) => void) | undefined): void {
    this.subscribe(undefined, errorHandler, undefined)
  }

  /**
   * onCompletion
   */
  public onCompletion(completionHandler?: (() => void) | undefined): void {
    this.subscribe(undefined, undefined, completionHandler)
  }

  /**
   * Subscribe to the WebSocket of the Banco API
   */
  public subscribe(messageHandler?: ((value: {}) => void) | undefined, errorHandler?: ((error: any) => void) | undefined, completionHandler?: (() => void) | undefined) {
    this.getObservable().subscribe(messageHandler, errorHandler, completionHandler)
  }

  /**
   * sendMessageToServer to Rocket.Chat Server
   */
  public sendMessageToServer(messageObject: {}): void {
    this.webSocket.next(JSON.stringify(messageObject))
  }

  /**
   * getObservableFilteredByMessageType
   */
  public getObservableFilteredByMessageType(messageType: string) {
    return this.getObservable().filter((message: any) => message.msg === messageType)
  }

  /**
   * getObservableFilteredByID
   */
  public getObservableFilteredByID(id: string) {
    return this.getObservable().filter((message: any) => message.id === id)
  }

  /**
   * connectToServer
   */
  public connectToServer() {
    this.sendMessageToServer({'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']})
    return this.getObservableFilteredByMessageType('connected')
  }

  /**
   * keepAlive, Ping and Pong to the Rocket.Chat Server to Keep the Connection Alive.
   */
  public keepAlive(): void {
    this.isKeepAlive = true
    this.getObservableFilteredByMessageType('ping').subscribe(
      message => {
        if (this.isKeepAlive) {
          this.sendMessageToServer({msg: 'pong'})
        }
      }
    )
  }

  public disconnect(): void {
    this.isKeepAlive = false
    this.webSocket.unsubscribe()
  }

  /**
   * Login with Username and Password
   */
  public login(username: string, password: string) {
    let id = uuid()
    let usernameType = username.indexOf('@') !== -1 ? 'email' : 'username'
    this.sendMessageToServer({
      'msg'   : 'method',
      'method': 'login',
      'id'    : id,
      'params': [
        {
          'user'    : {[usernameType]: username},
          'password': {
            'digest'   : SHA256(password).toString(),
            'algorithm': 'sha-256'
          }
        }
      ]
    })
    return this.getLoginObservable(id)
  }

  /**
   * Login with Authentication Token
   */
  public loginWithAuthToken(authToken: string) {
    let id = uuid()
    this.sendMessageToServer({
      'msg'   : 'method',
      'method': 'login',
      'id'    : id,
      'params': [
        {'resume': authToken}
      ]
    })
    return this.getLoginObservable(id)
  }

  /**
   * Login with OAuth, with Client Token and Client Secret
   */
  public loginWithOAuth(credToken: string, credSecret: string) {
    let id = uuid()
    this.sendMessageToServer({
      'msg'   : 'method',
      'method': 'login',
      'id'    : id,
      'params': [
        {
          'oauth': {
            'credentialToken' : credToken,
            'credentialSecret': credSecret
          }
        }
      ]
    })
    return this.getLoginObservable(id)
  }

  /**
   * getLoginObservable
   */
  public getLoginObservable(id: string) {
    let resultObservable = this.getObservableFilteredByID(id)
    let resultId: string
    resultObservable.subscribe(
      (message: any) => {
        if ((message.id === id && message.msg === 'result' && !message.error))
          resultId = message.result.id
      }
    )

    let addedObservable = this.getObservable().buffer(resultObservable).find(obj => obj.find(msg => msg.id === resultId && resultId !== undefined) !== undefined).map(obj => obj[0])
    return Observable.merge(resultObservable, addedObservable)
  }

  /**
   * send message
   * @param {string} messageId
   * @param {string} rid
   * @param {string} message
   * @returns {Observable<T>}
   */
  public sendMessage(messageId: string, rid: string, message: string) {
    let id = uuid()
    this.sendMessageToServer({
      'msg'   : 'method',
      'method': 'sendMessage',
      'id'    : id,
      'params': [
        {
          '_id': messageId,
          'rid': rid,
          'msg': message
        }
      ]
    })

    return this.getObservableFilteredByID(id)
  }

  /**
   * Get Observalble to the Result of Method Call from Rocket.Chat Banco API
   */
  public callMethod(method: string, ...params: Array<{}>) {
    let id = uuid()
    this.sendMessageToServer({
      'msg': 'method',
      id,
      method,
      params
    })

    return this.getObservableFilteredByID(id)
  }

  /**
   * getSubscription
   */
  public getSubscription(streamName: string, streamParam: string, addEvent: boolean) {
    let id = uuid()

    // this.sendMessageToServer({
    //   'msg'   : 'sub',
    //   'id'    : id,
    //   'name'  : streamName,
    //   'params': [
    //     streamParam,
    //     addEvent
    //   ]
    // })
    //
    // return this.getObservableFilteredByID(id)

    let subscription = this.webSocket.multiplex(
      () => JSON.stringify({
        'msg'   : 'sub',
        'id'    : id,
        'name'  : streamName,
        'params': [
          streamParam,
          addEvent
        ]
      }),
      () => JSON.stringify({
        'msg': 'unsub',
        'id' : id
      }),
      (message: any) => {
        return typeof message.collection === 'string' && message.collection === streamName && message.fields.eventName === streamParam
      }
      // Proper Filtering to be done. This is temporary filter just for the stream-room-messages subscription
    )

    return subscription
  }

  public unsubscribe(subscriptionId: string | null) {
    this.sendMessageToServer({
      'msg': 'unsub',
      'id' : subscriptionId
    })

    return this.getObservableFilteredByID(subscriptionId)
  }

  /**
   * get Stream room messages
   * @param streamId
   * @param roomId
   */
  public getStreamRoomMessages(roomId: string) {
    return this.getSubscription('stream-room-messages', roomId, false)
  }

}

export default BancoRealtimeAPI