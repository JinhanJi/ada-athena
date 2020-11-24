import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, Type, ViewRef, ComponentRef } from '@angular/core';
import { CustomModal } from './custom-modal';
import { CustomModalComponent } from './custom-modal.component';

@Injectable()
export class CustomModalService {

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private injector: Injector,
		private appRef: ApplicationRef
	) {}

	getRootViewContainer(): ComponentRef<any> {
    const rootComponents = this.appRef['_rootComponents'];
    if (rootComponents.length) return rootComponents[0];
  }

	public open(modal: Type<CustomModal>, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			let modalHost = this.componentFactoryResolver
			.resolveComponentFactory(CustomModalComponent)
			.create(this.injector);
			modalHost.instance.onAfterContentInit.subscribe(()=> {
				modalHost.changeDetectorRef.detectChanges();
				let modalContainerRef = modalHost.instance.viewContainerRef;
				modalContainerRef.clear();
				let modalComponent = modalContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(modal));
				modalComponent.instance.data = data;
				modalComponent.instance.onConfirm.subscribe((value?: any) => {
					resolve(value);
					this.dismiss(modalHost);
				});
				modalComponent.instance.onCancel.subscribe(() => {
					reject();
					this.dismiss(modalHost);
				});
			});
			modalHost.instance.onModalContainerDismiss.subscribe(() => {
				reject();
				this.dismiss(modalHost);
			})
			this.appRef.attachView(modalHost.hostView);
			document.body.append(modalHost.location.nativeElement);
		});
	}

	private dismiss(modalHost: ComponentRef<CustomModalComponent>) {
		this.appRef.detachView(modalHost.hostView);
		modalHost.destroy();
	}
}