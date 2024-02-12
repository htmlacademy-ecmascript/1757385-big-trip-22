import AbstractView from './abstract-view';
import { EventTypes } from '../mock/mockEventTypes';
import { extractISODate, humanizeDate, humanizeTime, getDuration } from '../utils/utils';

const createSchedule = (dateFrom, dateTo) =>
  `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime=${dateFrom}>${humanizeTime(dateFrom)}</time>
      &mdash;
      <time class="event__end-time" datetime=${dateTo}>${humanizeTime(dateTo)}</time>
    </p>
    <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
  </div>`;

const createOffersList = (offers) =>
  `<ul class="event__selected-offers">
    ${offers.map((offer) => {
    const { title, price } = offer;
    return `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`;
  }).join('')}
  </ul>`;

const createEventTemplate = ({ event, offers, destination }) => {
  const { type, dateFrom, dateTo, basePrice, isFavorite } = event;

  const { icon: eventIcon, title: typeTitle } = EventTypes[type] ?? {};
  const eventTitle = `${typeTitle} ${destination?.name ?? ''}`;

  const offersList = createOffersList(offers);

  const scheduleNode = createSchedule(dateFrom, dateTo);

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${extractISODate(dateFrom)}>${humanizeDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventIcon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>
        ${scheduleNode}
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${offersList}
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView extends AbstractView {
  constructor({ event, offers, destination }) {
    super();
    this._event = event;
    this._offers = offers;
    this._destination = destination;
  }

  getTemplate() {
    return createEventTemplate({ event: this._event, offers: this._offers, destination: this._destination });
  }
}