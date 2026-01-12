// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticket) {
    this.ticket = ticket;
  }

  createTicketItem() {
    return `
    <div class="ticket-item" data-id="${this.ticket.id}">
      <div class="ticket-header">
        <input type="checkbox" class="ticket-status" ${this.ticket.status ? 'checked' : ''}>
        <div class="ticket-name">${this.ticket.name}</div>
      </div>
      <div class="ticket-info">
        <span class="ticket-created">${moment(this.ticket.created).format('DD.MM.YYYY HH:mm')}</span>
        <button class="btn edit-ticket-btn">✎</button>
        <button class="btn delete-ticket-btn">x</button>
      </div>
    </div>
    `;
  }
}
