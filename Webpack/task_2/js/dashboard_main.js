import $ from 'jquery';
import { debounce } from 'lodash';
import '../css/main.css';

$(document).ready(() => {
  $('body').prepend('<div id="logo"></div>');
  $('body').append('<p>Holberton Dashboard</p>');
  $('body').append('<p>Dashboard data for the students</p>');
  $('body').append('<button id="btn">Click here to get started</button>');
  $('body').append('<p id="count"></p>');
  $('body').append('<p>Copyright - Holberton School</p>');

  let count = 0;

  const updateCounter = () => {
    count += 1;
    $('#count').text(`${count} clicks on the button`);
  };

  $('#btn').click(debounce(updateCounter, 300));
});
