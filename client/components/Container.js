var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Item from './Item.js';
import { getData } from '../data.js';
import { countItemsInPage, paginate } from './Pagination.js';
import { sortMode } from './Sort.js';
const $container = document.createElement('div');
const emptyMessage = '자료가 없습니다.';
const errorMessage = '죄송합니다. 현재 자료를 불러올 수 없습니다.';
function makeItems(page, sort) {
    return __awaiter(this, void 0, void 0, function* () {
        $container.innerHTML = '';
        // 로딩
        $container.classList.add('container', 'loading');
        // 가져오기
        try {
            const resultArray = yield getData(page, sort, countItemsInPage);
            $container.classList.remove('loading');
            if (resultArray.length === 0) {
                $container.classList.add('no-content');
                $container.innerText = emptyMessage;
            }
            else {
                resultArray.forEach((result) => {
                    const { id, date, content } = result;
                    const itemInstance = new Item(id, date, content);
                    $container.append(itemInstance.$item);
                });
                paginate(page);
            }
        }
        catch (err) {
            console.error(err);
            $container.classList.remove('loading');
            $container.classList.add('error');
            $container.innerText = errorMessage;
        }
    });
}
makeItems(1, sortMode);
export default $container;
export { makeItems, emptyMessage, errorMessage };
