import { SpeechRecognitionService } from '../speech-recognition.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import {MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule
  ],
  declarations: [
    ChatDialogComponent
  ],
  exports: [ ChatDialogComponent, MatCardModule ], // <-- export here
  providers: [ChatService],
})
export class ChatModule { }
