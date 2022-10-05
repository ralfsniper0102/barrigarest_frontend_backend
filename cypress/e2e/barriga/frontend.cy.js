/// <reference types="cypress" />

const xpath = require('cypress-xpath');

import loc from '../../support/locators';
import '../../support/commands';

describe('Frontend', () => {
    after(() => {


        cy.clearLocalStorage();
    });


    before(() => {


        cy.login('ralfsniper0102@gmail.com', '123456');

        cy.intercept('POST', '**/signin', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    id: 1000,
                    nome: 'Usuario falso',
                    token: 'Uma string muito grande que nao deveria ser aceita mas na verdade, vai'
                }
            })
        }).as('signin')

        cy.intercept('GET', '**/saldo', (req) => {
            req.reply({
                statusCode: 200,
                body: [
                    {
                        conta_id: 1421400, conta: "Conta para movimentacoes", saldo: "-100000500.00"
                    },
                    {
                        conta_id: 142100, conta: "Conta para movimentacoes1", saldo: "100000500.00"
                    }
                ]
            })
        }).as('saldo')


    })

    beforeEach(() => {



    });

    it('criar conta', () => {
        //cy.resetar();


        cy.intercept('GET', '**/contas', (req) => {
            req.reply({
                statusCode: 200,
                body:
                    [
                        { id: 1421398, nome: "Conta para", visivel: true, usuario_id: 31018 },
                        { id: 1421399, nome: "Conta mesmo nome", visivel: true, usuario_id: 31018 },
                        { id: 1421400, nome: "Conta para movimentacoes", visivel: true, usuario_id: 31018 },
                        { id: 1421401, nome: "Conta com movimentacao", visivel: true, usuario_id: 31018 },
                        { id: 1421402, nome: "Conta para saldo", visivel: true, usuario_id: 31018 },
                        { id: 1421403, nome: "Conta para extrato", visivel: true, usuario_id: 31018 },
                        { id: 1421404, nome: "Conta atualizada", visivel: true, usuario_id: 31018 }
                    ]
            })
        }).as('contas')

        cy.intercept('POST', '**/contas', (req) => {
            req.reply({
                statusCode: 201,
                body: { "id": 1421405, "nome": "Conta Teste", "visivel": true, "usuario_id": 31018 }
            })
        }).as('novaConta')



        cy.get(loc.CRIAR_CONTA.OPEN_MENU_CRIAR_CONTA).click();

        cy.get(loc.CRIAR_CONTA.LINK_CONTAS).click();

        cy.get(loc.CRIAR_CONTA.NOME).type('Conta Teste');
        cy.get(loc.CRIAR_CONTA.BTN_CRIAR_CONTA).click({ force: true });


        //cy.criarTaxa('Conta Teste');


        cy.intercept('GET', '**/contas', (req) => {
            req.reply({
                statusCode: 200,
                body:
                    [
                        { id: 1421398, nome: "Conta para", visivel: true, usuario_id: 31018 },
                        { id: 1421399, nome: "Conta mesmo nome", visivel: true, usuario_id: 31018 },
                        { id: 1421400, nome: "Conta para movimentacoes", visivel: true, usuario_id: 31018 },
                        { id: 1421401, nome: "Conta com movimentacao", visivel: true, usuario_id: 31018 },
                        { id: 1421402, nome: "Conta para saldo", visivel: true, usuario_id: 31018 },
                        { id: 1421403, nome: "Conta para extrato", visivel: true, usuario_id: 31018 },
                        { id: 1421404, nome: "Conta atualizada", visivel: true, usuario_id: 31018 },
                        { id: 1421405, nome: "Conta teste", visivel: true, usuario_id: 31018 }
                    ]
            })
        }).as('contaInserida')







    })

    it('atualizar conta', () => {
        //cy.acessarMenuConta();
        //cy.atualizarConta('Conta atualizada1');
        
        cy.get(loc.ATUALIZAR_CONTA.BTN_ATUALIZAR).click({ force: true });
        //cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .far').click({ force: true });
        cy.get(loc.ATUALIZAR_CONTA.CAMPO_TEXTO).clear().type('Conta atualizada1');
        cy.get(loc.ATUALIZAR_CONTA.BTN_CONFIRMAR_ATUALIZACAO).click({ force: true });
        //cy.tostMessage('Conta atualizada com sucesso!');

        cy.intercept('PUT', 'https://barrigarest.wcaquino.me/contas/1429033/**', (req) => {
            req.reply({
                statusCode: 200,
                body: { nome: "Conta atualizada1" }
            })
        }).as('contaAtualizada')

    })

    it.skip('criar conta repetida', () => {
        cy.duplicarTaxa('Conta atualizada');

        cy.intercept('POST', '**/contas', (req) => {
            req.reply({
                statusCode: 400,
                body: { "error": "Já existe uma conta com esse nome!" }
            })
        }).as('contaDuplicada')
    })


})