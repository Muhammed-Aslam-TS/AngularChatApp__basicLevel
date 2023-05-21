import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent {
  @Output()userNameEvent = new EventEmitter<string>()
userName =''

setUserName(){
  this.userNameEvent.emit(this.userName)
}
}
