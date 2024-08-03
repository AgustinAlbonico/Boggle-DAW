"use strict";

var openButton = d.getElementById("open-menu-button");
var closeButton = d.getElementById("close-menu-button");
var menuLinks = d.getElementById("mobile-navbar-links");

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
