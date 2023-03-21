export default class SearchRepository{

    // The class that contains the dom elements regarding the search fields

    getSearchHeader(){
        return cy.getBySel('searchHeader');
    }

    getSearchBar(){
        return cy.getBySel('searchbarInput');
    }

    getCharacterRadio(){
        return cy.getBySel('characterRadioButton');
    }

    getPlanetRadio(){
        return cy.getBySel('planetRadioButton');
    }

    getSearchSubmit(){
        return cy.getBySel('searchButton');
    }

    getSearchNotFound(){
        return cy.getBySel('searchNotFound');
    }
}