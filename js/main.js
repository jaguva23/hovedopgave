"use strict";

//----------------https://dev.to/ljcdev/easy-hamburger-menu-with-js-2do0-------------------//
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});


//-----------------medlemmer i byrådet------------------------------//
async function fetchJson() {
  const url = "https://api.jsonbin.io/b/6142f99a9548541c29b2fa64/latest";

  const response = await fetch(url, {
    headers: {
      "X-Master-Key": "$2b$10$vGHTPb1qPoMnA5nd16KFXOh7e8LSw3f.wWjmqNPtcxfbWSXLgQWTS",
      "Content-Type": "application/json",
      'X-BIN-META': false
    }
  }); // fetch and wait the response
  let data = await response.json(); // read response body and wait for parsing the JSON
  appendMembers(data)
}

// Appending objects to the DOM
function appendMembers(members) {
  let html = "";
  for (let member of members) {
    console.log(member);
    html += /*html*/`
      <article class="politiker-kort">
        <img src="${member.img}"></img>
        <div class="politiker-kort-tekst">
        <h3>${member.name}</h3>
        <h3>${member.parti}</h3> 
        <img src="${member.partiImg}"></img>
        </div>
    </article>
        `;
  }
  document.querySelector("#medlemmer-container").innerHTML = html;
}

fetchJson();

