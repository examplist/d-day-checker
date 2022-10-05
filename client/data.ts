export interface Data {
  id: number;
  date: string;
  content: string;
}

type DataToBeSent = Omit<Data, 'id'>;

const address = 'http://localhost:4000';

export async function getData(page: number, sort: string, limit: number) {
  const response = await fetch(`${address}?page=${page}&sort=${sort}&limit=${limit}`);
  const resultArray = await response.json();
  return resultArray;
}

export async function getCount() {
  const response = await fetch(address + '/count');
  const { count } = await response.json();
  return count;
}

export async function postData(dataToBeSent: DataToBeSent) {
  const response = await fetch(address, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(dataToBeSent),
  });
  const result = await response.json();
  return result;
}

export async function putData(id: number, dataToBeSent: DataToBeSent) {
  const response = await fetch(`${address}/${id}`, {
    method: 'PUT',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify(dataToBeSent),
  });
  const dataToBeApplied = await response.json();
  return dataToBeApplied;
}

export async function deleteData(id: number) {
  const response = await fetch(`${address}/${id}`, {
    method: 'DELETE',
  });
  const { isRemoved } = await response.json();
  return isRemoved;
}
