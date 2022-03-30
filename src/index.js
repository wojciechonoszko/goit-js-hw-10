// import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
});

function fetchUsers() {
  return fetch("https://restcountries.com/v3.1/all").then(
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
      return `<li>
          <p><b>Name</b>: ${user.name.official}</p>
          <p><b>Email</b>: ${user.capital}</p>
          <p><b>Company</b>: ${user.population}</p>
        </li>`;
    })
    .join("");
  userList.innerHTML = markup;
}

