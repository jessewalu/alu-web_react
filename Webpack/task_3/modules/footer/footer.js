import $ from 'jquery';
import './footer.css';

console.log('Init footer');

$(document).ready(() => {
  $('body').append('<p>Copyright - Holberton School</p>');
});
