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
let _members = [];

async function initApp() {
  await fetchMembers();
  appendMembers(_members);
}

initApp();

async function fetchMembers() {
  const url = "https://api.jsonbin.io/b/6142f99a9548541c29b2fa64/latest";
  const response = await fetch(url, {
    headers: {
      "X-Master-Key": "$2b$10$vGHTPb1qPoMnA5nd16KFXOh7e8LSw3f.wWjmqNPtcxfbWSXLgQWTS",
      "Content-Type": "application/json",
      'X-BIN-META': false
    }
  });
  const data = await response.json();
  console.log(data);
  _members = data;
}


// Appending medlemmer til DOMen
function appendMembers(members) {
  let html = "";
  for (let member of members) {
    html += `
      <article class="politiker-kort">
        <img src="${member.img}"></img>
        <div class="poltiker-kort-titel-logo">
        <div class="politiker-kort-tekst">
        <h3>${member.name}</h3>
        <p class="small-text">${member.parti}</p> 
        </div>
        <img src="${member.partiImg}"></img>
        </div>
    </article>
        `;
  }
  document.querySelector("#medlemmer-container").innerHTML = html;
}


//search for user//
function search(value) {
  value = value.toLowerCase();

  let results = [];
  let members = _members;

  for (const member of members) {
    let model = member.name.toLowerCase();
    if (model.includes(value)) {
      results.push(member);
    }
  }
  appendMembers(results);
}


function filterParti(parti) {
  if (parti === "all") {
      appendMembers(_members);
  } else {
      const results = _members.filter(member => member.parti === parti);
      console.log(results);
      appendMembers(results);
  }
}


function filterUdvalg(udvalg) {
  let filteredMembers = [];
  let members = _members;
  for (let member of members) {
      if (member.udvalg.includes(udvalg)) {
          filteredMembers.push(member);
      }
  }
  appendMembers(filteredMembers);
}







  