import Presenter from './presenter/presenter';
import EventsModel from './model/events-model';

const container = document.querySelector('.page-body');
const eventsModel = new EventsModel();

const presenter = new Presenter({container, eventsModel});
presenter.init();
