document.addEventListener("DOMContentLoaded", function () {
  const slajdovi = document.querySelectorAll(".slajd");
  let trenutniBrojac = 0;
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    function prikaziSledeciSlajd() {
      slajdovi[trenutniBrojac].classList.remove("aktivan");
      trenutniBrojac = (trenutniBrojac + 1) % slajdovi.length;
      slajdovi[trenutniBrojac].classList.add("aktivan");
    }

    setInterval(prikaziSledeciSlajd, 5000);
  }
});

let hamburgerMeni = document.querySelector(".hamb-meni");
let navigacioniMeni = document.querySelector(".navigacioni-meni");

hamburgerMeni.addEventListener("click", function () {
  if (hamburgerMeni.classList.contains("otvoren")) {
    hamburgerMeni.classList.remove("otvoren");
    navigacioniMeni.classList.remove("otvoren");
    document.body.style.overflow = "auto";
  } else {
    hamburgerMeni.classList.add("otvoren");
    navigacioniMeni.classList.add("otvoren");
    document.body.style.overflow = "hidden";
  }
});

const forma = document.querySelector("form");

if (forma) {
  forma.addEventListener("submit", function (e) {
    const datumRezervacije = document.getElementById("datum").value;
    const vremeRezervacije = document.getElementById("vreme").value;
    let trenutniDatumIVreme = new Date();
    const danasnjiDatum = trenutniDatumIVreme.toISOString().split("T")[0];
    let trenutnoVreme = trenutniDatumIVreme
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);

    document.getElementById("datum").setCustomValidity("");
    document.getElementById("vreme").setCustomValidity("");

    if (datumRezervacije < danasnjiDatum) {
      document
        .getElementById("datum")
        .setCustomValidity("Datum rezervacije ne može biti u prošlosti.");
    } else if (
      datumRezervacije === danasnjiDatum &&
      vremeRezervacije < trenutnoVreme
    ) {
      document
        .getElementById("vreme")
        .setCustomValidity(
          "Vreme rezervacije za danas ne može biti u prošlosti."
        );
    }
    // Proverava da li je forma ispravno pupunjena
    if (!this.checkValidity()) {
      e.preventDefault();
      alert("Morate popunit formu ispravno!");
    } else {
      alert("Rezervacija je uspesno poslata i zabelezena!");
    }
  });
}

const vreme = document.getElementById("vreme");

if (vreme) {
  // Dodajemo dodatni event listener za promenu vremena
  vreme.addEventListener("input", function () {
    const datumRezervacije = document.getElementById("datum").value;
    const vremeRezervacije = this.value;
    let trenutniDatumIVreme = new Date();
    const danasnjiDatum = trenutniDatumIVreme.toISOString().split("T")[0];
    let trenutnoVreme = trenutniDatumIVreme
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);

    if (
      datumRezervacije === danasnjiDatum &&
      vremeRezervacije < trenutnoVreme
    ) {
      this.setCustomValidity(
        "Vreme rezervacije za danas ne može biti u prošlosti."
      );
    } else {
      this.setCustomValidity("");
    }
  });
}
