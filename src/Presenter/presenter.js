import FiltersView from '../view/filters-view';
import SortEventsView from '../view/sort-events-view';
import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import AddEventView from '../view/add-event-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../utils/render';

export default class Presenter {
  constructor({container, eventsModel}) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._eventsContainer = this._container.querySelector('.trip-events');
    this._filterContainer = this._container.querySelector('.trip-controls__filters');
  }

  init() {
    this._renderTripInfo();
    this._renderFilters();
    this._renderSortEvents();
    this._renderEventsList();
  }

  _renderTripInfo() {
    const tripInfoContainer = this._container.querySelector('.trip-main');
    render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    render(new FiltersView(), this._filterContainer);
  }

  _renderSortEvents() {
    render(new SortEventsView(), this._eventsContainer);
  }

  _renderEventsList() {
    //edit on real data
    const events = this._eventsModel.getEvents();
    const editEvent = events[0];
    const offers = this._eventsModel.getOffers();
    const destinations = this._eventsModel.getDestinations();

    const ids = new Set();
    const editOffers = [...this._eventsModel.getOffersByIds(editEvent.offers), ...offers]
      .filter((value) => {
        const exists = ids.has(value.id);
        ids.add(value.id);
        return !exists;
      });

    const listView = new EventsListView();
    render(new AddEventView({ destinations, offers }), listView.getElement());
    render(new EditEventView({ destinations, offers: editOffers, event: editEvent }), listView.getElement());

    for(const event of events) {
      const eventOffers = this._eventsModel.getOffersByIds(event.offers);
      const destination = this._eventsModel.getDestinationById(event.destination);
      render(new EventView({ event, offers: eventOffers, destination }), listView.getElement());
    }

    render(listView, this._eventsContainer);
  }
}
