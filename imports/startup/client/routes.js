import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import layouts
import '../../ui/layouts/MainLayout';
import '../../ui/layouts/LandingLayout';

// Import pages
import '../../ui/pages/Recipes/RecipesPage';
import '../../ui/pages/RecipeDetails/RecipeDetailsPage';
import '../../ui/pages/Menu/MenuPage';
import '../../ui/pages/ShoppingList/ShoppingList';


// Redirects on login/logout
Accounts.onLogin(function() {
  FlowRouter.go('recipes');
});
Accounts.onLogout(function() {
  FlowRouter.go('home');
});

FlowRouter.triggers.enter([
  // Middleware to redirect to home if not authorized
  function redirectUnauthorized() {
    if (!Meteor.userId()) FlowRouter.go('home');
  },
]);

FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [() => {
    /*  Set timeout to wait for user to complete logout procedure
    *   before checking if they're logged in */
    setTimeout(() => {
      if (Meteor.userId()) FlowRouter.go('recipes');
    });
  }],
  action() {
    BlazeLayout.render('LandingLayout');
  }
});

FlowRouter.route('/recipes', {
  name: 'recipes',
  action() {
    BlazeLayout.render('MainLayout', { main: 'RecipesPage' });
  }
});

FlowRouter.route('/recipes/:id', {
  name: 'recipe-item',
  action() {
    BlazeLayout.render('MainLayout', { main: 'RecipeDetailsPage' });
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    BlazeLayout.render('MainLayout', { main: 'MenuPage' });
  }
});

FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action() {
    BlazeLayout.render('MainLayout', { main: 'ShoppingList' });
  }
});

// Catch-all for unknown routes
FlowRouter.notFound = {
  action() {
    FlowRouter.go('home');
  }
};

