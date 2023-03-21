import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor/lib/methods";
import PlanetActions from "../actions/PlanetActions";

// The glue steps that glue the planet action steps to the feature file test cases. Here you will see data being passed by the feature files that will be used in the action functions.

const planetAct = new PlanetActions();

Then(/^the planet details for ([^"]*) are correct$/, (name) => {
    planetAct.verifyTotalPlanetsEqualApiResponse(name)
        .verifyPlanetDataFromFixture(name);
})

Then(/^the results for ([^"]*) contain all matching planets$/, (name) => {
    planetAct.verifyPlanetNamesContainValue(name)
        .verifyTotalPlanetsEqualApiResponse(name);
})

Then(/^the planet details for ([^"]*) are the same as the api response$/, (name) => {
    planetAct.verifyTotalPlanetsEqualApiResponse(name)
        .verifyPlanetDataFromApiResponse(name);
})