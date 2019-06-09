import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Recipes } from '../../../api/Recipes-API';

import './RecipesPage.html';

import '../../components/RecipeForm/RecipeForm';
import '../../components/RecipeItem/RecipeItem';


Template.RecipesPage.onCreated(function() {
  this.autorun(() => this.subscribe('recipes'));
});

Template.RecipesPage.helpers({
  recipes() {
    return Recipes.find();
  },
  not(arg) {
    return !arg;
  },
  showRecipeForm() {
    return Session.get('RecipeForm.show');
  }
});

Template.RecipesPage.events({
  'click .new-recipe'(event) {
    event.preventDefault();
    
    Session.set('RecipeForm.show', true);
  }
});
