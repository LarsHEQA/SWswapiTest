import PlanetRepository from "../repositories/PlanetRepository";
import BaseActions from "./BaseActions";

const planetRepo = new PlanetRepository();

export default class PlanetActions extends BaseActions {


     // This functions bundles all the planet field checks and equals them against the data that is registered in the fixture profiles.
    verifyPlanetDataFromFixture(name) {
        cy.fixture("planets/" + this.removeWhiteSpace(name)).then((data) => {
            this.verifyPlanetName(data.name);
            this.verifyPlanetPopulation(data.population);
            this.verifyPlanetClimate(data.climate);
            this.verifyPlanetGravity(data.gravity);
        })
    }

        // This functions bundles all the character field checks and equals them against the data that is retrieved from the API response
        verifyPlanetDataFromApiResponse(query) {
            cy.getApiResponseArray('planets', query, 'name').then((name) => {
              this.verifyPlanetName(name);
              return cy.getApiResponseArray('planets', query, 'climate');
            }).then((climate) => {
              this.verifyPlanetClimate(` ${climate} `);
              return cy.getApiResponseArray('planets', query, 'gravity');
            }).then((gravity) => {
              this.verifyPlanetGravity(` ${gravity} `);
              return cy.getApiResponseArray('planets', query, 'population');
            }).then((population) => {
              this.verifyPlanetPopulation(` ${population} `);
          });
          return this;
        }

    // A check if the planet name equals the parameter value
    verifyPlanetName(name) {
        planetRepo.getPlanetName().should('text', name);
        return this;
    }

    // A check if the planet population equals the parameter value
    verifyPlanetPopulation(population) {
        planetRepo.getPlanetPopulation().should('text', population);
        return this;
    }

    // A check if the planet climate equals the parameter value
    verifyPlanetClimate(climate) {
        planetRepo.getPlanetClimate().should('text', climate);
        return this;
    }

    // A check if the planet gravity equals the parameter value
    verifyPlanetGravity(gravity) {
        planetRepo.getPlanetGravity().should('text', gravity);
        return this;
    }

    // A check if the total displayed planet(names) equals the parameter value
    verifyTotalPlanets(expected) {
        cy.countElements('[data-testid="planetNameText"]');
        cy.get('@elementCount').should('eq', +expected);
    }

    // A check if the the count field from the api response equals the amount of displayed planets
    verifyTotalPlanetsEqualApiResponse(name) {
        cy.getApiResponseValue('planets', name, 'count')
        cy.get('@value').then((value) => {
            this.verifyTotalPlanets(value);
        })
        return this;
    }

    // A check if every displayed planet name value contains the search value
    verifyPlanetNamesContainValue(value) {
        cy.getApiResponseValue('planets', value, 'count')
        cy.get('@value').then((amount) => {
            if (amount > 0) {
                cy.verifyTextValues('[data-testid="planetNameText"]', value);
            } else { 
                cy.log('The string you selected does not have any result, so there cant be a validation')
            }
        })
        return this;
    }
}