import SearchActions from "../actions/SearchActions"
import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor/lib/methods";

// The glue steps that glue the commonly used steps to the feature file test cases. These are meant to be used in different feature files.

const searchAct = new SearchActions();

Given('i visit the website',() => {
    cy.visit("/")
    searchAct.verifyHeaderVisible();
});