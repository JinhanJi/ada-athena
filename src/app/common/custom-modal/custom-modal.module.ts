import {NgModule} from '@angular/core';
import { CustomModalComponent } from './custom-modal.component';
import { CustomModalService } from './custom-modal.service';


@NgModule({
  declarations: [CustomModalComponent],
  // entryComponents: [CustomModalComponent],
  providers: [CustomModalService]
})
export class NgbModalModule {
}