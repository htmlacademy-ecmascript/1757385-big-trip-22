import FiltersView from '../view/filters-view';
import SortEventsView from '../view/sort-events-view';
import EventsListView from '../view/events-list-view';
import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../utils/render';

export default class Presenter {
  constructor(header, container) {
    this._container = container;
    this._header = header;
  }

  init() {
    this._renderTripInfo();
    this._renderFilters();
    this._renderSortEvents();
    this._renderEventsList();
  }

  _renderTripInfo() {
    const tripMain = this._header.querySelector('.trip-main');
    render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    const filters = this._header.querySelector('.trip-controls__filters');
    render(new FiltersView(), filters);
  }

  _renderSortEvents() {
    render(new SortEventsView(), this._container);
  }

  _renderEventsList() {
    const listView = new EventsListView();
    render(new EditEventView(), listView.getElement());

    for(let i = 0; i < 3; i++) {
      render(new EventView(), listView.getElement());
    }

    render(listView, this._container);
  }
}
