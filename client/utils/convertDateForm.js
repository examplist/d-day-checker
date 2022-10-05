export function toDisplay(standard) {
    const arrayUnrefined = standard.split('-');
    // 숫자로 바꿔야 '01월'이 아닌 '1월'로 표시가 된다.
    const array = arrayUnrefined.map((value) => parseInt(value));
    return `${array[0]}년 ${array[1]}월 ${array[2]}일`;
}
export function toStandard(display) {
    const arrayUnrefined = display.split(/\D\s?/);
    arrayUnrefined.pop();
    // 앞에 0이 없는 한 자리 수의 경우 0을 붙임 예) 01
    const array = arrayUnrefined.map((value) => (value.length === 1 ? '0' + value : value));
    return array.join('-');
}
