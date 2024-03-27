function gerarCNPJ() {
    const n = 9;
    const n1 = Math.floor(Math.random() * n) + 1;
    const n2 = Math.floor(Math.random() * n);
    const n3 = Math.floor(Math.random() * n);
    const n4 = Math.floor(Math.random() * n);
    const n5 = Math.floor(Math.random() * n);
    const n6 = Math.floor(Math.random() * n);
    const n7 = Math.floor(Math.random() * n);
    const n8 = Math.floor(Math.random() * n);
    const n9 = 0; // O nono dígito é sempre 0 para CNPJ
    const n10 = 0; // O décimo dígito é sempre 0 para CNPJ
    const n11 = 0; // O décimo primeiro dígito é sempre 0 para CNPJ
    const n12 = 1; // O décimo segundo dígito é sempre 1 para CNPJ
  
    const d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    const d1Resto = d1 % 11;
    const dv1 = d1Resto < 2 ? 0 : 11 - d1Resto;
  
    const d2 = dv1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    const d2Resto = d2 % 11;
    const dv2 = d2Resto < 2 ? 0 : 11 - d2Resto;
  
    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${dv1}${dv2}`;
  }
  
  
  module.exports = gerarCNPJ;
  