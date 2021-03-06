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

async function initializeSite() {
  await fetchMembers();
  appendMembers(_members);
}

initializeSite();

async function fetchMembers() {
  const url = "https://api.jsonbin.io/b/6142f99a9548541c29b2fa64/latest";
  const response = await fetch(url, {
    headers: {
      "X-Master-Key": "$2b$10$vGHTPb1qPoMnA5nd16KFXOh7e8LSw3f.wWjmqNPtcxfbWSXLgQWTS",
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  _members = data;
}


// Appending medlemmer til DOMen
function appendMembers(members) {
  let html = "";
  for (let member of members) {
    html += `
      <article class="politiker-kort">
      <div onclick="showMember(${member.id})">
        <img src="${member.img}" class="poltiker-img" alt="Billede af ${member.name}" ></img>
        <div class="poltiker-kort-titel-logo">
        <div class="politiker-kort-tekst">
        <h3>${member.name}</h3>
        <p class="small-text">${member.titel}, ${member.parti}</p>
        </div>
        <img src="${member.partiImg}" alt="Billede af ${member.parti} logo"></img>
        </div>
        </div>
        </article>
        `;
  }
  document.querySelector("#medlemmer-container").innerHTML = html;
}



function search(value) {
  value = value.toLowerCase();

  let results = [];
  let members = _members;

  for (const member of members) {
    let memberName = member.name.toLowerCase();
    if (memberName.includes(value)) {
      results.push(member);
    }
  }
  appendMembers(results);
}


function filterParti(parti) {
  if (parti === "Byrådet") {
      appendMembers(_members);
      displayFilter();
  } else {
      const results = _members.filter(member => member.parti === parti);
      appendMembers(results);
      displayFilter(parti);
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
  displayFilter(udvalg);
}

function resetFilter() {
  appendMembers(_members);
  displayFilter();
}

function displayFilter(filter) {
  if(filter === "Byrådet") {
    resetFilter()
  } else {
    document.querySelector("#selected-filter").innerHTML = filter ? `i ${filter}` :"";
  }
}



function showMember(id) {
  const memberToShow = _members.find((member) => member.id === id);
  navigateTo("#/medlemsprofil");
  document.querySelector("#member-details-container").innerHTML = /*html*/ `
    <div class="breadcrump"> <a href ="#/" class="small-text">Forside</a> <span class="material-icons-outlined">
    chevron_right
    </span> <a href ="#/medlemmer" class="small-text">Medlemmer</a> <span class="material-icons-outlined">
      chevron_right</span> <p class="small-text">${memberToShow.name}</p> </div>
      <article class="medlemsprofil">
      <div class="member-profile-container">
      <div class ="member-profile-pic">
    <img class="member-img" src="${memberToShow.img}" alt="Billede af ${memberToShow.name}">
    <img class="parti-img" src="${memberToShow.partiImg}" alt="Billede af ${memberToShow.parti} logo">
    </div>
    <div class="member-profile-titles">
      <div class="member-profile-titles-text">
      <h1 class="member-profile-name">${memberToShow.name}</h1>
      <p class ="small-text">${memberToShow.titel},</p>
      <p class ="small-text">${memberToShow.parti}</p>
      </div>
      <button class="abonner-btn">Abonner</button>
    </div>
    </div>
    <p class="member-bio">${memberToShow.bio}</p>
    <div class="accordions-container">
        <div class="accordion-item">
          <button onclick="toggleAcc(this)" class="accordion">Medlem af</button>
            <div class="panel">
              <div class ="panel-item-container">
              <p class="panel-item">${memberToShow.udvalg[0]}</p>
              <p class="panel-item">${memberToShow.udvalg[1]}</p>
              <p class="panel-item">${memberToShow.udvalg[2]}</p>
              </div>
            </div>
        </div>

        <div class="accordion-item">
          <button onclick="toggleAcc(this)" class="accordion">Mødedeltagelse</button>
            <div class="panel">
              <div class ="panel-item-container">
                <div class="panel-item-flex"> <p class="panel-item">05.04.22 &nbsp; Byrådet</p> <p class="panel-item">Deltog</p></div>
                <div class="panel-item-flex"> <p class="panel-item">03.04.22 &nbsp; Børne- og ungeudvalget</p> <p class="panel-item">Fraværende</p></div>
                <div class="panel-item-flex"> <p class="panel-item">07.03.22 &nbsp; Økonomiudvalget</p> <p class="panel-item">Deltog</p></div>
                <div class="panel-item-flex"> <p class="panel-item">Se alle</p> <p class="panel-item"><span class="material-icons">
                chevron_right
                </span></p></div>
              </div>
            </div>
        </div>

        <div class="accordion-item">
          <button onclick="toggleAcc(this)" class="accordion">Seneste forslag</button>
            <div class="panel">
              <div class ="panel-item-container">
              <div class="panel-item-flex"> <p class="panel-item">05.04.22 &nbsp; Byrådet</p> <p class="panel-item">Tillægsforslag</p></div>
              <div class="panel-item-flex"> <p class="panel-item">05.04.22 &nbsp; Byrådet</p> <p class="panel-item">Ændringsforslag</p></div>
              <div class="panel-item-flex"> <p class="panel-item">07.03.22 &nbsp; Økonomiudvalget</p> <p class="panel-item">Tillægsforslag</p></div>
              <div class="panel-item-flex"> <p class="panel-item">Se alle</p> <p class="panel-item"><span class="material-icons">
              chevron_right
              </span></p></div>
              </div>
            </div>
        </div>

        <div class="accordion-item">
          <button onclick="toggleAcc(this)" class="accordion">Afgivne stemmer</button>
            <div class="panel">
              <div class ="panel-item-container">
              <div class="panel-item-flex"> <p class="panel-item">05.04.22 &nbsp; Byrådet</p> <p class="panel-item">Antal: 22</p></div>
              <div class="panel-item-flex"> <p class="panel-item">21.03.22 &nbsp; Børne- og ungeudvalget</p> <p class="panel-item">Antal: 7</p></div>
              <div class="panel-item-flex"> <p class="panel-item">07.03.22 &nbsp; Økonomiudvalget</p> <p class="panel-item">Antal: 15</p></div>
              <div class="panel-item-flex"> <p class="panel-item">Se alle</p> <p class="panel-item"><span class="material-icons">
              chevron_right
              </span></p></div>
              </div>
            </div>
        </div>

        <div class="accordion-item">
          <button onclick="toggleAcc(this)" class="accordion">På talerlisten</button>
            <div class="panel">
              <div class ="panel-item-container">
              <div class="panel-item-flex"> <p class="panel-item">05.04.22 &nbsp; Byrådet</p> <p class="panel-item">Punkt 3</p></div>
              <div class="panel-item-flex"> <p class="panel-item">21.03.22 &nbsp; Børne- og ungeudvalget</p> <p class="panel-item">Punkt 5</p></div>
              <div class="panel-item-flex"> <p class="panel-item">07.03.22 &nbsp; Økonomiudvalget</p> <p class="panel-item">Punkt 11</p></div>
              <div class="panel-item-flex"> <p class="panel-item">Se alle</p> <p class="panel-item"><span class="material-icons">
              chevron_right
              </span></p></div>
              </div>
            </div>
        </div>

      <div class="some-channels-container"> 
      <h3 class="open-sans-heading">Sociale medier</h3>
        <div class="accordion-item">
        <div class="some-container">
             <div class="member-some-content">
              <img class="member-some-img" src="${memberToShow.img}" alt="Billede af ${memberToShow.name}">
             <div class="member-some-tekst-container">
              <p class="xsmall-text">${memberToShow.name}</p>
              <p class="xsmall-text">3772 synes godt om</p>
             </div>
             </div>
             <img src="img/icons8-facebook.svg" alt="facebook logo">
          </div>
      </div>
    </div>

    <div class="some-item accordion-item">
        <div class="some-container">
             <div class="member-some-content">
              <img class="member-some-img" src="${memberToShow.img}" alt="Billede af ${memberToShow.name}">
             <div class="member-some-tekst-container">
              <p class="xsmall-text">${memberToShow.name}</p>
              <p class="xsmall-text">2423 følgere</p>
             </div>
             </div>
             <img src="img/icons8-instagram.svg" alt="facebook logo">
          </div>
      </div>
    </div>
    </div>
    </article>
  `;
  window.scrollTo(0, 0);
}


//-----------------https://stackoverflow.com/questions/61585166/accordion-with-pure-javascript-only-work-with-double-click--------//
function toggleAcc(item) {
  item.classList.toggle("active");
  let panel = item.nextElementSibling;
  if(panel!==null) {
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
  return false
}


