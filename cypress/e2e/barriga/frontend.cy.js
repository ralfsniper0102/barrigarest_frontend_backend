/// <reference types="cypress" />

const xpath = require('cypress-xpath');

import loc from '../../support/locators';
import '../../support/commands';

describe('Frontend', () => {
    after(() => {
        

        cy.clearLocalStorage();
    });

    
    before(() => {
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

        cy.login('ralfsniper0102@gmail.com', '123456');

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
        
        

        

        cy.intercept('GET', '**/contas', (req) => {
            req.reply({
                statusCode: 401,
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
        }).as('contasAtualizada')

        

        cy.intercept('PUT', '**/contas/**', (req) => {
            req.reply({
                statusCode: 200,
                body: { "id": 1421404, "nome": "Conta atualizada", "visivel": true, "usuario_id": 31018 }
            })
        }).as('contaAtualizada')

        cy.intercept('POST', '**/contas', (req) => {
            req.reply({
                statusCode: 400,
                body: { "error": "Já existe uma conta com esse nome!" }
            })
        }).as('contaDuplicada')
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

        cy.criarTaxa('Conta Teste');

        cy.intercept('POST', '**/contas', (req) => {
            req.reply({
                statusCode: 201,
                body: { "id": 1421405, "nome": "Conta inserida com sucesso", "visivel": true, "usuario_id": 31018 }
            })
        }).as('novaConta')

    })

    it('atualizar conta', () => {
        cy.acessarMenuConta();
        cy.atualizarConta('Conta atualizada');

    })

    it('criar conta repetida', () => {
        cy.duplicarTaxa('Conta atualizada');

    })


})