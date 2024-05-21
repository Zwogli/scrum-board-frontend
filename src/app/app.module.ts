import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AuthIntercepterService } from './services/auth-intercepter/auth-intercepter.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { NewTaskPrioComponent } from './components/new-task-prio/new-task-prio.component';
import { SelectColorComponent } from './components/select-color/select-color.component';
import { SelectColumnComponent } from './components/select-column/select-column.component';
import { NewTaskDueDateComponent } from './components/new-task-due-date/new-task-due-date.component';

@NgModule({
  // todo add components
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    BoardComponent,
    ContactsComponent,
    NavbarComponent,
    NewTaskComponent,
    NewTaskPrioComponent,
    SelectColorComponent,
    SelectColumnComponent,
    NewTaskDueDateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
