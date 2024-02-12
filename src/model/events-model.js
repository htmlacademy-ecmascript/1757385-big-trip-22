import { getRandomEvent, getEventById } from '../mock/mockEvents';
import { getDestinationById, getDestinations } from '../mock/mockDestination';
import { getOfferById, getRandomOffer } from '../mock/mockOffers';

const EVENTS_COUNT = 9;
const OFFERS_COUNT = 5;

export default class EventsModel {
  _events = Array.from({ length: EVENTS_COUNT }, getRandomEvent);
  _offers = Array.from({ length: OFFERS_COUNT }, getRandomOffer);

  getEvents() {
    return this._events;
  }

  getEventById(id) {
    return getEventById(id);
  }

  getDestinations() {
    return getDestinations();
  }

  getOffers() {
    return this._offers;
  }

  getOffersByIds(ids) {
    return ids.map(getOfferById);
  }

  getDestinationById(id) {
    return getDestinationById(id);
  }
}
