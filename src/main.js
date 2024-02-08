import Presenter from './presenter/presenter';

const header = document.querySelector('.page-header');
const content = document.querySelector('.trip-events');

const presenter = new Presenter(header, content);
presenter.init();
