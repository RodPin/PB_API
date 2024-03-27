const { Pessoa } = require("../models/init-models");
const { BadRequestError, NotFoundError } = require("../utils/errors/Errors");
const { cpf } = require("cpf-cnpj-validator");
const { cnpj } = require("cpf-cnpj-validator");

const read = async () => {
  const pessoas = await Pessoa.findAll({
    attributes: ["idPessoa", "cpfCnpjPessoa", "nomePessoa"],
  });
  return pessoas;
};

const readOne = async (idPessoa) => {
  const pessoa = await Pessoa.findOne({
    where: {
      idPessoa,
    },
  });

  if (!pessoa) throw new NotFoundError("Pessoa nao encontrada");

  return pessoa;
};

const readOneCpfCnpj = async (cpfCnpjPessoa) => {
  let pessoaExistente = await pvFindPessoaByCpfCnpj(cpfCnpjPessoa);

  if (!pessoaExistente) throw new NotFoundError("Pessoa nao encontrada");

  return pessoaExistente;
}

const create = async (pessoa) => {
  let pessoaExistente = await pvFindPessoaByCpfCnpj(pessoa.cpfCnpjPessoa);
  // Verifica se pessoa pesquisada ja existe
  if (pessoaExistente) throw new BadRequestError("Pessoa ja cadastrada");

  //Cria a pessoa com o enviado no body da request
  const novaPessoa = await Pessoa.create(pessoa);

  return novaPessoa;
};

const pessoaService = {
  read,
  readOne,
  readOneCpfCnpj,
  create,
};

const pvFindPessoaByCpfCnpj = async (cpfCnpjPessoa) => {
  //Verifica se CPF ou CNPJ sao validos
  // Instalei 13/02/22 npm i cpf-cnpj-validator -S  https://www.npmjs.com/package/cpf-cnpj-validator

  let cpf11Digitos = false;
  let cnpj14Digitos = false;
  let cpfCnpjValido = false;

  // Verifica se tamanho igual a 11 = CPF
  if (cpfCnpjPessoa.length == 11) {
    console.log("Eh CPF e com tamanho correto!");
    cpf11Digitos = true;
    cpfCnpjValido = cpf.isValid(cpfCnpjPessoa);
  }

  // Verifica se tamanho igual a 14 = CNPJ
  if (cpfCnpjPessoa.length == 14) {
    console.log("Eh CNPJ e com tamanho correto!");
    cnpj14Digitos = true;
    cpfCnpjValido = cnpj.isValid(cpfCnpjPessoa);
  }

  // Verifica se tamanho igual a 11 ou 14
  if (cpf11Digitos == false && cnpj14Digitos == false)
    throw new BadRequestError(
      "CPF deve conter 11 digitos ou o CNPJ deve conter 14 digitos"
    );

  // Verfica se CPF ou CNPJ eh valido
  if (cpfCnpjValido == false) throw new BadRequestError("CPF ou CNPJ invalido");

  const pessoa = await Pessoa.findOne({
    where: {
      cpfCnpjPessoa: cpfCnpjPessoa,
    },
  });

  return pessoa;
}

module.exports = pessoaService;
