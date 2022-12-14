import contaAtualizada1Fixtures from "../fixtures/contaAtualizada1.json"
import contaInseridaFixtures from "../fixtures/contaInserida.json"
import contasFixtures from "../fixtures/contas.json"
import saldoFixtures from "../fixtures/saldo.json"

const login = () => {
  cy.intercept("POST", "**/signin", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        id: 1000,
        nome: "Usuario falso",
        token:
          "Uma string muito grande que nao deveria ser aceita mas na verdade, vai",
      },
    });
  }).as("signin");

  cy.intercept("GET", "**/saldo", (req) => {
    req.reply({
      statusCode: 200,
      body:
        saldoFixtures,
    });
  }).as("saldo")
}

const contas = () => {
  cy.intercept("GET", "**/contas", (req) => {
    req.reply({
      statusCode: 200,
      body: contasFixtures,
    });
  }).as("contas");
}

const novaConta = () => {
  cy.intercept("POST", "**/contas", (req) => {
    req.reply({
      statusCode: 201,
      body: {
        id: 1421405,
        nome: "Conta Teste",
        visivel: true,
        usuario_id: 31018,
      },
    });
  }).as("novaConta");
}

const contaInserida = () => {
  cy.intercept("GET", "**/contas", (req) => {
    req.reply({
      statusCode: 200,
      body: contaInseridaFixtures,
    });
  }).as("contaInserida");
}

const contaAtualizada = () => {
  cy.intercept("PUT", "**/contas/1421404", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        nome: "Conta atualizada1",
      },
    });
  }).as("contaAtualizada");
}

const contaAtualizada1 = () => {
  cy.intercept("GET", "**/contas", (req) => {
    req.reply({
      statusCode: 200,
      body: contaAtualizada1Fixtures,
    });
  }).as("contaAtualizada1");
}

const contaDuplicada = () => {
  cy.intercept("POST", "**/contas", (req) => {
    req.reply({
      statusCode: 400,
      body: { error: "Já existe uma conta com esse nome!" },
    });
  }).as("contaDuplicada");
}

module.exports = {
  login,
  contas,
  novaConta,
  contaInserida,
  contaAtualizada,
  contaAtualizada1,
  contaDuplicada
}