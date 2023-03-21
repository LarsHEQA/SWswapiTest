Feature: Search character

    I want to search for characters using different approaches

    Background:
        Given i visit the website

    # This scenario searches for the different characters that are stated in the examples.
    # The names are matched to the different fixture files. These files contain all the relevant data thats being displayed.
    # The displayed data is compared to the fixture data. There is also a check on the amount of displayed characters vs the returned api results.
    Scenario: search for a character and compare using fixtures
        When i search for people, <name>
        Then the character details for <name> are correct

        Examples:
            | name             |
            | Anakin Skywalker |
            | Darth Vader      |
            | Luke Skywalker   |

    # This scenario searches for a character and then compares the displayed values against the API response.
    Scenario: search for a single character and compare to api response
        When i search for people, <name>
        Then the character details for <name> are the same as the api response

        Examples:
            | name                  |
            | Yoda                  |
            | Jabba Desilijic Tiure |
            | Bib Fortuna           |

    # In this scenario the api call will be intercepted and a set of fixture data is returned.
    # By doing this a non existing character is displayed. The details are also verified.
    Scenario: search for a stub character
        When i search for a stubbed character
        Then the details for stubbed character Lars Heidebrink are correct

    # A non existing character is searched for and the not found message is being verified.
    Scenario: character not found
        When i search for people, not found
        Then there will be no results

    # A search will be coducted with wathever string is in the examples.
    # The shown names are checked if they contain the actual search value.
    # The amount of results from the api call will be compared against the displayed results.
    Scenario: search for characters using a random string
        When i search for people, <name>
        Then the results for <name> contain all matching characters

        Examples:
            | name      |
            | a         |
            | Skywalker |

    # In this scenario there will be searched for characters containing oo.
    # There will be checked if the displayed names contain oo and if the returned API results equal the displayed results. For characters there will be 1 result.
    # Without changing the input the radio for planets will be clicked and the search button pressed.
    # THe result should be 'not found' and is verified.
    Scenario: Search for character and switch with same input to planet
        When i search for people, Ben
        Then the results for Ben contain all matching characters
        When i switch to searching planets
        Then there will be no results

    # In this scenario there will be a search for a character, but this enter is pressed in the search field instead of clicking the search button.
    Scenario: search for a character by pressing enter instead of clicking
        When i search by pressing enter for people, Dooku
        Then the results for Dooku contain all matching characters