export class User {

 /* firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
*/

  constructor( public firstName: string, public lastName: string,
               public email: string, public drinkPreference: string,
               public hobbies?: string[]) {}
}
