import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChatComponent } from './chat.component';
import { OneChatComponent } from './onechat/onechat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatComponent,
      },
      {
        path: 'onechat',
        component: OneChatComponent,
      }
    ])
    //ComponentsModule
  ],
  declarations: [ChatComponent,OneChatComponent]
})
export class ChatModule {}