let apiUrl = "http://localhost:4003/pessoa";
let axios = require("axios");
let api;
const { generateRandomString } = require("./Loja.test");
let gerarCNPJ = require('./utils/gerarCnpj')

describe("Pessoa Tests", () => {
  step("Login ADMIN - Correto", async () => {
    const { assert } = await import("chai");

    let login = "admin@admin.com";
    let senha = "adminsenha";

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

  step("Criar Pessoa - CNPJ invalido", async () => {
    const { assert } = await import("chai");

    try {
      let pessoa = {
        cpfCnpjPessoa: "143124314",
        nomePessoa: "CRISTOVAO COLOMBO",
      };
      let resposta = await api.post("/", pessoa);
    } catch (e) {
      assert.isTrue(e.response.data.message.includes("conter 11 digito"));
      assert.equal(e.response.data.status, 400);
    }
    try {
      let pessoa = {
        cpfCnpjPessoa: "12345678910",
        nomePessoa: "CRISTOVAO COLOMBO",
      };
      let resposta = await api.post("/", pessoa);
    } catch (e) {
      assert.isTrue(e.response.data.message.includes("CNPJ invalido"));
      assert.equal(e.response.data.status, 400);
    }
  });

  step("Criar Pessoa - Valida", async () => {
    const  cnpjGerador  = gerarCNPJ();

      const { assert } = await import("chai");
    let pessoa = {
      cpfCnpjPessoa: cnpjGerador,
      nomePessoa: `CRISTOVAO ${generateRandomString(5)}`,
    };

    let resposta = await api.post("/", pessoa);
    assert.equal(resposta.status, 200);
  });
  step("Listar Pessoas ", async () => {
    const { assert } = await import("chai");

        let resposta = await api.get("/");

        assert.equal(resposta.status, 200);
        assert.isAbove(resposta.data.length,0);
  });
});
