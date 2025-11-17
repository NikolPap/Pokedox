async function loadMore() {
  loadSpinner("load_less", "load_more");
  number_of_pokemons = number_of_pokemons + 20;

  document.getElementById("gallery").style.display = "none";
  document.getElementById("load_more").style.display = "none";

  await getPokemon(number_of_pokemons - 19, number_of_pokemons);
  renderPokemon(number_of_pokemons);
  renderPokemonIcon(number_of_pokemons);
}

function openMainDialog(i) {
  renderMainDialog(i);
  setActiveNavLink("main");
}

function openStatsDialog(i) {
  renderDialogStats(i);
  setActiveNavLink("stats");
}

function openEvoChainDialog(i) {
  renderEvoChainDialog(i);
  setActiveNavLink("evo-chain");
}

function previousPhoto(i, bgColor) {
  i = i - 1;
  if ((i = 0)) {
    document.getElementById("previous_pokemon").style.display = "none";
  } else {
    document.getElementById("previous_pokemon").style.display = "none";
  }
  openDialog(i, bgColor);
}

function forwardPhoto(i, bgColor) {
  i = i + 1;
  openDialog(i, bgColor);
}
