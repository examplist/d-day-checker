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
vi.mock('./data', () => {
  return {
    getData: () => Promise.resolve(results),
    getCount: () => totalCount,
    postData: () => results[0],
    putData: () => results[0],
    deleteData: () => true,
  };
});

/**
 * 테스트
 */

import $app, { $add } from './index';
import $title from './components/Title';
import $sort from './components/Sort';
import $container from './components/Container';
import $pagination from './components/Pagination';

it('모든 컴포넌트가가 순서대로 붙었는지', () => {
  if ($app) {
    expect($app.children[0]).toEqual($title);
    expect($app.children[1]).toEqual($add);
    expect($app.children[2]).toEqual($sort);
    expect($app.children[3]).toEqual($container);
    expect($app.children[4]).toEqual($pagination);
  }
});
