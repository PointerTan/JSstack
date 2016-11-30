window.onload = function() {
  console.log("page loaded");
  makeCartScrollNicely();
}

function makeCartScrollNicely() {
  var cart = document.querySelector(".cart");
  Ps.initialize(cart, {
    scrollXMarginOffset: "100"
  });
}