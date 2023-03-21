import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor/lib/methods";
import SearchActions from "../actions/SearchActions";

// The glue steps that glue the search action steps to the feature file test cases. Here you will see data being passed by the feature files that will be used in the action functions.

const searchAct = new SearchActions();

When(/^i search for ([^"]*), ([^"]*)$/, (category, name) => {
    searchAct.getResponseUrl(category, name)
        .searchCategory(category, name)
        .verifyResponseUrl(category);
})

When("i search for a stubbed character", () => {
    searchAct.stubResponseUrl("people", "Lars Heidebrink")
        .searchCategory("people", "Lars Heidebrink")
        .verifyResponseUrl("people");
})

Then("there will be no results", () => {
    searchAct.verifyNotFoundVisible();
})

When(/^i switch to searching ([^"]*)$/, (category) => {
    searchAct.clickCategoryRadio(category)
            .clickSearchSubmit();
})

When(/^i search by pressing enter for ([^"]*), ([^"]*)$/, (category, name) => {
    searchAct.getResponseUrl(category, name)
        .enterCategory(category, name)
        .verifyResponseUrl(category);
})