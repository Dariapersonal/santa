import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface PersonTest {
  name: string;
  hobby: string;
}

interface Person {
  id?: string
  name: string;
  hobby: string;
  adress: Adress;
  secretSanta: string
}

interface Adress {
  city: string;
  street: string;
  home?: number;
  apartment?: number;
  postcode?: number;
}

interface Response {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static url = "https://secret-santa-b465e.firebaseio.com/persons"
  static urlTwo = "https://secret-santa-b465e.firebaseio.com/data-base-of-persons"

  namePerson = ""

  persons = []
  
  

  /* Persons: Array<Person> =[] */
  constructor(private http: HttpClient) { }

 /*  getlistOfName(name: string): Observable<Array<string>> {
    return this.http
      .get<Array<string>>(`${DataService.url}/${name}.json`)
      .pipe(map(names => {
        if (!names) {
          return []
        }
        return Object.keys(names).map(key => ({...names[key], id: key}))
      }))
  }
 */
  getNames(): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>(`${DataService.url}.json`)
      .pipe(map(persons => {
        if (!persons) {
          return []
        }
        return Object.keys(persons).map( key => ({...persons[''], id: key}))
      }))
      
  }

  getNamesOfDataBase(): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>(`${DataService.urlTwo}.json`)
      .pipe(map(persons => {
        if (!persons) {
          return []
        }
        return Object.keys(persons).map( key => ({...persons[''], id: key}))
      }))
      
  }

  getPersonsOfDataBase(name: string): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>(`${DataService.urlTwo}/${name}.json`)
      .pipe(map(persons => {
        if (!persons) {
          return []
        }
        return Object.keys(persons).map( key => ({...persons[key], id: key}))
      }))
      
  }

  getPersons(name: string): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>(`${DataService.url}/${name}.json`)
      .pipe(map(persons => {
        if (!persons) {
          return []
        }
        return Object.keys(persons).map( key => ({...persons[key], id: key}))
      }))
      
  }

  /* personsDef(person: Person) {
    return this.http
      .post<Response>(`${DataService.url}/${person.name}.json`, person)
      .pipe(map(res=>{
        return {...person, id: res.name}
      }))
  } */

  remove(name: string): Observable<void> {
    return this.http
      .delete<void>(`${DataService.url}/${name}.json`)
  }



  /* getHobby(): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>(`${DataService.url}/.json`)
      .pipe(map(persons => {
        if (!persons) {
          return []
        }
        return Object.keys(persons).map( key => ({...persons[key], id: persons[key]}))
      }))
      
  } */



 

 /*  get (person: Person): Observable<Array<string>> {
    return this.http
      .get<Array<string>>(`${DataService.url}/${name}.json`)
      .pipe(map(names => {
        return Array(name).map(key => (name))
      }))
  } */

  /* createHobby(person: Person) {
    return this.http
    .post<Response>(`${DataService.url}/${person.hobby}.json`, person)
    .pipe(map(res=>{
      return {...person, id: res.name}
    }))
  } */

  create(person: Person): Observable<Person> {
    return this.http
      .post<Response>(`${DataService.url}/${person.name}.json`, person)
      .pipe(map(res=>{
        return {...person, id: res.name}
      }))

  }
  createPersonsOfDataBase(person: Person): Observable<Person> {
    return this.http
      .post<Response>(`${DataService.urlTwo}/${person.name}.json`, person)
      .pipe(map(res=>{
        return {...person, id: res.name}
      }))
  }    
}
