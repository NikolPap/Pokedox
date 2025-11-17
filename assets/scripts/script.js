let pokemons = [];
let number_of_pokemons = 20;

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";



function showError(message) {
  const box = document.getElementById("error-box");
  box.innerText = message;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 4000);
}



async function getAllPokemons(path) {
  try {
    const response = await fetch(BASE_URL + path);
    if (!response.ok) throw new Error(`API Error ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("getAllPokemons:", error);
    showError("Fehler beim Laden der Pokémon-Daten.");
    return null;
  }
}



async function getPokemon(offset, number) {
  try {
    const ids = [];
    for (let i = offset; i <= number; i++) ids.push(i);

    const requests = ids.map((id) => fetchPokemon(id));

    const results = await Promise.all(requests);

    pokemons = [...pokemons, ...results.filter((p) => p !== null)];

  } catch (error) {
    console.error("getPokemon:", error);
    showError("Fehler beim Laden mehrerer Pokémon.");
  }
}


async function fetchPokemon(index) {
  try {
    const pokemonResponse = await getAllPokemons(`/${index}/`);
    if (!pokemonResponse) return null;

    const speciesResponse = await fetch(pokemonResponse.species.url);
    if (!speciesResponse.ok) throw new Error("Species info failed");
    const speciesData = await speciesResponse.json();

    return {
      id: pokemonResponse.id,
      name: pokemonResponse.name,
      image: pokemonResponse.sprites.other.dream_world.front_default,
      types: pokemonResponse.types,
      height: pokemonResponse.height,
      weight: pokemonResponse.weight,
      base_experience: pokemonResponse.base_experience,
      abilities: pokemonResponse.abilities,
      stats: pokemonResponse.stats,
      species: speciesData,
    };
  } catch (error) {
    console.error(`fetchPokemon ${index}:`, error);
    return null;
  }
}



function showSkeleton(count) {
  const container = document.getElementById("gallery");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    container.innerHTML += `
      <div class="skeleton-card"></div>
    `;
  }
}


async function loadData() {
  showSkeleton(20);

  try {
    await getPokemon(1, number_of_pokemons);

    renderPokemon(20);
    renderPokemonIcon(20);
  } catch (error) {
    console.error("loadData:", error);
    showError("Beim Laden ist etwas schiefgelaufen..");
  }
}



async function loadSpinner(showBtn, hideBtn) {

    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    spinner.style.display = "none";
    document.getElementById("gallery").style.display = "flex";
    document.getElementById(showBtn).style.display = "block";
    document.getElementById(hideBtn).style.display = "none";
 
}

function init() {
  loadSpinner("load_more", "load_less");
  loadData();
}