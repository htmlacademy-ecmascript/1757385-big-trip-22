import AbstractView from './abstract-view';

function createEventsListTemplate() {
  return (
    `<ul class="trip-events__list">

    </ul>`
  );
}

export default class EventsListView extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}
