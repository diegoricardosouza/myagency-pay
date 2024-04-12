import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { me } from "./me";
import { remove } from "./remove";
import { update } from "./update";

export const usersService = {
  me,
  create,
  getAll,
  remove,
  getById,
  update
}
