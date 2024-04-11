import { create } from "./create";
import { getAll } from "./getAll";
import { me } from "./me";
import { remove } from "./remove";

export const usersService = {
  me,
  create,
  getAll,
  remove
}
