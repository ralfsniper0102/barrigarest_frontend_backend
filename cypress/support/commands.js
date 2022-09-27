// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from '../support/locators'; // Importa o arquivo de locators

Cypress.Commands.add('tostMessage', (msg) => { 
    cy.get(loc.TOAST.MSG).should('contain', msg);
})

Cypress.Commands.add('login', (email, password) => {
    cy.get(loc.LOGIN.USER).type(email);
    cy.get(loc.LOGIN.PASSWORD).type(password);
    cy.get(loc.LOGIN.BTN_ENTRAR).click();
    cy.tostMessage('Bem vindo');
    
});

Cypress.Commands.add('criarTaxa', (nome) => {
    cy.acessarMenuConta();

    cy.get(loc.CRIAR_CONTA.NOME).type('Conta Teste');
    cy.get(loc.CRIAR_CONTA.BTN_CRIAR_CONTA).click();
    cy.tostMessage('Conta inserida com sucesso');

});

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.OPEN_MENU).click();
    cy.get('[href="/contas"]').click();
});

Cypress.Commands.add('criarConta', (nome) => {
    cy.get(loc.CRIAR_CONTA.OPEN_MENU_CRIAR_CONTA).click();

    cy.get(loc.CRIAR_CONTA.LINK_CRIAR_CONTA).click();

    cy.get(loc.CRIAR_CONTA.NOME).type(nome);
    cy.get(loc.CRIAR_CONTA.BTN_CRIAR_CONTA).click({ force: true });
    //cy.get(loc.CRIAR_CONTA.MESSAGE).should('exist');
});

Cypress.Commands.add('resetar', () => {
    cy.get(loc.MENU.OPEN_MENU).click();
    cy.get(loc.MENU.RESETAR).click();

});

Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({ ///login
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: passwd
        }
    }).its('body.token').should('not.be.empty') //verifica se o token não está vazio
        .then(token => {  ///salva o token
            return token;
        });
});

Cypress.Commands.add('resetRest', () => {
    cy.getToken('ralfsniper0102@gmail.com', '123456').then(token => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization: `JWT ${token}` }
        })

    })

});