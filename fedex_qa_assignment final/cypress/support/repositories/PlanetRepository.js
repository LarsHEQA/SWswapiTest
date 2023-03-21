export default class PlanetRepository{

    // The class that contains the dom elements regarding the planet fields  

    getPlanetName(){
        return cy.getBySel('planetNameText');
    }

    getPlanetPopulation(){
        return cy.getBySel('planetPopulationText');
    }

    getPlanetClimate(){
        return cy.getBySel('planetClimateText');
    }

    getPlanetGravity(){
        return cy.getBySel('planetGravityText');
    }

}