import $title from './components/Title.js';
import Add from './components/Add.js';
import $sort from './components/Sort.js';
import $container from './components/Container.js';
import $pagination from './components/Pagination.js';

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
