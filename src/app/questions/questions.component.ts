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
  id?: string
  name: string;
  hobby: string;
  adress: Adress;
  secretSanta: string
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.styl'],
  providers: [DataService],
})
export class QuestionsComponent implements OnInit {

  person: Person  = {
    name: "",
    hobby: "",
    adress: {
      city: "",
      street: "",
    },
    secretSanta: ""
  }
  novalid:boolean = true
  r = 1
  valid() {
    let condition
    if (this.getName) {
      condition = this.person.hobby
    } else {
      condition = this.person.name
    }
    if (condition != "" && isNaN(condition) &&  condition.length >= 3) {return this.novalid=false;}
    else {return this.novalid = true;}
  }

  nameArray: Array<Person> = []

  firstTry = {
    oneContainer: "Давай знакомиться!",
    twoContainer: "Приятно познакомиться!",
  }

  twoTry = {
    oneContainer: "Давай начнем сначала!",
    twoContainer: "Эта попытка точно будет последней! Так держать!"
  }

  personRename() {
    this.getName = false
    this.gethobby = false
    this.getadress = false
    this.change = true
    this.person.name = ""
    this.person.hobby = ""
    this.person.adress.city = ""
    this.person.adress.street = ""
    this.person.adress.home = 1
    this.person.adress.apartment = 2;
    this.person.adress.postcode = 3
  }

  getName: boolean = false
  gethobby: boolean = false
  getadress: boolean = false
  change: boolean = false

  showName() {

    this.getName = true
    this.novalid = true
  }

  getHobby() {
  this.gethobby = true
  this.novalid = true
  }
  getAdress() {
    this.getadress = true

  }

  pullPerson:boolean = false

  ready() {
    this.dataservice.persons.push(this.person)
    this.pullPerson = true
    this.dataservice.namePerson = this.person.name
    /* this.dataservice.Persons.push(this.person) */

    const person: Person = {
      name: this.person.name,
      hobby: this.person.hobby,
      adress: {
        city: this.person.adress.city,
        street: this.person.adress.street,
        home: this.person.adress.home,
        apartment: this.person.adress.apartment,
        postcode: this.person.adress.postcode
      },
      secretSanta: this.person.secretSanta
    }
    this.dataservice.create(person).subscribe(person => {
      console.log("Новый персонаж", person)
    }, err => console.error(err))


    this.dataservice.getNames().subscribe(persons => {
      this.nameArray = persons
      console.log(this.nameArray)
    })

    localStorage.setItem('loginIn','true')

  }



  array: Array<string> = []

  random: string
  clickOn: boolean = false
  getRandomName = false
  hobby: string 

  randomName() {
    for (let i of this.nameArray) {
      this.array.push(i.id)
    }
  
    for (let i of this.array) {
      if (i === this.dataservice.namePerson) {
        this.array.splice(i[i], 1)
      }
    }
    



    let random  = this.array[Math.floor(Math.random()*this.array.length)];
    this.random = random
    this.dataservice.getPersons(this.random).subscribe(persons => {
      this.ArrayPersons = persons
      console.log("Массив персонажей" + this.ArrayPersons)
    })
    
    this.clickOn = true
    this.getRandomName = true

    this.dataservice.remove(random).subscribe(()=>{
     console.log("Удалено имя рандомное")
    }, err => {
      console.error(err)
    })
  }  
  ArrayPersons: Array<Person> = []
  showHobbyAndAdress = false

  onnnn() {

    this.showHobbyAndAdress = true
    this.ArrayPersons[0].name

    console.log(this.ArrayPersons[0].hobby)
  }


  


 
    
    
    /* for (let i of this.dataservice.testPersons) {
      let name = i.name
      if (random === name) {
        this.hobby = i.hobby} */
    /* let random:string 
    while (random === this.dataservice.namePerson) {
      random  = this.array[Math.floor(Math.random()*this.array.length)];
    } */
/*     let random  = this.array[Math.floor(Math.random()*this.array.length)];  */
    /* let random = this.dataservice.Name[Math.floor(Math.random()*this.dataservice.Name.length)]; */
   /*  if (random != this.dataservice.namePerson) {
      this.random = random
    }  */
   /*  this.clickOn = true
    this.getRandomName = true
    /* console.log(this.dataservice.Persons) */
   /*  for (let i of this.dataservice.testPersons) {
      let name = i.name
      if (random === name) {
        this.hobby = i.hobby
      }
    }  */
  


  on() {
   


    
   
    /* this.dataservice.getlistOfName(this.person.name).subscribe(namess => {
      this.nameArray = namess
      console.log(this.nameArray)
    }) */
    /* this.dataservice.getlistOfName(name).subscribe(namess => {
      this.nameArray = namess
      console.log(this.nameArray)
    }) */
   
  }
  listName:boolean = false
  pppp() {
     for (let i of this.nameArray) {
       console.log(i.id)
     }
     this.listName = true
  }
  firstTrys = true
  proverka() {
    if(localStorage.getItem("loginIn")) {
      this.firstTrys = false
      console.log('lff')
    }
  }
  

  constructor(private dataservice: DataService) { 
    this.proverka()
  }

  

  ngOnInit(): void {
    this.proverka()

  }

}
