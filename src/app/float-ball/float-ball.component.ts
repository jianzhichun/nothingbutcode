import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from "../github/github.service";
import { NgxFloatBallComponent } from 'ngx-float-ball'
import { PopoverContent, Popover } from 'ngx-popover';


@Component({
  selector: 'app-float-ball',
  templateUrl: './float-ball.component.html',
  styleUrls: ['./float-ball.component.css']
})
export class FloatBallComponent implements OnInit {

  @ViewChild(NgxFloatBallComponent) floatingBallContainer: NgxFloatBallComponent;
  @ViewChild(PopoverContent) popoverContent: PopoverContent;

  me: { [key: string]: string } = {};

  constructor(private github: GithubService) {}

  ngOnInit() {
    this.floatingBallContainer.initPos = [window.screen.width - 200, window.screen.height - 300];
    Popover.prototype.getElement = () => (this.floatingBallContainer as any).rootNode;
    this.github.currentUser.subscribe(user => {
      this.me = user as any;
    });
  }

  login() { this.github.login(); this.popoverContent.hide(); }
  logout() { this.github.logout(); this.popoverContent.hide(); }
}
