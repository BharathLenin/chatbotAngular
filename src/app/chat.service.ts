import { NgZone } from '@angular/core';
import { timeout } from 'rxjs/operator/timeout';
import { SpeechRecognitionService } from './speech-recognition.service';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string, public title: string, public image: string, 
  public text: string, public button: string, public buttonUrl: string) {}
}

interface IWindow extends Window{
        SpeechSynthesisUtterance: any;
        SpeechSynthesis: any;
    }
@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  sample = new BehaviorSubject<string>('');
  showSearchButton: boolean;
    speechData: string;
    public mikeOn = false;

    constructor(private speechRecognitionService: SpeechRecognitionService, private zone: NgZone) {
        this.showSearchButton = true;
        this.speechData = "";
    }

    

        //  constructor(input:String){
        //          if ('speechSynthesis' in window) {
        //             console.log('Your browser supports speech synthesis.');
        //         // speak('hi');
        //         } else {
        //             alert('Sorry your browser does not support speech synthesis. Try this in <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.');
        //         }
        public synthesis(input:String) {
             const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
        const {SpeechSynthesis}: IWindow = <IWindow>window;

       // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();
        // Set the text.
        msg.text = input;
       // Set the attributes.
        msg.lang = 'en-US';
       // msg.voice = 'native'; msg.voice = 'Google US English'; //  'Google UK English Female' 
        //msg.voice = 'Google US English' 
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
    //    msg.onend = function(event) { 
    //        if(this.mikeOn === true) {
    //             this.mikeOn = false;
    //             this.activateSpeechSearchMovie(); 
    //         }
    //     }
        // Queue this utterance.
        //var talk = new SpeechSynthesis();
        (<any>window).speechSynthesis.speak(msg);
        
        
        }
       

    ngOnInit() {
        console.log("hello")
        // this.sample.subscribe((value) => {
        //     console.log('sbscriber');
        //   if(this.speechData != '') {
        //       console.log("Dineesh");
        //       this.converse(this.speechData);
        //       this.speechData = '';
        //     }

        // });
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
    }

    activateSpeechSearchMovie(): void {
        this.showSearchButton = false;
console.log('inside method');
       this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.mikeOn = true;
                this.speechData = value;
                this.converse(this.speechData);
                //this.activateSpeechSearchMovie();
                //this.sample.next(this.speechData);
                console.log(value);
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                //this.activateSpeechSearchMovie();
            });

            
    }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
      var title = '';
                   var img = '';
                   var subtitle = '';
                   var text = '';
                   var button = '';
                   var buttonUrl = '';
    const userMessage = new Message(msg, 'user', title, img, text, button, buttonUrl);
    this.update(userMessage);
    return this.client.textRequest(msg)
               .then(res => {
                   var speech = '';
                   
                //   const msgarray = res.result.fulfillment.messages;
                //   console.log(msgarray);
                //   for ( var i = 0; i < msgarray.length; i++) {
                //       if(msgarray[i].type === "simple_response") {
                //         speech = msgarray[i].textToSpeech;
                //       }

                //       if(msgarray[i].type === "basic_card") {
                //         title  = msgarray[i].title;
                //         img = msgarray[i].image.url;
                //         subtitle = msgarray[i].subtitle;
                //       }
                //   }
                  speech = res.result.fulfillment.speech;
                  this.synthesis(speech);
                  if(speech === "Sku Name is Hammer") {
                      title = "Sku Name: Hammer";
                      img = "https://images.homedepot-static.com/productImages/f1e59730-23fb-4660-ad22-61fef380589a/svn/tekton-claw-hammers-30303-64_1000.jpg";
                        text = "Price= $12"+"\n"+"Available at all stores";
                        button = "Click for Hammmer";
                        buttonUrl = "https://www.homedepot.com/p/Janome-HD1000-Black-Edition-Industrial-Grade-Sewing-Machine-001HD1000BE/302260705";
                  }
                  else if(speech === "Sku Name is Sewing Machine") {
                      title = "Sku Name: Sewing Machine";
                      img = "https://images.homedepot-static.com/productImages/dd70303c-dbf0-423e-8a9f-fffc189897f8/svn/black-janome-sewing-machines-001hd1000be-64_1000.jpg";
                      text = "Price= $100"+"\n"+"Available at all stores";
                      button = "Click for Sewing Machine";
                        buttonUrl = "https://www.homedepot.com/p/Janome-HD1000-Black-Edition-Industrial-Grade-Sewing-Machine-001HD1000BE/302260705";
                  }
                  const botMessage = new Message(speech, 'bot', title, img, text, button, buttonUrl);
                  this.update(botMessage);
                //   if(this.mikeOn === true) {
                //       this.mikeOn = false;
                //       this.activateSpeechSearchMovie();
                //   }
                  //this.activateSpeechSearchMovie();
               });
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }
}