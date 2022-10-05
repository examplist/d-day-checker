import { makeItems } from './Container.js';
const $sort = document.createElement('div');
$sort.classList.add('sort');
function removeSelected() {
    Array.from($sort.children).forEach(($item) => {
        $item.classList.remove('selected');
    });
}
function handleClick($item, mode) {
    $item.addEventListener('click', (e) => {
        sortMode = mode;
        removeSelected();
        if (e.currentTarget) {
            if (e.currentTarget instanceof HTMLButtonElement) {
                e.currentTarget.classList.add('selected');
            }
        }
        makeItems(1, mode);
    });
}
const $byId = document.createElement('button');
$byId.innerText = '작성순';
handleClick($byId, 'id');
const $byDate = document.createElement('button');
$byDate.innerText = '날짜순';
handleClick($byDate, 'date');
// 초기 설정
let sortMode = 'id';
$byId.classList.add('selected');
$sort.append($byId);
$sort.append($byDate);
export default $sort;
export { sortMode };
