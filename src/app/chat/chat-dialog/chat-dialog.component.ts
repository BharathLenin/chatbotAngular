import { SpeechRecognitionService } from '../../speech-recognition.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  formValue: string;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(public chat: ChatService) { }
  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }

  ngAfterViewChecked() {  
    this.myScrollContainer.nativeElement.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    //this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
} 

  
  
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
  startVoice() {
    this.chat.activateSpeechSearchMovie();
  }

  
}