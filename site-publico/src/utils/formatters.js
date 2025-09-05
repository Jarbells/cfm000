// src/utils/formatters.js

export const formatDisplayPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return 'Não informado';
  
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  // --- AQUI ESTÁ A CORREÇÃO ---
  // Se o número for muito longo (provavelmente com código de país repetido),
  // pegamos apenas os últimos 11 dígitos (DDD + 9xxxxxxxx para telemóvel)
  // ou 10 dígitos (DDD + xxxx-xxxx para fixo).
  if (digitsOnly.length > 11) {
    // Tenta identificar se é um número fixo (geralmente não começa com 9 após o DDD)
    const potentialMobile = digitsOnly.slice(-11);
    if (potentialMobile.charAt(2) === '9') {
        digitsOnly = potentialMobile;
    } else {
        digitsOnly = digitsOnly.slice(-10);
    }
  }

  // Formata o número já limpo
  if (digitsOnly.length === 11) { // Formato (XX) XXXXX-XXXX
    const ddd = digitsOnly.substring(0, 2);
    const part1 = digitsOnly.substring(2, 7);
    const part2 = digitsOnly.substring(7);
    return `(${ddd}) ${part1}-${part2}`;
  }
  
  if (digitsOnly.length === 10) { // Formato (XX) XXXX-XXXX
    const ddd = digitsOnly.substring(0, 2);
    const part1 = digitsOnly.substring(2, 6);
    const part2 = digitsOnly.substring(6);
    return `(${ddd}) ${part1}-${part2}`;
  }

  return phoneNumber; // Retorna o original se, mesmo após a limpeza, não for um formato válido
};