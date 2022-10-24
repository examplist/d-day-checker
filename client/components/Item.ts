import calculateDDay from '../utils/calculateDDay';
import * as convertDateForm from '../utils/convertDateForm';
import { putData, deleteData } from '../data';
import { makeItems } from './Container';
import { sortMode } from './Sort';

export default class Item {
  id: number;
  $item: HTMLDivElement;
  $firstLine: HTMLDivElement;
  $dDay: HTMLDivElement;
  $date: HTMLDivElement;
  $inputDate: HTMLInputElement;
  $content1: HTMLDivElement;
  $inputContent1: HTMLInputElement;
  $edit: HTMLButtonElement;
  $delete: HTMLButtonElement;
  $confirm: HTMLButtonElement;
  $cancel: HTMLButtonElement;
  $secondLine: HTMLDivElement;
  $content2: HTMLDivElement;
  $inputContent2: HTMLInputElement;

  constructor(id: number, date: string, content: string) {
    // 아이디 저장하기
    // 수정이나 삭제 시 필요
    this.id = id;

    // 요소 만들기
    // 첫 번째 줄
    this.$item = document.createElement('div');
    this.$item.classList.add('item');
    this.$firstLine = document.createElement('div');
    this.$firstLine.classList.add('first-line');
    this.$dDay = document.createElement('div');
    this.$dDay.classList.add('d-day');
    this.$date = document.createElement('div');
    this.$date.classList.add('date');
    this.$inputDate = document.createElement('input');
    this.$inputDate.setAttribute('type', 'date');
    this.$inputDate.classList.add('input-date', 'hide');
    this.$content1 = document.createElement('div');
    this.$content1.classList.add('content');
    this.$inputContent1 = document.createElement('input');
    this.$inputContent1.setAttribute('type', 'text');
    this.$inputContent1.classList.add('input-content', 'hide');
    this.$edit = document.createElement('button');
    this.$edit.classList.add('edit');
    this.$delete = document.createElement('button');
    this.$delete.classList.add('delete');
    this.$confirm = document.createElement('button');
    this.$confirm.classList.add('confirm', 'hide');
    this.$cancel = document.createElement('button');
    this.$cancel.classList.add('cancel', 'hide');
    // 두 번째 줄
    this.$secondLine = document.createElement('div');
    this.$secondLine.classList.add('second-line');
    this.$content2 = document.createElement('div');
    this.$content2.classList.add('content');
    this.$inputContent2 = document.createElement('input');
    this.$inputContent2.setAttribute('type', 'text');
    this.$inputContent2.classList.add('input-content', 'hide');

    // 요소에 내용 추가하기
    this.$date.innerText = convertDateForm.toDisplay(date);
    this.$content1.innerText = content;
    this.$edit.innerText = '수정';
    this.$delete.innerText = '삭제';
    this.$confirm.innerText = '확인';
    this.$cancel.innerText = '취소';
    this.$content2.innerText = content;
    this.$dDay.innerText = calculateDDay(date);

    // 이벤트 핸들러 추가하기
    this.$edit.addEventListener('click', this.editItem);
    this.$delete.addEventListener('click', this.deleteItem);
    this.$confirm.addEventListener('click', this.confirmEdit);
    this.$cancel.addEventListener('click', this.cancelEdit);
    this.$inputContent1.addEventListener('input', (e) => {
      if (e.currentTarget) {
        if (e.currentTarget instanceof HTMLInputElement) {
          this.$inputContent2.value = e.currentTarget.value;
        }
      }
    });
    this.$inputContent2.addEventListener('input', (e) => {
      if (e.currentTarget) {
        if (e.currentTarget instanceof HTMLInputElement) {
          this.$inputContent1.value = e.currentTarget.value;
        }
      }
    });

    // 요소 결합하기
    this.$firstLine.appendChild(this.$dDay);
    this.$firstLine.appendChild(this.$date);
    this.$firstLine.appendChild(this.$inputDate);
    this.$firstLine.appendChild(this.$content1);
    this.$firstLine.appendChild(this.$inputContent1);
    this.$firstLine.appendChild(this.$edit);
    this.$firstLine.appendChild(this.$delete);
    this.$firstLine.appendChild(this.$confirm);
    this.$firstLine.appendChild(this.$cancel);
    this.$secondLine.appendChild(this.$content2);
    this.$secondLine.appendChild(this.$inputContent2);
    this.$item.appendChild(this.$firstLine);
    this.$item.appendChild(this.$secondLine);
  }

  toggleHide = () => {
    Array.from(this.$firstLine.children).forEach((child) => {
      child.classList.toggle('hide');
    });
    Array.from(this.$secondLine.children).forEach((child) => {
      child.classList.toggle('hide');
    });
  };

  editItem = () => {
    this.toggleHide();
    this.$inputDate.value = convertDateForm.toStandard(this.$date.innerText);
    this.$inputContent1.value = this.$content1.innerText;
    this.$inputContent2.value = this.$content2.innerText;
  };

  deleteItem = async () => {
    const checkAgain = confirm('정말로 삭제하시겠습니까?');
    if (!checkAgain) {
      return;
    }
    try {
      const isRemoved = await deleteData(this.id);
      if (isRemoved) {
        makeItems(1, sortMode);
      } else {
        alert('삭제를 하지 못했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('삭제를 하지 못했습니다.');
    }
  };

  confirmEdit = async () => {
    const dataToBeSent = {
      date: this.$inputDate.value,
      content: this.$inputContent1.value,
    };
    try {
      await putData(this.id, dataToBeSent);
      makeItems(1, sortMode);
    } catch (err) {
      console.error(err);
      alert('수정을 하지 못했습니다.');
    }
  };

  cancelEdit = () => {
    this.toggleHide();
  };
}
