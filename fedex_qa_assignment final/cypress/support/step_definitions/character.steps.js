import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor/lib/methods";
import CharacterActions from "../actions/CharacterActions";

// The glue steps that glue the character action steps to the feature file test cases. Here you will see data being passed by the feature files that will be used in the action functions.

const characterAct = new CharacterActions();

Then(/^the character details for ([^"]*) are correct$/, (name) => {
    characterAct.verifyTotalCharactersEqualApiResponse(name)
        .verifyCharacterDataFromFixture(name);
})

Then(/^the details for stubbed character ([^"]*) are correct$/, (name) => {
    characterAct.verifyCharacterDataFromFixture(name);
})

Then(/^the results for ([^"]*) contain all matching characters$/, (name) => {
    characterAct.verifyCharacterNamesContainValue(name)
        .verifyTotalCharactersEqualApiResponse(name);
})

Then(/^the character details for ([^"]*) are the same as the api response$/, (name) => {
    characterAct.verifyTotalCharactersEqualApiResponse(name)
        .verifyCharacterDataFromApiResponse(name);
})