async function loadMore() {
  loadSpinner("load_less", "load_more");
  number_of_pokemons += 20;

  document.getElementById("gallery").style.display = "none";
  document.getElementById("load_more").style.display = "none";

  await getPokemon(number_of_pokemons - 19, number_of_pokemons);

  renderPokemon(pokemons.length);
  renderPokemonIcon(pokemons.length);
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
function previousPokemon(i, bgColor) {
  const newIndex = i - 1;
  if (newIndex < 0) return; 
  openDialog(newIndex, null, bgColor); 
}

function nextPokemon(i, bgColor) {
  const newIndex = i + 1;
  if (newIndex >= pokemons.length) return; 
  openDialog(newIndex, null, bgColor);
}