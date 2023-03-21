export default class CharacterRepository{

    // The class that contains the dom elements regarding the character fields

    getCharacterName(){
        return cy.getBySel('characterNameText');
    }

    getCharacterGender(){
        return cy.getBySel('characterGenderText');
    }

    getCharacterBirthYear(){
        return cy.getBySel('characterBirthYearText');
    }

    getCharacterEyeColor(){
        return cy.getBySel('characterEyeColorText');
    }

    getCharacterSkinColor(){
        return cy.getBySel('characterSkinColorText');
    }

}