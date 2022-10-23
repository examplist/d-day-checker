import { Window } from 'happy-dom';
import { expect, it, vi } from 'vitest';
import * as data from '../data';
import { toDisplay } from '../utils/convertDateForm';

/**
 * data
 */

const results = [
  { id: 32, date: '2022-10-05', content: '일정 32' },
  { id: 28, date: '2022-08-25', content: '일정 28' },
];
const totalCount = 50;

/**
 * mocking
 */

vi.mock('../data', () => {
  return {
    getData: () => Promise.resolve(results),
    getCout: () => totalCount,
    putData: () => {},
    deleteData: () => {},
  };
});
vi.mock('./Sort', () => {
  return {
    sortMode: 'id',
  };
});
vi.mock('./Pagination', () => {
  return {
    countItemsInPage: 4,
    paginate: () => {},
  };
});
vi.stubGlobal('confirm', (message) => {
  return true;
});
vi.stubGlobal('alert', () => {});
vi.stubGlobal('document', new Window().document);

/**
 * Item 컴포넌트
 */

import Item from './Item';

const {
  $item,
  $firstLine,
  $secondLine,
  $date,
  $content1,
  $content2,
  confirmEdit,
  deleteItem,
} = new Item(results[0].id, results[0].date, results[0].content);

it('$item, $firstLine, $secondLine 존재 유무 확인', () => {
  expect($item).not.toBeNull();
  expect($item.children[0]).toEqual($firstLine);
  expect($item.children[1]).toEqual($secondLine);
});

it('날짜하고 일정 내용 입력하면 잘 출력되는지 확인', () => {
  expect($date.textContent).toBe(toDisplay(results[0].date));
  expect($content1.textContent).toBe(results[0].content);
  expect($content2.textContent).toBe(results[0].content);
});

it('수정 확인 버튼을 누르면 putData가 호출되는지 확인', () => {
  const mockPutData = vi.spyOn(data, 'putData');
  confirmEdit();
  expect(mockPutData).toHaveBeenCalled();
});

it('삭제 버튼을 누르고 확인을 하면 deleteData가 호출되는지 확인', () => {
  const mockDeleteData = vi.spyOn(data, 'deleteData');
  deleteItem();
  expect(mockDeleteData).toHaveBeenCalled();
});

/**
 * Container 컴포넌트
 */

import $container from './Container';

it('$container에 result를 반영하는 $item들이 붙었는지 확인', () => {
  const contentOf$item1 = $container.children[0].children[0].children[3].textContent;
  expect(contentOf$item1).toBe(results[0].content);
});
