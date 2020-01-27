import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

// Recipe Service provided here is also accessible to children components
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    trigger('listAnimations', [
      state('in', style({ opacity: '1', transform: 'translate(0)' })),
      // transition('void => *', [
      //   style({ opacity: 0 }),
      //   animate(5000)
      // ]),
      transition('void => *', [
        animate(10000, style({ opacity: '0', transform: 'translate(0)' }))
      ])
    ])
  ]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
