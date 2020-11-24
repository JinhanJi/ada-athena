import { Component, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'custom-modal',
	template: `
		<div class="custom-modal-container" style="position: fixed;top: 0;width: 100vw;height: 100vh;">
			<ng-template #dynamic></ng-template>
		</ div>
	`,
})
export class CustomModalComponent {
	@Output() onModalContainerDismiss = new EventEmitter<any>();
	@Output() onAfterContentInit = new EventEmitter<any>();

	@ViewChild("dynamic", {
		read: ViewContainerRef
	}) viewContainerRef: ViewContainerRef

	constructor() { }

	ngAfterContentInit() {
		this.onAfterContentInit.emit();
	}

	dismiss() {
		this.onModalContainerDismiss.emit();
	}
}