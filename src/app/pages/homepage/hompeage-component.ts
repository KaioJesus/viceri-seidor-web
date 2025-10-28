import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./../../components/header/header-component";
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './homepage-component.html',
})
export class HomepageComponent {

}
