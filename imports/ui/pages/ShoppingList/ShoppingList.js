import { Template } from 'meteor/templating';

import './ShoppingList.html';

import { Recipes } from '../../../api/Recipes-API';


Template.ShoppingList.onCreated(function() {
  this.autorun(() => this.subscribe('recipes'));
});

Template.ShoppingList.helpers({
  shoppingList() {
    return Recipes.find({ inMenu: true }, { fields: { ingredients: 1 } });
  }
});


