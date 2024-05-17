export interface LevelProps {
  value: string;
  label: string;
}

export const LEVELS = [
  {
    value: "ADMIN",
    label: "Admin"
  },
  {
    value: "EDITOR",
    label: "Editor"
  },
  {
    value: "CLIENTE",
    label: "Cliente"
  }
];

export const FORMATS_DIGITAL_MIDIA = [
  {
    value: "Feed",
    label: "Feed"
  },
  {
    value: "Storie",
    label: "Storie"
  },
  {
    value: "Telão",
    label: "Telão"
  },
  {
    value: "Outros",
    label: "Outros"
  }
];

export const FORMATS_PRINTED = [
  {
    value: "A3 (29,7x42cm)",
    label: "A3 (29,7x42cm)"
  },
  {
    value: "A4 (21x29,7cm)",
    label: "A4 (21x29,7cm)"
  },
  {
    value: "Flyer A5 (15x21cm)",
    label: "Flyer A5 (15x21cm)"
  },
  {
    value: "Cartão de Visita",
    label: "Cartão de Visita"
  },
  {
    value: "Outros",
    label: "Outros"
  }
];

export const FORMATS_PRESENTATION = [
  {
    value: "Impresso",
    label: "Impresso"
  },
  {
    value: "Digital",
    label: "Digital"
  }
];

export const MAX_FILE_SIZE = 1024 * 1024 * 3;

export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif"
];

