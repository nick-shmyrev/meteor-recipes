import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Recipes } from '../../../api/Recipes-API';

import './RecipeForm.html';

Template.RecipeForm.helpers({
  Recipes() {
    return Recipes;
  }
});

Template.RecipeForm.events({
  'click .fa-close'() {
    Session.set('RecipeForm.show', false);
  }
});
