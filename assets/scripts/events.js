
async function loadMore() {
   loadSpinner("load_less", "load_more");
  number_of_pokemons = 40;
 
  document.getElementById("gallery").style.display = "none";
  document.getElementById("load_more").style.display= "none";
 
 await  getPokemon(21, number_of_pokemons);
   renderPokemon(40);
  renderPokemonIcon(40)
 }

 async function loadLess() {
   loadSpinner("load_more", "load_less");
  pokemons.length= 20;
 
  document.getElementById("gallery").style.display = "none";
  document.getElementById("load_less").style.display= "none";
 
   renderPokemon(20);
  renderPokemonIcon(20)
 }


function openMainDialog(i) {
  renderMainDialog(i);
  setActiveNavLink('main');
}

function openStatsDialog(i) {
  renderDialogStats(i);
  setActiveNavLink('stats');
}

function openEvoChainDialog(i) {
  renderEvoChainDialog(i);
  setActiveNavLink('evo-chain');
}