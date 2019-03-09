import {Subject} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export  class  AppareilService {


  constructor(private httpClient: HttpClient) {}

  appareilSubject = new Subject<any[]>();

  /*
  private appareils = [
    {id: 1, name: 'Machine à laver', status : 'éteint' },
    {id: 2, name: 'Frigo', status : 'allumé' },
    {id: 3, name: 'Ordinateur', status : 'éteint' },
  ];
  */
  private appareils = [];

    emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id ;
      }
    );
    return appareil;
  }
  switchOnAll() {

    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll() {

    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const  appareilObject = {
      id : 0,
      name: '',
      status: ''
    };

    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  SaveAppareilToServer() {
    this.httpClient.put('https://http-client-demon.firebaseio.com/appareil.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur de sauvegarde ! ' + error);
        }
      );
  }

  getAppareilFromServer() {
    this.httpClient.get<any>('https://http-client-demon.firebaseio.com/appareil.json').subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
        console.log('data :', response);
      },
      (error) => {
        console.log('Erreur de chargement ! ' + error);
      }
    );
  }

}
