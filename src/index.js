// import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");
const input = document.querySelector('input').value;

input.addEventListener('input', doThing());

function doThing(){
  console.log('Horray! Someone wrote "' + input + '"!"')
}
console.log(input)

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
});



const searchParams = input;

function fetchUsers() {
  return fetch(`https://restcountries.com/v3.1/name/${searchParams}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUserList(users) {
  const markup = users
    .map((user) => {
      // user = document.querySelector("input[type='text']").content
      return `<li>
          <p><b>Name</b>: ${user.name.official}</p>
          <p><b>Capital</b>: ${user.capital}</p>
          <p><b>Population</b>: ${user.population}</p>
          <p><b>Flags</b>: ${user.flags.svg}</p>
          <p><b>languages</b>: ${user.languages}</p>
        </li>`;
    })
    .join("");
  userList.innerHTML = markup;
}

