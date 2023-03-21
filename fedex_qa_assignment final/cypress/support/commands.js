// This command reduces the effor tit takes to write down an selector. This can only be used if the data-testid standard is being used
Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-testid="${selector}"]`)
})

// This command counts all the elements with a particular selector
Cypress.Commands.add('countElements', (id) => {
  cy.get(`${id}`).its('length').then((count) => {
    cy.wrap(count).as('elementCount')
  })
})

// This command retrieves the api response and can get a single field value based on the field parameter that is being passed
Cypress.Commands.add('getApiResponseValue', (category, query, fieldName) => {
  cy.request(`https://swapi.dev/api/${category}/?search=${query}`)
    .its(`body.${fieldName}`)
    .then((value) => {
      cy.wrap(value).as('value')
    })
})

Cypress.Commands.add('getApiResponseArray', (category, query, fieldName) => {
  cy.request(`https://swapi.dev/api/${category}/?search=${query}`)
    .then((response) => {
      if (response.body.count === 0) {
        throw new Error(`No results found for query: ${query}`);
      } else {
        const firstResult = response.body.results[0];
        const fieldValue = firstResult[fieldName];
        if (Array.isArray(fieldValue)) {
          return fieldValue[0];
        } else {
          return fieldValue;
        }
      }
    })
    .then((value) => {
      cy.wrap(value).as('value');
    });
});



// This command gets the text of all elements with the passed selectors and then iterates through them to see if the text contains the passed value
Cypress.Commands.add('verifyTextValues', (selector, value) => {
  cy.get(selector).then(($elements) => {
    const innerHTMLArray = [];
    $elements.each((index, element) => {
      innerHTMLArray.push(Cypress.$(element).html().trim());
    });
    innerHTMLArray.forEach((innerHTML) => {
      expect(innerHTML).to.include(value);
    });
  });
});