import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-name-draw',
  templateUrl: './name-draw.component.html',
  styleUrls: ['./name-draw.component.styl'],
  providers: [DataService],
})
export class NameDrawComponent implements OnInit {



  constructor(private dataservice: DataService) { 
  }



  ngOnInit(): void {
  }

}
