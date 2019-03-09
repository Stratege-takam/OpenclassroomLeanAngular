import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit , OnDestroy{

  isAuth = false;
  lastUpdate = new Promise( (resolve , reject) => {
    const date = new Date();
    setInterval(() => {
      resolve(date);
    }, 2000);

  });

  appareils: any[];
  appareilSubscription: Subscription;

  constructor( private  appareilService: AppareilService) {
    setInterval(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
       // console.log('data on refresh : ', this.appareils);
      }
    );

    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.SaveAppareilToServer();
  }

  onFetch() {
    this.appareilService.getAppareilFromServer();
  }

  ngOnDestroy(): void {
    this.appareilSubscription.unsubscribe();
  }
}
