import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeechRecognitionService } from './speech-recognition.service';
import { ChatModule } from './chat/chat.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
