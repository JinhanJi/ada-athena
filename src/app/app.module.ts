import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalService } from './common/custom-modal/custom-modal.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { FirstChildComponent } from './components/first-child/first-child.component';
import { CustomTestDialogComponent } from './components/custom-test-dialog/custom-test-dialog.component';
// import { ModalManager } from './common/modalManage/modalManager'

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    FirstChildComponent,
    CustomTestDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  // entryComponents: [
  //   DialogComponent,
  //   CustomTestDialogComponent,
  // ],
  providers: [CustomModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
