const dialogRef = document.getElementById("myDialog");

function openDialog(i, event, bgColor) {
  renderPokemonDIalog(i, bgColor);
  renderPokemonDIalogIcon(i);
  renderMainDialog(i);
  renderDialogNav(i);
  renderDialogButtons(i, bgColor);

  dialogRef.showModal();
  dialogRef.classList.add("opened");
}

function setActiveNavLink(tab) {
  const navLinks = document.querySelectorAll("#dialog_nav .nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const targetLink = {
    main: "main",
    stats: "stats",
    "evo-chain": "evo chain",
  }[tab];

  navLinks.forEach((link) => {
    if (link.textContent.toLowerCase() === targetLink) {
      link.classList.add("active");
    }
  });
}

function logDownWBubblingProtection(event) {
  event.stopPropagation();
}

dialogRef.addEventListener("click", (event) => {
  if (event.target === dialogRef) {
    closeDialog();
  }
});

function closeDialog() {
  dialogRef.close();
  dialogRef.classList.remove("opened");
}
