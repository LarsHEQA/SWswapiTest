import SearchRepository from "../repositories/SearchRepository";
import BaseActions from "./BaseActions";

const searchRepo = new SearchRepository();

export default class SearchActions extends BaseActions {

    // This function clicks a radio button based on the category paramter
    // The search term is entered and the submit button pressed
    searchCategory(category, name) {
        this.clickCategoryRadio(category)
            .inputSearchTerm(name)
            .clickSearchSubmit();
        return this;
    }

    // This function clicks a radio button based on the category paramter
    // The search term is entered and the enter button is pressed
    enterCategory(category, name) {
        this.clickCategoryRadio(category)
            .enterSearchTerm(name);
        return this;
    }

    //A function that inputs a value in the searchbar
    inputSearchTerm(term) {
        searchRepo.getSearchBar().type(term);
        return this;
    }

     //A function that inputs a value in the searchbar and presses enter afterwards
     enterSearchTerm(term) {
        searchRepo.getSearchBar().type(term).type('{enter}');
        return this;
    }

    //A function that clicks the submit button
    clickSearchSubmit() {
        searchRepo.getSearchSubmit().click();
        return this;
    }

    //A function that verify if the page header is visible
    verifyHeaderVisible() {
        searchRepo.getSearchHeader().should('be.visible');
        return this;
    }

    //A function that checks if the not found message is visible
    verifyNotFoundVisible() {
        searchRepo.getSearchNotFound().should('be.visible');
        return this;
    }

    //A function that gets the API response
    getResponseUrl(category, name) {
        cy.intercept('/api/' + category + '/?search=' + this.replaceWhiteSpace(name)).as(`${category}-response`);
        return this;
    }

    //A function that replaces the API response with a custom response based on fixture data
    stubResponseUrl(category, name) {
        cy.intercept('GET', 'https://swapi.dev/api/' + category + '/?search=' + this.replaceWhiteSpace(name), { fixture: "characters/stub" }).as(`${category}-response`);
        return this;
    }

    //A function that waits for the status of the response to be 200
    verifyResponseUrl(category) {
        cy.wait(`@${category}-response`).its('response.statusCode').should('eq', 200)
        return this;
    }

    //A function that clicks on a radio based on the category input
    clickCategoryRadio(category) {
        switch (category) {
            case 'people':
                searchRepo.getCharacterRadio().click();
                break;
            case 'planets':
                searchRepo.getPlanetRadio().click();
                break;
            default:
                cy.log('The given category should be either people or planet')
        }
        return this;
    }
}