import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnchor]'
})
export class AnchorDirective {
  // ViewContainerRef provides a pointer on the DOM where directive is used, like a local reference
  // DI the ViewContainerRef and make it public to allow access outside this component
  constructor(public viewContainerRef: ViewContainerRef) { }

}
