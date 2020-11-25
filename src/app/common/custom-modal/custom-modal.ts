import { Input, Output, EventEmitter } from "@angular/core";

export abstract class CustomModal {
    @Output() onConfirm = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<void>();

    public abstract confirm(): any;
    public abstract cancel(): any;
}