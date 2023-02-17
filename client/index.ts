import './scss/style.scss';

import $title from './components/Title';
import Add from './components/Add';
import $sort from './components/Sort';
import $container from './components/Container';
import $pagination from './components/Pagination';

const $app = document.querySelector('#app');

const addInstance = new Add();
const $add = addInstance.$add;

$app?.append($title);
$app?.append($add);
$app?.append($sort);
$app?.append($container);
$app?.append($pagination);

export default $app;
export { $add };
