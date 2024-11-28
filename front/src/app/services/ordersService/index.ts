import { create } from "./create";
import { getAll } from "./getAll";
import { getById } from "./getById";
import { getByTransactionId } from "./getByTransactionId";
import { remove } from "./remove";
import { update } from "./update";

export const ordersService = {
  getAll,
  remove,
  create,
  getById,
  update,
  getByTransactionId
}
