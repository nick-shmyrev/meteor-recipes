import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Recipes } from '../../../api/Recipes-API';

import './RecipeDetailsPage.html';


Template.RecipeDetailsPage.onCreated(function() {
  const id = FlowRouter.getParam('id');
  this.autorun(() => this.subscribe('singleRecipe', id));
});

Template.RecipeDetailsPage.helpers({
  recipe() {
    const _id = FlowRouter.getParam('id');
    return Recipes.findOne({ _id });
  }
});
