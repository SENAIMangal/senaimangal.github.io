const btn = document.getElementById("contraste");
var img1 = document.querySelector("#mega");
var img2 = document.querySelector("#pory");

btn.addEventListener("click", function () {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    img1.setAttribute('src', './assets/img/zero.gif');
    img2.setAttribute('src', './assets/img/porygon2.gif');
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    img1.setAttribute('src', './assets/img/megaman.webp');
    img2.setAttribute('src', './assets/img/porygon.gif');
  }
});

  document.addEventListener("contextmenu", e => e.preventDefault());