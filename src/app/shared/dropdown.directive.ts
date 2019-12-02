import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]' // attribute selector
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // open dropdown when clicked, or close when click any where in document
  // toggle works globally
  @HostListener('document:click', ['$event']) toggle(event: Event) {
    // check if the clicked element is the attached dropdown, else close the dropdown
    this.isOpen = this.elemRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  // open/close dropdown menu when clicked
  // @HostListener('click') toggle() {
  //   this.isOpen = !this.isOpen;
  // }
  constructor(private elemRef: ElementRef) { }

}
