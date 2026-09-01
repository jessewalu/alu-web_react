import $ from 'jquery';
import { debounce } from 'lodash';
import './body.css';

console.log('Init body');

$(document).ready(() => {
  $('body').append('<p>Dashboard data for the students</p>');
  $('body').append('<button id="btn">Click here to get started</button>');
  $('body').append('<p id="count"></p>');

  let count = 0;

  const updateCounter = () => {
    count += 1;
    $('#count').text(`${count} clicks on the button`);
  };

  $('#btn').click(debounce(updateCounter, 300));
});
