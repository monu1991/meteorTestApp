import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Comments } from '../imports/api/comment.js';
if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
           Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
        }
    });
}

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
       var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});
Template.dashboard.events({
    'submit form': function(event) {
        event.preventDefault();
      
    // Get value from form element    
     var user_comment = event.target.comment.value;
     var email_com=Meteor.user().emails[0].address;
    // Insert a task into the collection
    Comments.insert({
    	com_user:email_com,
      comment:user_comment,
      createdAt: new Date() // current time
    });
 
    // Clear form
    event.target.comment.value = '';
  
    }
});
Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});


Template.comments.helpers({
  firstName: function() {
    return Comments.find({}, { sort: { createdAt: -1 } });
  }
});