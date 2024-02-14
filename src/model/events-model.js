import { getRandomEvent, getEventById } from '../mock/mockEvents';
import { getDestinationById, getDestinations } from '../mock/mockDestination';
import { getOfferById, getOffers } from '../mock/mockOffers';

const EVENTS_COUNT = 9;
const OFFERS_COUNT = 5;

export default class EventsModel {
  #events = Array.from({ length: EVENTS_COUNT }, getRandomEvent);
  #offers = getOffers().slice(0, OFFERS_COUNT);
  #destinations = getDestinations();

  get events() {
    return this.#events;
  }

  getEventById(id) {
    return getEventById(id);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByIds(ids) {
    return ids.map(getOfferById);
  }

  getDestinationById(id) {
    return getDestinationById(id);
  }
}
