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
      <div onclick="showMember(${member.id})">
        <img src="${member.img}"></img>
        <div class="poltiker-kort-titel-logo">
        <div class="politiker-kort-tekst">
        <h3>${member.name}</h3>
        <p class="small-text">${member.parti}</p> 
        </div>
        <img src="${member.partiImg}"></img>
        </div>
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



function showMember(id) {
  const memberToShow = _members.find((member) => member.id === id);
  navigateTo("#/medlemsprofil");
  console.log(memberToShow.name);
  document.querySelector("#member-details-container").innerHTML = /*html*/ `
    <div class="breadcrump"> <a href ="#/" class="small-text">Forside</a> <span class="material-icons-outlined">
    chevron_right
    </span> <a href ="#/medlemmer" class="small-text">Medlemmer</a> <span class="material-icons-outlined">
      chevron_right
      </span> <p class="small-text">${memberToShow.name}</p> </div>
      <article class="medlemsprofil">
      <div class="member-profile-container">
      <div class ="member-profile-pic">
    <img class="member-img" src="${memberToShow.img}">
    <img class="parti-img" src="${memberToShow.partiImg}">
    </div>
    <div class="member-profile-titles">
      <div class="member-profile-titles-text">
      <h1>${memberToShow.name}</h1>
      <p class ="xsmall-text">${memberToShow.parti}</p>
      </div>
      <button class="abonner-btn">Abonner</button>
    </div>
    </div>
    <div class="accordions-container">
    <button onclick="openAcc()" class="accordion">Titel</button>
<div class="panel">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
    </div>
    </article>
  `;
}

function openAcc() {
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}





