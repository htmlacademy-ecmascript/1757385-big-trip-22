import FiltersView from '../view/filters-view';
import SortEventsView from '../view/sort-events-view';
import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import AddEventView from '../view/add-event-view';
import TripInfoView from '../view/trip-info-view';
import NoEventsView from '../view/no-events-views';
import { RenderPosition, render, replace } from '../framework/render';

export default class Presenter {
  #container;
  #eventsModel;
  #eventsContainer;
  #filterContainer;

  constructor({container, eventsModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#eventsContainer = this.#container.querySelector('.trip-events');
    this.#filterContainer = this.#container.querySelector('.trip-controls__filters');
  }

  init() {
    this.#render();
  }

  #render() {
    // this.#renderTripInfo();
    this.#renderFilters();
    // this.#renderSortEvents();
    this.#renderEventsList();
  }

  #renderTripInfo() {
    const tripInfoContainer = this.#container.querySelector('.trip-main');
    render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    const filters = Object.keys(this.#eventsModel.filter);
    render(new FiltersView({ filters }), this.#filterContainer);
  }

  #renderSortEvents() {
    render(new SortEventsView(), this.#eventsContainer);
  }

  #renderEventsList() {
    const events = this.#eventsModel.events;

    if (events.length === 0) {
      render(new NoEventsView(), this.#eventsContainer);
      return;
    }

    this.#renderSortEvents();

    const listView = new EventsListView();
    for(const event of events) {
      const eventOffers = this.#eventsModel.getOffersByIds(event.offers);
      const destination = this.#eventsModel.getDestinationById(event.destination);
      this.#renderEvent(event, eventOffers, destination, listView.element);
    }

    render(listView, this.#eventsContainer);
  }

  #renderEvent(event, offers, destination, container) {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToEvent();
      }
    };

    const eventView = new EventView({
      event,
      offers,
      destination,
      onRollUpBtnClick: () => {
        replaceEventToEdit();
        document.addEventListener('keydown', onEscKeyDown);
      }
    });
    render(eventView, container);

    const editView = new EditEventView({
      event,
      offers: this.#eventsModel.offers,
      destinations: this.#eventsModel.destinations,
      onFormSubmit: () => {
        replaceEditToEvent();
      },
      onFormClose: () => {
        replaceEditToEvent();
      }
    });

    function replaceEventToEdit() {
      replace(editView, eventView);
    }

    function replaceEditToEvent() {
      replace(eventView, editView);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }

  #renderAddEvent(offers, destinations, container) {
    render(new AddEventView({ destinations, offers }), container);
  }
}
