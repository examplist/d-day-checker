var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const address = 'http://localhost:4000';
export function getData(page, sort, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${address}?page=${page}&sort=${sort}&limit=${limit}`);
        const resultArray = yield response.json();
        return resultArray;
    });
}
export function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(address + '/count');
        const { count } = yield response.json();
        return count;
    });
}
export function postData(dataToBeSent) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(address, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(dataToBeSent),
        });
        const result = yield response.json();
        return result;
    });
}
export function putData(id, dataToBeSent) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${address}/${id}`, {
            method: 'PUT',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(dataToBeSent),
        });
        const dataToBeApplied = yield response.json();
        return dataToBeApplied;
    });
}
export function deleteData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${address}/${id}`, {
            method: 'DELETE',
        });
        const { isRemoved } = yield response.json();
        return isRemoved;
    });
}
