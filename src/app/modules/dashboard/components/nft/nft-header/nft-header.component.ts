import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class NftHeaderComponent implements OnInit {
  @Input() createUrl: string ='';
  constructor() {}

  ngOnInit(): void {}
}
