import Ticket from './Ticket';
import TicketView from './TicketView';
import TicketForm from './TicketForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    this.container.append(this.createAddTicketButton());
    this.container.append(this.createTicketList());
    this.container.append(this.createSpinner());
    this.updateTicketList();

    this.container.addEventListener('click', this.onClick());
  }

  onClick() {
    return (event) => {
      event.preventDefault();
      const removeBtn = event.target.classList.contains('delete-ticket-btn');
      const openFormBtn = event.target.classList.contains('add-ticket-btn');
      const closeFormBtn = event.target.classList.contains('cancel-ticket-btn');
      const editBtn = event.target.classList.contains('edit-ticket-btn');
      const createTicketBtn = event.target.classList.contains('create-ticket-btn');
      const checkboxTicket = event.target.classList.contains('ticket-status');

      if (removeBtn) {
        const { id } = event.target.closest('.ticket-item').dataset;
        this.ticketService.delete(id, () => this.updateTicketList());
      } else if (openFormBtn) {
        const form = this.container.querySelector('.ticket-form');
        if (form) {
          form.remove();
        }
        this.container.insertAdjacentHTML('beforeend', new TicketForm().createForm());
      } else if (closeFormBtn) {
        event.target.closest('.ticket-form').remove();
      } else if (editBtn) {
        const form = this.container.querySelector('.ticket-form');
        if (form) {
          form.remove();
        }
        const { id } = event.target.closest('.ticket-item').dataset;
        this.ticketService.get(id, (ticket) =>
          this.container.insertAdjacentHTML('beforeend', new TicketForm(ticket).createForm()),
        );
      } else if (createTicketBtn) {
        const form = this.container.querySelector('.ticket-form');
        const ticket = {
          id: form.querySelector('[id="id"]').value,
          name: form.querySelector('.ticket-form-name').value,
          description: form.querySelector('.ticket-form-description').value,
        };
        if (ticket.id) {
          this.ticketService.update(ticket.id, ticket, () => this.updateTicketList());
        } else {
          this.ticketService.create(ticket, () => this.updateTicketList());
        }
        if (form) {
          form.remove();
        }
      } else if (checkboxTicket) {
        const { id } = event.target.closest('.ticket-item').dataset;
        this.ticketService.get(id, (ticket) => {
          ticket.status = !ticket.status;
          this.ticketService.update(id, ticket, () => this.updateTicketList());
        });
      }
    };
  }

  createAddTicketButton() {
    const div = document.createElement('div');
    div.classList.add('button-block');
    const createTicketButton = document.createElement('button');
    createTicketButton.classList.add('btn');
    createTicketButton.classList.add('add-ticket-btn');
    createTicketButton.textContent = 'Добавить тикет';
    div.append(createTicketButton);
    return div;
  }

  createTicketList() {
    const ticketList = document.createElement('div');
    ticketList.classList.add('ticket-list');
    return ticketList;
  }

  createSpinner() {
    const spinner = document.createElement('img');
    spinner.classList.add('spinner');
    spinner.id = 'spinner';
    spinner.alt = 'Загрузка...';
    spinner.src = 'img/spinner.gif';
    spinner.style.display = 'none';
    return spinner;
  }

  updateTicketList() {
    const ticketList = this.container.querySelector('.ticket-list');
    ticketList.innerHTML = '';
    this.ticketService.list((data) => {
      data.forEach((element) => {
        const ticket = new Ticket(element);
        const ticketView = new TicketView(ticket);
        ticketList.insertAdjacentHTML('beforeend', ticketView.createTicketItem());
      });
    });
  }
}
