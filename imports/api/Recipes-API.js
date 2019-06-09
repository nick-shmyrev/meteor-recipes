import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Recipes = new Mongo.Collection('recipes');
export const IngredientsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  amount: {
    type: String,
    label: 'Amount'
  }
});
export const RecipesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  description: {
    type: String,
    label: 'Description'
  },
  ingredients: {
    type: Array,
  },
  'ingredients.$': {
    label: null,
    type: IngredientsSchema,
  },
  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      afFieldInput: { type: "hidden" },
      afFormGroup: { label: false }
    }
  },
  author: {
    type: String,
    label: 'Author',
    autoValue: function() {
      return this.userId;
    },
    autoform: {
      afFieldInput: { type: "hidden" },
      afFormGroup: { label: false }
    }
  },
  createdAt: {
    type: Date,
    label: 'Created at',
    autoValue: function() {
      return new Date();
    },
    autoform: {
      afFieldInput: { type: "hidden" },
      afFormGroup: { label: false }
    }
  }
});

Recipes.attachSchema(RecipesSchema);

Recipes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isServer) {
  Meteor.publish('recipes', function() {
    return Recipes.find({
      author: this.userId
    });
  });
  Meteor.publish('singleRecipe', function(id) {
    check(id, String);
    
    return Recipes.find({
      author: this.userId,
      _id: id
    });
  });
}


Meteor.methods({
  
  'Recipes.insert'(doc) {
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
    
    Recipes.insert(doc);
  },
  
  'Recipes.update'(update) {
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
    
    const { _id, modifier} = update;
    
    Recipes.update({ _id }, modifier);
  },
  
  'Recipes.toggleInMenu'(_id, inMenu) {
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
    
    Recipes.update({ _id }, { $set: { inMenu } });
  },
  
  'Recipes.remove'(_id) {
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
    
    Recipes.remove({ _id });
  },
});
