function renderPokemon(number) {
  let new_pokemon = document.getElementById("gallery");
  new_pokemon.innerHTML = "";
  for (let i = 0; i < number; i++) {
    let mainType = pokemons[i].types[0].type.name;
    let bgColor = typeColors[mainType] || "#777";
    new_pokemon.innerHTML += getMainPokemonTemplate(i, bgColor);
  }
}

function renderPokemonIcon(number) {
  for (let i = 0; i < number; i++) {
    let typeIconsDiv = document.getElementById(`type_icons_${i}`);
    for (let index = 0; index < pokemons[i].types.length; index++) {
      let typeName = pokemons[i].types[index].type.name;
      let typeColor = typeColors[typeName] || "#777";
      typeIconsDiv.innerHTML += `<img style="background-color: ${typeColor}; border-radius: 50%; width:35px; padding:5px" class= "type_icon" src="./assets/icons/${typeName}.svg" alt="${typeName}">`;
    }
  }
}

function renderPokemonDIalog(i, bgColor) {
  const dialogImage = document.getElementById("open_dialog_image");
  const dialogHeadline = (document.getElementById(
    "dialog_headline"
  ).innerHTML = `<div class = "main_info">
        <span>#${pokemons[i].id}</span>
        <span>${
          pokemons[i].name.charAt(0).toUpperCase() + pokemons[i].name.slice(1)
        }</span> </div>`);

  dialogImage.innerHTML = getPokemonDialogTemplate(i, bgColor);
}

function renderPokemonDIalogIcon(i) {
  let typeIconsDiv = document.getElementById(`type_icons_dialog_${i}`);
  typeIconsDiv.innerHTML = "";

  for (let index = 0; index < pokemons[i].types.length; index++) {
    let typeName = pokemons[i].types[index].type.name;
    let typeColor = typeColors[typeName] || "#777";

    typeIconsDiv.innerHTML += `
      <img
        style="background-color: ${typeColor}; border-radius: 50%;width:35px;
        padding:5px"class="type_icons_dialog"
        src="./assets/icons/${typeName}.svg"
        alt="${typeName}">
    `;
  }
}

function renderDialogNav(i) {
  let dialogNavREf = document.getElementById("dialog_nav");
  dialogNavREf.innerHTML = "";

  dialogNavREf.innerHTML = getDialogNavTemplate(i);
}

function renderDialogStats(i) {
  let pokemonsInfoRef = document.getElementById("pokemons_info");
  pokemonsInfoRef.innerHTML = "";

  pokemonsInfoRef.innerHTML = getDialogStatsTemplate(i);
}

function renderMainDialog(i) {
  let pokemonsInfoRef = document.getElementById("pokemons_info");
  pokemonsInfoRef.innerHTML = "";

  pokemonsInfoRef.innerHTML += getDialogMainTemplate(i);
}




async function getMainEvolutionChain(pokemonIndex) {
  try {
    const evoChainResponse = await fetch(pokemons[pokemonIndex].species.evolution_chain.url);
    const evoChainData = await evoChainResponse.json();

    const evolutions = [];
    let current = evoChainData.chain;

    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0] || null;
    }

    return evolutions;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    return [];
  }
}


async function displayEvoChainImages(evoNames) {
  const evoChainDiv = document.getElementById("pokemons_info");
  evoChainDiv.innerHTML = "";

  for (const name of evoNames) {
    try {
      const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokeData = await pokeResponse.json();
      const imageUrl = pokeData.sprites.other.dream_world.front_default;
      evoChainDiv.innerHTML += `<img src="${imageUrl}" alt="${name}" style="width:100px; margin:5px;">`;
    } catch (error) {
      console.error(`Error fetching Pokémon ${name}:`, error);
    }
  }
}
async function renderEvoChainDialog(i) {
  const evoNames = await getMainEvolutionChain(i);
  await displayEvoChainImages(evoNames);
}