'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScrolling from './modules/smoothScrolling';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import command from './modules/command';
import validation from './modules/validation';
import sendForm from './modules/sendForm';

//таймер
countTimer('11 march 2021');

//меню
toggleMenu();

//плавная прокрутка по кнопке
smoothScrolling();

//popup
togglePopUp();

//табы
tabs();

//слайдер
slider();

//калькулятор
calculator(100);

//наша команда
command();

//валидация форм
validation();

//send-ajax-form
sendForm();