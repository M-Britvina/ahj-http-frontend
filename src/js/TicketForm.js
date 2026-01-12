/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(ticket) {
    this.ticket = ticket || { id: '', name: '', description: '' };
  }

  createForm() {
    return `
    <form class="ticket-form">
      <div class="ticket-form-header"><h2>Добавить тикет</h2></div>
      <input type="hidden" id="id" value="${this.ticket.id}">
      <label for="name" class="ticket-form-name-label">Краткое описание</label>
      <input id="name" type="text" class="ticket-form-name" required="" value="${this.ticket.name}">
      <label for="description" class="ticket-form-description-label">Подробное описание</label>
      <textarea id="description" class="ticket-form-description" required="">${this.ticket.description}</textarea>

      <div class="button-container">
        <button type="button" class="btn cancel-ticket-btn">Отмена</button>
        <button type="submit" class="btn create-ticket-btn">Ок</button>
      </div>
    </form>
    `;
  }
}
