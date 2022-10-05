import * as data from '../data.js';
import { makeItems } from './Container.js';
import { sortMode } from './Sort.js';

export default class Add {
  $add: HTMLFormElement;
  $inputDate: HTMLInputElement;
  $inputContent: HTMLInputElement;
  $inputSubmit: HTMLInputElement;

  constructor() {
    // 요소 만들기
    this.$add = document.createElement('form');
    this.$add.classList.add('add');
    this.$inputDate = document.createElement('input');
    this.$inputDate.setAttribute('type', 'date');
    this.$inputDate.classList.add('date');
    this.$inputContent = document.createElement('input');
    this.$inputContent.setAttribute('type', 'text');
    this.$inputContent.classList.add('text');
    this.$inputSubmit = document.createElement('input');
    this.$inputSubmit.setAttribute('type', 'submit');
    this.$inputSubmit.value = '추가';
    this.$inputSubmit.classList.add('submit');

    // 요소 결합하기
    this.$add.append(this.$inputDate);
    this.$add.append(this.$inputContent);
    this.$add.append(this.$inputSubmit);

    this.$add.addEventListener('submit', this.add);
  }

  add = async (e: SubmitEvent) => {
    e.preventDefault();
    const dataToBeSent = {
      date: this.$inputDate.value,
      content: this.$inputContent.value,
    };
    try {
      await data.postData(dataToBeSent);
      this.$inputDate.value = '';
      this.$inputContent.value = '';
      makeItems(1, sortMode);
    } catch (err) {
      console.error(e);
      alert('일정을 추가하지 못했습니다!');
    }
  };
}
