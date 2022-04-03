import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const countryList = document.querySelector(".country-list");
let input = document.querySelector('input');


console.log(input.value.trim())



input.addEventListener("input", _.debounce(() => {
  
  fetchCountries()
    .then((countries) => renderCountryList(countries))
    .catch((error) => console.log(error));
}, 300)
);



function fetchCountries() {

  return fetch(`https://restcountries.com/v2/name/${input.value.trim()}?fields=name,capital,population,flags,languages`).then(
    (response) => {
      if ((!response.ok) && (input.value.length > 0) && (input.value.trim() !== "")) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        throw new Error(response.status);
        
      }
      return response.json();
    }
  )
}


function renderCountryList(countries) {
  console.log(countries.length)
  
  
if ((countries.length >= 2) && (countries.length <= 10)) {
  const markup = countries
    .map((country) => {
      return `<li>
      <p><img class="flag" src=" ${country.flags.svg}" alt="flag">
          <span class=country-names>${country.name}</span></p>
      </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
} else if (countries.length > 10) {
  Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  const markup = countries
    .map((country) => {
      return `
      <p>
      
      </p>
      `;
    })
    .join("");
  countryList.innerHTML = markup;
  
    
  } else if (countries.length === 1) {
    const markup = countries
      .map((country) => {
        console.log(country.name);
        const array=[];

        for (const key of country.languages) {
          array.push(" "+key.name);
          console.log(key.name);
          
          
        }
        return `<li>
          <p><img class="flag" src=" ${country.flags.svg}" alt="flag">
          <span class=country-name>${country.name}</span></p>
          <p><b>Capital</b>: ${country.capital}</p>
           <p><b>Population</b>: ${country.population}</p>
           <p><b>Languages</b>: ${array}</p>
         </li>`;
      })
      .join("");
    countryList.innerHTML = markup;
      
    } 
}

