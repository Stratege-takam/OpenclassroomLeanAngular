// install  this npm install --save rxjs-compat

import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    const  counter = interval(1000);
    this.counterSubscription =  counter.subscribe(
      (value: number) => {
        this.secondes = value;
      },
      (error: any) => {
        console.log('Une erreur a été rencontrée !');
      },
      () => {
          console.log('Observable coplètée !');
      }
    );
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }


}
