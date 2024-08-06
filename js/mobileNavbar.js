"use strict";

var openButton = d.getElementById("openMenuButton");
var closeButton = d.getElementById("closeMenuButton");
var menuLinks = d.getElementById("mobileNavbarLinks");

openButton.addEventListener("click", function() {
  openButton.classList.add("hidden");
  closeButton.classList.remove("hidden");
  menuLinks.classList.remove("hidden");
});

closeButton.addEventListener("click", function() {
  closeButton.classList.add("hidden");
  openButton.classList.remove("hidden");
  menuLinks.classList.add("hidden");
});
