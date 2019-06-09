import { Template } from 'meteor/templating';

import { Recipes } from '../../../api/Recipes-API';

import './MenuPage.html';


Template.MenuPage.onCreated(function() {
  this.autorun(() => this.subscribe('recipes'));
});

Template.MenuPage.helpers({
  recipes() {
    return Recipes.find({ inMenu: true });
  }
});

