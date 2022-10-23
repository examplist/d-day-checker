import { Window } from 'happy-dom';
import { expect, it, vi } from 'vitest';

/**
 * mocking
 */

vi.mock('../data', () => {
  return {
    getData: () => Promise.resolve([]),
  };
});
vi.stubGlobal('document', new Window().document);

/**
 * Container 컴포넌트
 */

import $container, { emptyMessage } from './Container';

it('자료가 없으면 없다는 메시지를 출력해야 한다.', () => {
  expect($container.textContent).toBe(emptyMessage);
});
