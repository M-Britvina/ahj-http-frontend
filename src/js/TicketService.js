import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    this.baseUrl = 'https://ahj-http-backend-7lhw.onrender.com';
    // this.baseUrl = 'http://localhost:7070';
  }

  async list(callback) {
    this.showSpinner();

    try {
      const response = await createRequest({
        method: 'GET',
        url: `${this.baseUrl}/?method=allTickets`,
      });
      callback(response);
    } finally {
      this.hideSpinner();
    }
  }

  async get(id, callback) {
    this.showSpinner();

    try {
      const response = await createRequest({
        method: 'GET',
        url: `${this.baseUrl}/?method=ticketById&id=${id}`,
      });
      callback(response);
    } finally {
      this.hideSpinner();
    }
  }

  async create(data, callback) {
    this.showSpinner();

    try {
      const response = await createRequest({
        method: 'POST',
        url: `${this.baseUrl}/?method=createTicket`,
        data,
      });
      callback(response);
    } finally {
      this.hideSpinner();
    }
  }

  async update(id, data, callback) {
    this.showSpinner();

    try {
      const response = await createRequest({
        method: 'POST',
        url: `${this.baseUrl}/?method=updateById&id=${id}`,
        data,
      });
      callback(response);
    } finally {
      this.hideSpinner();
    }
  }

  async delete(id, callback) {
    this.showSpinner();

    try {
      const response = await createRequest({
        method: 'POST',
        url: `${this.baseUrl}/?method=deleteById&id=${id}`,
      });
      callback(response);
    } finally {
      this.hideSpinner();
    }
  }

  showSpinner() {
    document.getElementById('spinner').style.display = 'block';
  }

  hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
  }
}
