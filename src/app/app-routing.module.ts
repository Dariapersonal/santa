import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ByakaComponent } from './byaka/byaka.component';
import { MainComponent } from './main/main.component';
import { NameDrawComponent } from './name-draw/name-draw.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'byaka', component: ByakaComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'name-draw', component: NameDrawComponent},

  /* {path: '', component: MainComponent}, //для отображения главной странички используется CarComponent
  {path: 'car', component: CarComponent},
  {path: 'time', component: ShowtimeComponent},
  {path: 'examples', component: ExamplesComponent},
  {path: 'organizer-app', component: OrganizerComponent},
  {path: 'form', component: FormComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
