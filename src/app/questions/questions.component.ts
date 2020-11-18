import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Adress {
  city: string;
  street: string;
  home?: number;
  apartment?: number;
  postcode?: number;
}
interface Person {
  id?: string;
  name: string;
  hobby: string;
  adress: Adress;
  secretSanta: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.styl'],
  providers: [DataService],
})
export class QuestionsComponent implements OnInit {
  person: Person = {
    name: '',
    hobby: '',
    adress: {
      city: '',
      street: '',
    },
    secretSanta: '',
  };
  novalid: boolean = true;
  r = 1;
  valid() {
    let condition;
    if (this.getName) {
      condition = this.person.hobby;
    } else {
      condition = this.person.name;
    }
    if (condition != '' && isNaN(condition) && condition.length >= 3) {
      return (this.novalid = false);
    } else {
      return (this.novalid = true);
    }
  }

  nameArray: Array<Person> = [];

  firstTry = {
    oneContainer: 'Давай знакомиться!',
    twoContainer: 'Приятно познакомиться!',
  };

  twoTry = {
    oneContainer: 'Давай начнем сначала!',
    twoContainer: 'Эта попытка точно будет последней!',
  };

  personRename() {
    this.getName = false;
    this.gethobby = false;
    this.getadress = false;
    this.change = true;
    this.person = {
      name: '',
      hobby: '',
      adress: {
        city: '',
        street: '',
      },
      secretSanta: '',
    };
  }

  getName: boolean = false;
  gethobby: boolean = false;
  getadress: boolean = false;
  change: boolean = false;

  showName() {
    this.getName = true;
    this.novalid = true;
  }

  getHobby() {
    this.gethobby = true;
    this.novalid = true;
  }
  getAdress() {
    this.getadress = true;
  }

  pullPerson: boolean = false;

  ready() {
    this.dataservice.persons.push(this.person);
    this.pullPerson = true;
    this.dataservice.namePerson = this.person.name;
    /* this.dataservice.Persons.push(this.person) */

    this.dataservice.create(this.person).subscribe(
      (person) => {
        console.log('Новый персонаж', person);
      },
      (err) => console.error(err)
    );

    this.dataservice.createPersonsOfDataBase(this.person).subscribe(
      (person) => {
        console.log('Новый персонаж в базе: ', person);
      },
      (err) => console.error(err)
    );

    this.dataservice.getNames().subscribe((persons) => {
      this.nameArray = persons;
      console.log(this.nameArray);
    });

    localStorage.setItem('loginIn', 'true');
  }

  array: Array<string> = [];

  random: string;
  clickOn: boolean = false;
  getRandomName = false;
  hobby: string;

  randomName() {
    for (let i of this.nameArray) {
      this.array.push(i.id);
    }

    for (let i of this.array) {
      if (i === this.dataservice.namePerson) {
        this.array.splice(i[i], 1);
      }
    }

    let random = this.array[Math.floor(Math.random() * this.array.length)];
    this.random = random;
    this.dataservice.getPersons(this.random).subscribe((persons) => {
      this.ArrayPersons = persons;
      console.log('Массив персонажей' + this.ArrayPersons);
    });

    this.clickOn = true;
    this.getRandomName = true;

    this.dataservice.remove(random).subscribe(
      () => {
        console.log('Удалено имя рандомное');
      },
      (err) => {
        console.error(err);
      }
    );
    localStorage.setItem(this.person.name, random);
  }
  ArrayPersons: Array<Person> = [];
  showHobbyAndAdress = false;

  showAdressRandom() {
    this.showHobbyAndAdress = true;
  }

  listName: boolean = false;
  firstTrys = true;
  loginСheck() {
    if (localStorage.getItem('loginIn')) {
      this.firstTrys = false;
    }
  }

  remind: string;
  remindNameArray: Person[] = [];
  NameArray: Array<string> = [];
  remindRandomName: string;
  showRemindName = false;
  ArrayAdress: Person[] = [];
  showRemindAdress = false;
  nameNotFound = false

  getRemindName() {
    this.dataservice.getNamesOfDataBase().subscribe((persons) => {
      this.remindNameArray = persons;
    });
    for (let i of this.remindNameArray) {
      this.NameArray.push(i.id);
    }

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === this.remind) {
        this.remindRandomName = localStorage.getItem(key);
        this.showRemindName = true;
      }
      else {
        this.nameNotFound = true
      }
    }

    this.dataservice
      .getPersonsOfDataBase(this.remindRandomName)
      .subscribe((persons) => {
        this.ArrayAdress = persons;
        console.log(persons);
      });

    /* let key = localStorage.key(1)
    console.log(key) */
  }

  getRemindAdress() {
    this.showRemindAdress = true;
  }

  constructor(private dataservice: DataService) {
    this.loginСheck();
  }

  ngOnInit(): void {
    this.loginСheck();
  }
}
