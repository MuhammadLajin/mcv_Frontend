
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  constructor() {}

  // iscollapsed handle responsive mode for the humburger button to be collapsed
  isCollapsed = true;

  ngOnInit(): void {
  }


}
