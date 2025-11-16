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

async function getAllPokemons(path) {
  let response = await fetch(BASE_URL + path);
  return (responseToJson = await response.json());
}

function init() {
  loadSpinner("load_more", "load_less");
  loadData();
}

async function getPokemon(offset, number_of_pokemons) {
  for (let index = offset; index <= number_of_pokemons; index++) {
    const pokemonData = await fetchPokemon(index);
    pokemons.push(pokemonData);
  }
}

async function fetchPokemon(index) {
  const pokemonResponse = await getAllPokemons(`/${index}/`);
  console.log(pokemonResponse)
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
  };
}

async function fetchPokemon(index) {
  const pokemonResponse = await getAllPokemons(`/${index}/`);
  

  const speciesResponse = await fetch(pokemonResponse.species.url);
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
}

async function loadData() {
  await getPokemon(1, number_of_pokemons);
  renderPokemon(20);
  renderPokemonIcon(20);
}

async function loadSpinner(id1, id2) {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 6000));

  spinner.style.display = "none";
  document.getElementById("gallery").style.display = "flex";
  document.getElementById(`${id1}`).style.display = "block";
  document.getElementById(`${id2}`).style.display = "none";
}
