import { expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

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

vi.stubGlobal('document', new Window().document);
vi.mock('../data', () => {
  return {
    getData: () => Promise.resolve(results),
    getCount: () => totalCount,
    postData: () => results[0],
    putData: () => results[0],
    deleteData: () => true,
  };
});

/**
 * Add 컴포넌트
 */

import Add from './Add';

const addInstance = new Add();
const { $add, $inputDate, $inputContent, $inputSubmit } = addInstance;

it('$add에 모든 요소들이 순서대로 있는지', () => {
  expect($add.children[0]).toEqual($inputDate);
  expect($add.children[1]).toEqual($inputContent);
  expect($add.children[2]).toEqual($inputSubmit);
});
