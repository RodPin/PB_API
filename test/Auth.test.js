const { apiUrl } = require("./config");

let baseUrl = `${apiUrl}/auth`;
let axios = require("axios");

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

describe("Auth Tests", () => {
  it("Login - Email Incorreto ", async () => {
    const { assert } = await import("chai");

    let login = "oaksdfo@asdf.com";
    let senha = "asdf";

    try {
      let resposta = await api.post("/login", { login, senha });
      console.log("resposta", resposta);
    } catch (e) {
      assert.isTrue(e.response.data.message.includes("nao encontrado"));
      assert.equal(e.response.data.status, 404);
    }
  });

  it("Login - Senha Incorreta ", async () => {
    const { assert } = await import("chai");

    let login = "admin@admin.com";
    let senha = "asdf";

    try {
      let resposta = await api.post("/login", { login, senha });
      console.log("resposta", resposta);
    } catch (e) {
      assert.isTrue(e.response.data.message.includes("Senha invalida"));
      assert.equal(e.response.data.status, 400);
    }
  });

  it("Login - Correto ", async () => {
    const { assert } = await import("chai");

    let login = "admin@admin.com";
    let senha = "adminsenha";

    let resposta = await api.post("/login", { login, senha });
    assert.equal(resposta.status, 200);
    assert.exists(resposta.data.token);
  });
});
