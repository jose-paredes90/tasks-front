import { RouterModule, Routes } from "@angular/router";
import { TasksListComponent } from "./pages/tasks-list/tasks-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'tasks', component: TasksListComponent },
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }