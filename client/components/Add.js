var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as data from '../data.js';
import { makeItems } from './Container.js';
import { sortMode } from './Sort.js';
export default class Add {
    constructor() {
        this.add = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const dataToBeSent = {
                date: this.$inputDate.value,
                content: this.$inputContent.value,
            };
            try {
                yield data.postData(dataToBeSent);
                this.$inputDate.value = '';
                this.$inputContent.value = '';
                makeItems(1, sortMode);
            }
            catch (err) {
                console.error(e);
                alert('일정을 추가하지 못했습니다!');
            }
        });
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
}
