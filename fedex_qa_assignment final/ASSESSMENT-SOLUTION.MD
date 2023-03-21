START
Start by installing the packages by typing 'npm install' 
Boot up the application by going into src/app and type 'npm install'
Go to the root directory and type 'npx cypress open' to open cypress

FOLDER STRUCTURE
In the cypress/integration folder there will be 2 feature files. One for testing the planets and one for testing the characters. 
The feature files are meant to make it easier to understand and also pass on different values that are being used by the same test.
Each feature file navigates to the support/step_definitions folder for the glue code. The step files are dedicated to their respective counter parts. 
In the step defs, a reference is created to an action file. This is where functions are created using new code or chaining different cypress comands.
The cypress commands are derived from two different sources. Either the linked repositorty or the custom cypress commands. 
The repositories consist of only commands that retrieve a DOM object.
The custom commands are meant to be used in various locations and can be found in support/commands.js.
The folder cypress/fixtures contains datasets of different characters/planets that are being used to verify the different values.

I've tried to comment on each function to explain what the use is.

CHANGES TO THE SRC CODE
The only changes that are implemented regard the identifiers for the different page elements that are being used in the tests. Each element that is being used in a test has a 'data-testid' label.

BUGS
One test will fail consistently. This happens because there is something wrong in the application. The test 'search for characters using a random string' in integration/Character.feature (or the planet variant) does the following things:
- fill in value specified in feature file
- check if all name elements on the page contain the actual search value
- check if the amount of displayed results equal the results given by the api noted in the count field
When searching for 'a' the api responds with 58 results. The web page will only show 10.
The api response can only contain 10 items per page. It will then ask you to go to the next page to see the following results. There is no option to go to a next page on the web page, so the webpage should display all the results when executing the query. This is a bug. The other example 'Skywalker' for the same the test will pass, since the api will respond with 3 results and the page shows 3 results that each include Skywalker.

Another thing that could be noted as a bug is that an empty field search would not result in a clean display. The previous result stay.
 
MINOR INCONVENIENCES
When comparing the planet and character details the details beside name have a whitespace in front and after the string. like ' male '
I covered this with a quick fix so that the value im comparing isnt 'male' but ' male '.