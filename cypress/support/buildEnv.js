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
      body: [
        {
          conta_id: 1421400,
          conta: "Conta para movimentacoes",
          saldo: "-100000500.00",
        },
        {
          conta_id: 142100,
          conta: "Conta para movimentacoes1",
          saldo: "100000500.00",
        },
      ],
    });
  }).as("saldo")

}

const contas = () => {
  cy.intercept("GET", "**/contas", (req) => {
    req.reply({
      statusCode: 200,
      body: [
        { id: 1421398, nome: "Conta para", visivel: true, usuario_id: 31018 },
        {
          id: 1421399,
          nome: "Conta mesmo nome",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421400,
          nome: "Conta para movimentacoes",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421401,
          nome: "Conta com movimentacao",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421402,
          nome: "Conta para saldo",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421403,
          nome: "Conta para extrato",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421404,
          nome: "Conta atualizada",
          visivel: true,
          usuario_id: 31018,
        },
      ],
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
      body: [
        { id: 1421398, nome: "Conta para", visivel: true, usuario_id: 31018 },
        {
          id: 1421399,
          nome: "Conta mesmo nome",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421400,
          nome: "Conta para movimentacoes",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421401,
          nome: "Conta com movimentacao",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421402,
          nome: "Conta para saldo",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421403,
          nome: "Conta para extrato",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421404,
          nome: "Conta atualizada",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421405,
          nome: "Conta teste",
          visivel: true,
          usuario_id: 31018,
        },
      ],
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
      body: [
        { id: 1421398, nome: "Conta para", visivel: true, usuario_id: 31018 },
        {
          id: 1421399,
          nome: "Conta mesmo nome",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421400,
          nome: "Conta para movimentacoes",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421401,
          nome: "Conta com movimentacao",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421402,
          nome: "Conta para saldo",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421403,
          nome: "Conta para extrato",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421404,
          nome: "Conta atualizada1",
          visivel: true,
          usuario_id: 31018,
        },
        {
          id: 1421405,
          nome: "Conta teste",
          visivel: true,
          usuario_id: 31018,
        },
      ],
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