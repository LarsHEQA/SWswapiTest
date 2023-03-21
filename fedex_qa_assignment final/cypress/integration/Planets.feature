Feature: search for planets

    I want to search for planets using different approaches

    Background:
        Given i visit the website

    # This scenario searches for the different planets that are stated in the examples.
    # The names are matched to the different fixture files. These files contain all the relevant data thats being displayed.
    # The displayed data is compared to the fixture data. There is also a check on the amount of displayed planets vs the returned api results.
    Scenario: search for a planet and compare using fixtures
        When i search for planets, <name>
        Then the planet details for <name> are correct

        Examples:
            | name     |
            | Mustafar |
            | Naboo    |
            | Tatooine |

    # This scenario searches for a character and then compares the displayed values against the API response.
    Scenario: search for a single planet and compare to api response
        When i search for planets, <name>
        Then the planet details for <name> are the same as the api response

        Examples:
            | name      |
            | Hoth      |
            | Dagobah   |
            | Coruscant |

    # A non existing planet is searched for and the not found message is being verified.
    Scenario: planet not found
        When i search for planets, not found
        Then there will be no results

    # A search will be coducted with wathever string is in the examples.
    # The shown names are checked if they contain the actual search value.
    # The amount of results from the api call will be compared against the displayed results.
    Scenario: search for planets using a random string
        When i search for planets, <name>
        Then the results for <name> contain all matching planets

        Examples:
            | name |
            | Be   |
            | a    |

    # In this scenario there will be searched for characters containing oo.
    # There will be checked if the displayed names contain oo and if the returned API results equal the displayed results. For characters there will be 1 result.
    # Without changing the input the radio for planets will be clicked and the search button pressed.
    # THe result should be 'not found' and is verified.
    Scenario: Search for planet and switch with same input to people
        When i search for planets, yyy
        Then the results for yyy contain all matching planets
        When i switch to searching people
        Then there will be no results