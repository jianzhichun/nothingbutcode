import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assignable-buffer',
  templateUrl: './assignable-buffer.component.html',
  styleUrls: ['./assignable-buffer.component.css']
})
export class AssignableBufferComponent implements OnInit {

  @Input() assignables: { [key: string]: string }[];

  constructor() { }

  ngOnInit() { }

}
