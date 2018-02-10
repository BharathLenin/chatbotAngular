import { SpeechRecognitionService } from '../speech-recognition.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule, 
  MatFormFieldModule, MatInputModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ChatDialogComponent
  ],
  exports: [ ChatDialogComponent, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule,
  MatFormFieldModule, MatInputModule], // <-- export here
  providers: [ChatService],
})
export class ChatModule { }
