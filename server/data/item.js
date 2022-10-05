import Item from '../database/items.js';

export async function readAll(page, sort, limit) {
  const allObjects = await Item.findAll({
    order: [[sort, 'DESC']],
    offset: (page - 1) * limit,
    limit: limit,
  });

  return allObjects;
}

export async function create(date, content) {
  const createdObject = await Item.create({ date, content });
  return createdObject;
}

export async function update(id, date, content) {
  const objectById = await Item.findByPk(id);
  if (!objectById) {
    return null;
  }
  objectById.date = date;
  objectById.content = content;
  const updatedObject = await objectById.save();
  return updatedObject;
}

export async function remove(id) {
  const isDestroyed = await Item.destroy({ where: { id } });
  return isDestroyed === 1 ? true : false;
}
