import * as countData from '../data/count.js';

export async function getCount(req, res) {
  const count = await countData.getCount();
  res.status(200).json({ count });
}
