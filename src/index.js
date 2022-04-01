// import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");
const countryList = document.querySelector(".country-list");
const input = document.querySelector('input');

//input.addEventListener('input', doThing());

// input.addEventListener("input", _.debounce(() => {
//   fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
// }, 300)
// );

input.addEventListener("input", _.debounce(() => {
  fetchCountries()
    .then((countries) => renderCountryList(countries))
    .catch((error) => console.log(error));
}, 300)
);

function doThing(){
  console.log('Horray! Someone wrote "' + input + '"!"')
}
console.log(input.value.length)



// fetchUsersBtn.addEventListener("click", () => {
//   fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
// });



// const searchParams = input.value;

function fetchCountries() {
  return fetch(`https://restcountries.com/v2/name/${input.value.trim()}?fields=name,capital,population,flags,languages`).then(
    (response) => {
      if ((!response.ok) && (input.value.length > 0)) {
        alert("OOps, there is no country with that name");
        throw new Error(response.status);
        
      }
      return response.json();
      //return fetchCountries.js();
    }
  )
  // .then((data) => {
  //   console.log(data);
  // })
  // .catch((error) => {});
}

// function renderUserList(users) {
//   const markup = users
  
//     .map((user) => {
//       return `<li>
//           <p><b>Name</b>: ${user.name.official}</p>
//           <p><b>Capital</b>: ${user.capital}</p>
//           <p><b>Population</b>: ${user.population}</p>
//           <p><b>Flags</b>: ${user.flags.svg}</p>
//           <p><b>languages</b>: ${user.languages}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }

function renderCountryList(countries) {
  console.log(countries.length)
  
  
if ((countries.length >= 2) && (countries.length <= 10)) {
  const markup = countries
    .map((country) => {
      return `<li>
      <p>
      <b>Flags</b>: <img class="flag" src=" ${country.flags.svg}" alt="flag" width=200><b>Name</b>: 
      ${country.name}
      </p>
      </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
} else if (countries.length > 10) {
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
          array.push(key.name);
          console.log(key.name);
          
          
        }
        return `<li>
           <p><b>Name</b>: ${country.name}</p>
           <p><b>Population</b>: ${country.population}</p>
           <p><b>Flags</b>:<img class="flag" src=" ${country.flags.svg}" alt="flag" width=200></p>
           <p><b>languages</b>: ${array}</p>
         </li>`;
      })
      .join("");
    countryList.innerHTML = markup;
      
    } 
}

