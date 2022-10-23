import { expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

/**
 * mocking
 */

vi.stubGlobal('document', new Window().document);

/**
 * Title 컴포넌트
 */

import $title from './Title';

it('$title이 존재하고 그 값은 "D-Day 확인하기"인지', () => {
  expect($title.textContent).toBe('D-Day 확인하기');
});
