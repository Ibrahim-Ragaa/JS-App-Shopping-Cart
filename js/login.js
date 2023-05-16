let email = document.querySelector("#email");
let passWord = document.querySelector("#password");

let loginButton = document.querySelector("#sign_in");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginButton.addEventListener("click", login);

function login(e) {
  e.preventDefault();
  if (email.value === "" || passWord.value === "") {
    alert("Please Fill Data");
  } else {
    if (
      getEmail &&
      getEmail.trim() === email.value.trim() &&
      getPassword &&
      getPassword === passWord.value
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("Please Fill Right Data");
    }
  }
}
