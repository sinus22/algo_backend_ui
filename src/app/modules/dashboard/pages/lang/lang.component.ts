import {Component, OnInit} from '@angular/core';
import {LangService} from '@app/core/services/lang/lang.service';

@Component({
  selector: 'app-lang',
  imports: [],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss',
  standalone: true
})
export class LangComponent implements OnInit {
  constructor(langService: LangService) {

  }

  ngOnInit(): void {
    }


}
