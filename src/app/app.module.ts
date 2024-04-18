import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { ModalDeleteComponent } from './shared/components/modal-delete/modal-delete.component';
import { OrderbyPipe } from './shared/pipes/orderby.pipe';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [{ path: 'list', component: TasksListComponent }];

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TasksFormComponent,
    TasksCardComponent,
    HeaderComponent,
    ModalDeleteComponent,
    OrderbyPipe,
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
