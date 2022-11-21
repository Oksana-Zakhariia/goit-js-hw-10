import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountriesByName } from "./fetchCountries";

const list = document.querySelector('.country-list');
const input = document.querySelector('#search-box');
const coyntryCard = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
      
    const countryName = evt.target.value.trim();
    if (!countryName) {
        return
    }
  
  fetchCountriesByName(countryName).then((data) => renderCountriesList(data)).catch((error) => 
    Notify.failure("Oops, there is no country with that name") ,   
    list.innerHTML = "",
    coyntryCard.innerHTML = '')
}
    

function renderCountriesList(data) {
  // console.log(data)
   if (data.length > 10) { list.innerHTML = ''
    Notify.info ('Too many matches found. Please enter a more specific name.')
    return
   }
   else if (data.length > 1) {
    let markup = data.map((country) => 
      `<li> 
      <img class="flag-picture" src="${country.flags.svg}" alt="${country.name.official} width="480">
      <h3 class='country-name' > ${country.name.official}</h3>        
        </li>` ).join(''); 
    list.innerHTML = markup ;
   }
   else {
    let markup = data.map((country) => {
      return `<div>
        <img src="${country.flags.svg}" alt="${country.name.official} height="150">
          <h2><b>Назва країни</b>: ${country.name.official}</h2>
          <p><b>Столиця</b>: ${country.capital}</p>
          <p><b>Населення</b>: ${country.population}</p>   
          <p><b>Мови</b>: ${Object.values(country.languages)}</p>
          </div>`;
      }).join("");
     list.innerHTML = '';
     coyntryCard.innerHTML = markup;     
  }   
}