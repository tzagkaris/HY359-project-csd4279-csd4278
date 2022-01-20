import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private ps: PatientService, private _router: Router) { }

  @Input() recipient_id: number;
  view: string;
  messageArr: Message[] = [];
  canSend: boolean = true;
  sendColorClass: string = "";

  ngOnInit(): void {

    this.view = 'doctor'
    if(localStorage.getItem('accountType') == 'patient')
      this.view = 'patient'

    /* implement only patient view for now */
    if(this.view == 'patient') {

      this.ps.getChat(this.recipient_id).subscribe(msg => {
        this.messageArr = msg;

      }, er => {
        this.canSend = false;
        this.sendColorClass = "button-gray"
      })
    }
  }

  sendMessage(input: HTMLInputElement) {

    let content = input.value;
    if(!content.length) return;

    if(!this.canSend) return;

    /* implemented patient side for now */
    if(this.view == 'patient') {

      let msg = {
        content: content,
        from: this.view,
        doctor_id: this.recipient_id,
        date: new Date().toJSON(),
      }

      this.ps.postMessage(msg).subscribe(res => {
        let current_route = this._router.url;
        this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this._router.navigate([current_route]));
      }, er => console.log(er))
      return
    }


  }

}
