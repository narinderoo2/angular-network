
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { webSocket,WebSocketSubject} from 'rxjs/webSocket'
// const CHAT_URL = "ws://localhost:8000/ws/test/";


export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

 
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.asObservable()

  private connectionSubject$ = new Subject();
  public connectiponDetails$ = this.connectionSubject$.asObservable()
  
  constructor() {

   }


  public connect(url): void {
  
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(url);
      console.log('check',this.socket$);
      
      this.socket$.subscribe({
        next:(res)=>{
          this.messagesSubject$.next({value:res})
        },
        error:(error)=>{
          console.log(error);
          
          this.messagesSubject$.next({value:error})

        }
      })
    }
  }
  
  private getNewWebSocket(url) {
    return webSocket({
      url: url,
      deserializer: e => e.data,
      openObserver: {
        next: () => {
          this.connectionSubject$.next('connect');
        }
      },

      closeObserver: {
        next: (event) => {
          this.connectionSubject$.next('close');
        }
      }

    });
  }

  send(msg) {  
    console.log(msg);
    
    if (this.socket$ ) {
      this.socket$.next(JSON.stringify(msg));
    }
    
  }
  }

