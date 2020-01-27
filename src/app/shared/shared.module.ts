import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AnchorDirective } from './anchor/anchor.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    AnchorDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    AnchorDirective,
    DropdownDirective,
    CommonModule,
    ReactiveFormsModule
  ],
  // - (imperative) components which are programmatically created and must be listed to become available
  // declaring dynamic components created via a component factory
  entryComponents: [
    AlertComponent
  ]
})
  // a module of shared components commonly used by other modules
export class SharedModule { }
