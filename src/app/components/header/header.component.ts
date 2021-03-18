import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Output() isDark = new EventEmitter();
  ngOnInit(): void {}

  onDarkModeToggle(event: { checked: boolean }): void {
    this.isDark.emit(event.checked);
  }
}
