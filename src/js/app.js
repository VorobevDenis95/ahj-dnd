import Container from './components/Container';

const content = document.querySelector('.content');

const form = new Container(content, 'TODO');

const form2 = new Container(content, 'DONE');

form.bindToDom();
form2.bindToDom();

console.log(form);