import CharacterRepository from "../repositories/CharacterRepository";
import BaseActions from "./BaseActions";

const characterRepo = new CharacterRepository();

export default class CharacterActions extends BaseActions {

    // This functions bundles all the character field checks and equals them against the data that is registered in the fixture profiles.
    verifyCharacterDataFromFixture(name) {
        cy.fixture("characters/" + this.removeWhiteSpace(name)).then((data) => {
            this.verifyCharacterName(data.name);
            this.verifyCharacterSkin(data.skin_color);
            this.verifyCharacterBirth(data.birth_year);
            this.verifyCharacterEye(data.eye_color);
            this.verifyCharacterGender(data.gender);
        })
    }

    // This functions bundles all the character field checks and equals them against the data that is retrieved from the API response
    verifyCharacterDataFromApiResponse(query) {
        cy.getApiResponseArray('people', query, 'name').then((name) => {
          this.verifyCharacterName(name);
          return cy.getApiResponseArray('people', query, 'skin_color');
        }).then((skin) => {
          this.verifyCharacterSkin(` ${skin} `);
          return cy.getApiResponseArray('people', query, 'birth_year');
        }).then((birth) => {
          this.verifyCharacterBirth(` ${birth} `);
          return cy.getApiResponseArray('people', query, 'gender');
        }).then((gender) => {
          this.verifyCharacterGender(` ${gender} `);
          return cy.getApiResponseArray('people', query, 'eye_color');
        }).then((eye) => {
          this.verifyCharacterEye(` ${eye} `);
        });
        return this;
      }

    // A check if the character name equals the parameter value
    verifyCharacterName(name) {
        characterRepo.getCharacterName().should('text', name);
        return this;
    }

    // A check if the character gender equals the parameter value
    verifyCharacterGender(gender) {
        characterRepo.getCharacterGender().should('text', gender);
        return this;
    }

    // A check if the character birth year equals the parameter value
    verifyCharacterBirth(birth) {
        characterRepo.getCharacterBirthYear().should('text', birth);
        return this;
    }

    // A check if the character eye color equals the parameter value
    verifyCharacterEye(eye) {
        characterRepo.getCharacterEyeColor().should('text', eye);
        return this;
    }

    // A check if the character skin color equals the parameter value
    verifyCharacterSkin(skin) {
        characterRepo.getCharacterSkinColor().should('text', skin);
        return this;
    }

    // A check if the total displayed character(names) equals the parameter value
    verifyTotalCharacters(expected) {
        cy.countElements('[data-testid="characterNameText"]');
        cy.get('@elementCount').should('eq', +expected);
    }

    // A check if the the count field from the api response equals the amount of displayed characters
    verifyTotalCharactersEqualApiResponse(query) {
        cy.getApiResponseValue('people', query, 'count')
        cy.get('@value').then((value) => {
            this.verifyTotalCharacters(value);
        })
        return this;
    }

    // A check if every displayed character name value contains the search value
    verifyCharacterNamesContainValue(value) {
        cy.getApiResponseValue('people', value, 'count')
        cy.get('@value').then((amount) => {
            if (amount >= 0) {
                cy.verifyTextValues('[data-testid="characterNameText"]', value);
            } else {
                cy.log('The string you selected does not have any result, so there cant be a validation')
            }
        })
        return this;
    }



}