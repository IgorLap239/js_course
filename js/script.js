'use strict';

//удаление рекламы
document.querySelector('.adv').remove();

//восстановление порядка книг
let booksCollection = document.querySelector('.books'),
    allBooks = document.querySelectorAll('.book'),
    titles = document.querySelectorAll('a'),
    bookChapters = document.querySelectorAll('li'); 

booksCollection.prepend(allBooks[1]);
booksCollection.append(allBooks[2]);
allBooks[3].before(allBooks[4]);

//замена фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//исправление ошибки
titles[4].textContent = 'Книга 3. this и Прототипы Объектов';


//исправление списка глав
bookChapters[10].before(bookChapters[2]);
bookChapters[4].before(bookChapters[8]);
bookChapters[8].before(bookChapters[6]);

bookChapters[49].before(bookChapters[55]);
bookChapters[52].before(bookChapters[48]);
bookChapters[54].before(bookChapters[51]);

//добавление главы к 6 книге
const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
bookChapters[26].before(newChapter);