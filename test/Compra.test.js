let apiUrl = "http://localhost:4003/compra";
let axios = require("axios");
let api;
let { generateRandomString } = require("./Loja.test");
let gerarCNPJ = require('./utils/gerarCnpj')
let idPessoa, idVeiculo;
describe("Compra Tests", () => {
  step("Login SOCIO - Correto", async () => {
    const { assert } = await import("chai");

    let login = "socio@gmail.com";
    let senha = "123123";

    let resposta = await axios.post("http://localhost:4003/auth/login", { login, senha });
    assert.equal(resposta.status, 200);
    assert.exists(resposta.data.token);

    api = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resposta.data.token}`,
      },
    });
  });

  step("Criar Veiculo - Valida", async () => {
    const { assert } = await import("chai");
    let veiculo = {
      modeloVeiculo: "T",
      marcaVeiculo: "T",
      portasVeiculo: "T",
      corVeiculo: "T",
      placaVeiculo: "T",
      chassiVeiculo: "T",
      renavamVeiculo: "T",
      tipoVeiculo: "F",
    };

    let resposta = await api.post("http://localhost:4003/veiculo", veiculo);
    assert.equal(resposta.status, 200);
    idVeiculo = resposta.data.idVeiculo;
  });

  step("Criar Pessoa - Valida", async () => {
    const  cnpjGerador  = gerarCNPJ();

    const { assert } = await import("chai");
    let pessoa = {
      cpfCnpjPessoa: cnpjGerador,
      nomePessoa: `CRISTOVAO ${generateRandomString(5)}`,
    };

    let resposta = await api.post("http://localhost:4003/pessoa", pessoa);
    assert.equal(resposta.status, 200);
    idPessoa = resposta.data.idPessoa;
  });

  step("Criar Compra - Invalida", async () => {
    const { assert } = await import("chai");
    let compra = {
      idPessoa: 100000,
      idVeiculo: 100000,
      valor: 'valor errado',
    };
    try {
        let resposta = await api.post("/", compra);
    } catch (e) {
        assert.equal(e.response.data.status, 400);
        assert.isTrue(e.response.data.message.includes("Valor da compra invalido, deve ser um numero"));
    }
    try {
        compra.valor=1000
        let resposta = await api.post("/", compra);
    } catch (e) {
      assert.equal(e.response.data.status, 404);
      assert.isTrue(e.response.data.message.includes("Pessoa nao encon"));
    }

    try {
        compra.idPessoa = idPessoa
        let resposta = await api.post("/", compra);
      } catch (e) {
        assert.equal(e.response.data.status, 404);
        assert.isTrue(e.response.data.message.includes("Veiculo nao encon"));
      }

      try {
        compra.idVeiculo = idVeiculo
        let resposta = await api.post("/", compra);
      } catch (e) {
        assert.equal(e.response.data.status, 400);
        assert.isTrue(e.response.data.message.includes("Valor da compra invalido, deve ser um numero"));
      }
  });
  step("Criar Compra - Valida", async () => {
    const { assert } = await import("chai");
    let compra = {
      idPessoa,
      idVeiculo,
      valor: 111,
    };
    

    try {
        let resposta = await api.post("/", compra);
      } catch (e) {
        assert.equal(e.response.data.status, 404);
        assert.isTrue(e.response.data.message.includes("Veiculo nao encon"));
      }

        let resposta = await api.post("/", compra);
        assert.equal(resposta.status, 200);
  });
  
  step("Listar Compras ", async () => {
    const { assert } = await import("chai");

        let resposta = await api.get("/");

        assert.equal(resposta.status, 200);
        assert.isAbove(resposta.data.length,0);
  });
});

