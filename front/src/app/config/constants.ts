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

export const MAX_FILE_SIZE = 1024 * 1024 * 3;

export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif"
];
