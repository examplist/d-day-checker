import * as data from '../data';
import { makeItems } from './Container';
import { sortMode } from './Sort';

const $pagination = document.createElement('div');
$pagination.classList.add('pagination');

// 설정
// 한 줄에 있는 '숫자' 버튼의 개수
const countPagesInPageGroup = 3;
// 한 페이지에 들어가는 아이템의 개수
const countItemsInPage = 4;

async function paginate(currentPage: number): Promise<void> {
  // 초기화
  $pagination.innerHTML = '';

  // 아이템의 개수
  let countAllItems;
  try {
    countAllItems = await data.getCount();
  } catch (err) {
    console.error(err);
    alert('일정의 개수를 파악할 수 없습니다.');
    countAllItems = 0;
  }

  let countAllPages = Math.ceil(countAllItems / countItemsInPage);
  let pageGroupOfCurrentPage = Math.ceil(currentPage / countPagesInPageGroup);
  // lastNumber -> pageGroupOfCurrentPage의 마지막 페이지
  let lastNumber = pageGroupOfCurrentPage * countPagesInPageGroup;
  // 만약 총 5페이지인데 lastNumber가 위의 식에 따라 6이 나오면 5로 바꿔야 한다.
  if (lastNumber > countAllPages) {
    lastNumber = countAllPages;
  }
  // firstNumber -> pageGroupOfCurrentPage의 첫 번째 페이지
  let firstNumber = lastNumber - (countPagesInPageGroup - 1);
  // 만약 총 페이지 수가 3인데 countPagesInPageGroup이 4이면
  // firstNumber가 0부터 시작한다. 따라서 이를 1로 바꿔야 한다.
  if (firstNumber < 1) {
    firstNumber = 1;
  }
  const next = lastNumber + 1;
  const prev = firstNumber - 1;

  // 1페이지 앞에는'이전'이 없어야 한다.
  if (prev > 0) {
    const $prevButton = document.createElement('button');
    $prevButton.classList.add('prev');
    $prevButton.innerText = '이전';
    $prevButton.addEventListener('click', () => {
      currentPage = prev;
      makeItems(currentPage, sortMode);
    });
    $pagination.append($prevButton);
  }
  for (let i = firstNumber; i <= lastNumber; i++) {
    const $pageNumberButton = document.createElement('button');
    $pageNumberButton.setAttribute('id', 'page_' + i);
    $pageNumberButton.innerText = i.toString();
    // currentPage의 경우 글자색을 다르게 하기
    if (currentPage === i) {
      $pageNumberButton.classList.add('selected');
    }
    $pageNumberButton.addEventListener('click', (e) => {
      if (e.currentTarget) {
        if (e.currentTarget instanceof HTMLButtonElement) {
          currentPage = parseInt(e.currentTarget.innerText);
        }
      }
      makeItems(currentPage, sortMode);
    });
    $pagination.append($pageNumberButton);
  }
  // 마지막 페이지 뒤에는 '다음'이 없어야 한다.
  if (lastNumber < countAllPages) {
    const $nextButton = document.createElement('button');
    $nextButton.classList.add('next');
    $nextButton.innerText = '다음';
    $nextButton.addEventListener('click', () => {
      currentPage = next;
      makeItems(currentPage, sortMode);
    });
    $pagination.append($nextButton);
  }
}

export default $pagination;
export { countItemsInPage, paginate };
