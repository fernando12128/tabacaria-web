const VIA_CEP_URL = "https://viacep.com.br/ws";

export function onlyDigits(value = "") {
  return value.replace(/\D/g, "");
}

export function formatCep(value = "") {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
}

export function formatPhone(value = "") {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export async function findAddressByCep(cep, signal) {
  const digits = onlyDigits(cep);

  if (digits.length !== 8) {
    throw new Error("Digite os 8 números do CEP.");
  }

  const response = await fetch(`${VIA_CEP_URL}/${digits}/json/`, { signal });

  if (!response.ok) {
    throw new Error("Não foi possível consultar o CEP agora.");
  }

  const address = await response.json();

  if (address.erro) {
    throw new Error("CEP não encontrado. Confira os números digitados.");
  }

  return {
    cep: formatCep(address.cep),
    street: address.logradouro ?? "",
    neighborhood: address.bairro ?? "",
    city: address.localidade ?? "",
    state: address.uf ?? "",
  };
}
