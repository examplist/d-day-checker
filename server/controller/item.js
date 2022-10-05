import * as itemData from '../data/item.js';

export async function readItems(req, res) {
  const page = parseInt(req.query.page, 10);
  const sort = req.query.sort;
  const limit = parseInt(req.query.limit, 10);
  const allObjects = await itemData.readAll(page, sort, limit);
  res.status(200).json(allObjects);
}

export async function createItem(req, res) {
  const { date, content } = req.body;
  const createdObject = await itemData.create(date, content);
  res.status(201).json(createdObject);
}

export async function updateItem(req, res) {
  const id = req.params.id;
  const { date, content } = req.body;
  const updatedObject = await itemData.update(id, date, content);
  if (updatedObject) {
    res.status(200).json(updatedObject);
  } else {
    res.status(404).json({ message: `id(${id}) is not found` });
  }
}

export async function removeItem(req, res) {
  const id = req.params.id;
  const isRemoved = await itemData.remove(id);
  res.status(200).json({ isRemoved });
}
