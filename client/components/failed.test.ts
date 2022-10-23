import { Window } from 'happy-dom';
import { expect, it, vi } from 'vitest';

/**
 * mocking
 */

vi.mock('../data', () => {
  return {
    getData: () => {
      throw new Error('정보를 가져오지 못 했음');
    },
  };
});
vi.stubGlobal('document', new Window().document);

/**
 * Container 컴포넌트
 */

import $container, { errorMessage } from './Container';

it('자료를 가져오는데 실패하면 오류 메시지가 떠야 한다.', () => {
  expect($container.textContent).toBe(errorMessage);
});
