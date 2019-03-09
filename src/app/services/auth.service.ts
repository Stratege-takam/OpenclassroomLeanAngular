import {reject} from 'q';

export  class  AuthService {

  isAuth = false;

  SignIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          this.isAuth = true;
          resolve(true);
        }, 2000);
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}
