import { Comments } from "@/app/entities/Comments";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 1
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = (
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1
    );

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
      continue;
    }

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    }
  }

  return pages;
}

export function formatedDate(date: string) {
  const getDate = date.split("-")
  const day = getDate[2].split("T")
  const dateFormated = getDate[0] + '-' + getDate[1] + '-' + day[0];

  return dateFormated;
}

export function getImageCommentAdmin(comments: Comments[], userId: string, level: string){
  if (level === 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.id !== userId)

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }

  if (level !== 'CLIENTE') {
    const commentFiltered = comments?.filter(c => c.user.level === 'ADMIN')

    if (commentFiltered && commentFiltered?.length > 0) {
      if (commentFiltered[0].files) {
        return commentFiltered[0]?.files[0]?.url;
      }
    }
  }
}

export function isImageUrl(url: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  const urlLower = url.toLowerCase();
  for (let i = 0; i < imageExtensions.length; i++) {
    if (urlLower.endsWith(imageExtensions[i])) {
      return true; // É uma imagem
    }
  }
  return false; // Não é uma imagem
}

// export function isValidCPF(cpf: string) {
//   // Validar se é String
//   if (typeof cpf !== 'string') return false

//   // Tirar formatação
//   cpf = cpf.replace(/[^\d]+/g, '')

//   // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
//   if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

//   // String para Array
//   cpf = cpf.split('').map(el => +el);

//   const validator = cpf
//     // Pegar os últimos 2 digitos de validação
//     .filter((digit, index, array) => index >= array.length - 2 && digit)
//     // Transformar digitos em números
//     .map(el => +el)

//   const toValidate = (pop: number) => cpf
//     // Pegar Array de items para validar
//     .filter((digit, index, array) => index < array.length - pop && digit)
//     // Transformar digitos em números
//     .map(el => +el)

//   const rest = (count: number, pop: number) => (toValidate(pop)
//     // Calcular Soma dos digitos e multiplicar por 10
//     .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
//     // Pegar o resto por 11
//     % 11
//     // transformar de 10 para 0
//     % 10

//   return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
// }

export function isValidCPF(cpf: string): boolean {
  // Validar se é String
  if (typeof cpf !== 'string') return false;

  // Tirar formatação
  cpf = cpf.replace(/[^\d]+/g, '');

  // Validar se tem tamanho 11 ou se é uma sequência de dígitos repetidos
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  // String para Array
  const cpfArray = cpf.split('').map(el => +el);

  const validator = cpfArray
    // Pegar os últimos 2 dígitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar dígitos em números
    .map(el => +el);

  const toValidate = (pop: number) =>
    cpfArray
      // Pegar Array de items para validar
      .filter((_, index) => index < cpfArray.length - pop)
      // Transformar dígitos em números
      .map(el => +el);

  const rest = (count: number, pop: number) =>
    (toValidate(pop)
      // Calcular Soma dos dígitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
    // Pegar o resto por 11
    % 11
    // transformar de 10 para 0
    % 10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function converterPrice(price: string | number) {
  const priceFormated = new Intl.NumberFormat('pt-br', {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(Number(price))

  return priceFormated;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCardBrand(cardNumber: string): string | null {
  const cardPatterns = {
    mastercard: /^(5[1-5][0-9]{0,}|2[2-7][0-9]{0,})$/, // Inicia com 51-55 ou 22-27
    amex: /^3[47][0-9]{0,}$/,           // Inicia com 34 ou 37
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/, // Inicia com 300-305, 36 ou 38
    discover: /^6(?:011|5[0-9]{2})[0-9]{0,}$/, // Inicia com 6011 ou 65
    jcb: /^(?:2131|1800|35[0-9]{0,})$/, // Inicia com 2131, 1800 ou 35
    hipercard: /^(606282|637095|637568|637599|637609|637612)[0-9]{0,}$/, // Inicia com prefixos do Hipercard
    elo: /^(4011(78|79)|431274|438935|451416|457393|457631|457632|504175|5067|509[0-9]{0,}|627780|636297|636368|650[0-9]{0,}|6516|6550)[0-9]{0,}$/, // Inicia com prefixos do Elo
    visa: /^4[0-9]{0,}$/, // Inicia com 4
  };

  for (const brand in cardPatterns) {
    if (cardPatterns[brand as keyof typeof cardPatterns].test(cardNumber)) {
      return brand;
    }
  }
  return null;
}

export function identifyFileExtension(urlImage: string) {
  const nameFile = urlImage?.split('/').pop();

  if (nameFile) {
    const extension = nameFile.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(extension!)) {
      return 'image';
    }
  }

  return 'unknown';
}
