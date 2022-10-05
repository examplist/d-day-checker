import Item from './Item.js';
import { getData, Data } from '../data.js';
import { countItemsInPage, paginate } from './Pagination.js';
import { sortMode } from './Sort.js';

const $container = document.createElement('div');

async function makeItems(page: number, sort: string): Promise<void> {
  $container.innerHTML = '';

  // 로딩
  $container.classList.add('container', 'loading');

  // 가져오기
  try {
    const resultArray = await getData(page, sort, countItemsInPage);
    $container.classList.remove('loading');
    if (resultArray.length === 0) {
      $container.classList.add('no-content');
      $container.innerText = '자료가 없습니다.';
    } else {
      resultArray.forEach((result: Data) => {
        const { id, date, content } = result;
        const itemInstance = new Item(id, date, content);
        $container.append(itemInstance.$item);
      });
      paginate(page);
    }
  } catch (err) {
    console.error(err);
    $container.classList.remove('loading');
    $container.classList.add('error');
    $container.innerText = '죄송합니다. 현재 자료를 불러올 수 없습니다.';
  }
}

makeItems(1, sortMode);

export default $container;
export { makeItems };
