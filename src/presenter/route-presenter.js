import FiltersView from '../view/filters-view';
import SortEventsView from '../view/sort-events-view';
import EventsListView from '../view/events-list-view';
import AddEventView from '../view/add-event-view';
import TripInfoView from '../view/trip-info-view';
import NoEventsView from '../view/no-events-views';
import { RenderPosition, render } from '../framework/render';
import EventPresenter, { EventMode } from './event-presenter';

export default class RoutePresenter {
  #container = null;
  #eventsModel = null;
  #eventsContainer = null;
  #filterContainer = null;
  #eventsListView = null;
  #eventPresenters = new Map();

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
    this.#renderSortEvents();
    this.#renderEventsList();
    this.#renderEvents();
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
    this.#eventsListView = new EventsListView();
    render(this.#eventsListView, this.#eventsContainer);
  }

  #renderEvents() {
    const events = this.#eventsModel.events;

    if (events.length === 0) {
      render(new NoEventsView(), this.#eventsContainer);
      return;
    }

    this.#eventsListView = this.#eventsListView ?? new EventsListView();

    for(const event of events) {
      this.#renderEvent(event);
    }
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      parentContainer: this.#eventsListView,
      model: this.#eventsModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleEventModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderAddEvent(offers, destinations, container) {
    render(new AddEventView({ destinations, offers }), container);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsModel.updateEvent(updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleEventModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.mode !== EventMode.DEFAULT && presenter.resetView());
  };
}
