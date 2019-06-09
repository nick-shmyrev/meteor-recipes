import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Recipes } from '../../../api/Recipes-API';

import './RecipeItem.html';


Template.RecipeItem.onCreated(function() {
  this.isEditing = new ReactiveVar(false);
});

Template.RecipeItem.helpers({
  Recipes() {
    return Recipes;
  },
  updateRecipeId() {
    const { _id } = this.recipe;
    
    return `updateRecipe-${_id}`;
  },
  not(arg) {
    return !arg;
  },
  isEditing() {
    const instance = Template.instance();
    return instance.isEditing.get();
  }
});

Template.RecipeItem.events({
  'click .toggle-menu'(event) {
    event.preventDefault();

    const { _id, inMenu } = this.recipe;
    
    Meteor.call('Recipes.toggleInMenu', _id, !inMenu);
  },
  'click .fa-trash'() {
    const { _id } = this.recipe;
    const confirmation = confirm('Do you really want to delete this?');
    
    if (confirmation) {
      Meteor.call('Recipes.remove', _id);
    }
  },
  'click .fa-pencil'(event, template) {
    const isEditing = template.isEditing.get();
  
    template.isEditing.set(!isEditing);
  },
  
});
