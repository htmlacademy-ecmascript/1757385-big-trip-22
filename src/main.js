import Presenter from './presenter/presenter';
import EventsModel from './model/EventsModel';

const container = document.querySelector('.page-body');
const eventsModel = new EventsModel();

const presenter = new Presenter({container, eventsModel});
presenter.init();
