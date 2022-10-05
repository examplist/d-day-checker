import Item from '../database/items.js';

export async function getCount() {
  const count = await Item.count();
  return count;
}
