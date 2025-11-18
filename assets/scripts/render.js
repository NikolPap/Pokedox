function renderPokemon(number_of_pokemons) {
  let new_pokemon = document.getElementById("gallery");
  new_pokemon.innerHTML = "";
  for (let i = 0; i < number_of_pokemons; i++) {
    let mainType = pokemons[i].types[0].type.name;
    let bgColor = typeColors[mainType] || "#777";
    new_pokemon.innerHTML += getMainPokemonTemplate(i, bgColor);
  }
}

function renderPokemonIcon(number_of_pokemons) {
  for (let i = 0; i < number_of_pokemons; i++) {
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
  const dialogHeadline = (document.getElementById("dialog_headline").innerHTML = `<div class = "main_info">
        <span>#${pokemons[i].id}</span>
        <span>${pokemons[i].name.charAt(0).toUpperCase() + pokemons[i].name.slice(1)}</span> </div> <button
            class="close_button"
            aria-label="Close dialog"
            onclick="closeDialog(event)"
          >&times;</button>`);

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
  const pokemonsInfoRef = document.getElementById("pokemons_info");
  const statNames = ["hp","attack","defense","special-attack","special-defense","speed"];
  let statsHtml = "";
  for (let index = 0; index < statNames.length; index++) {
    statsHtml += `
      <div class="progress-wrapper${index === statNames.length - 1 ? " progress_end" : ""}">
        <div class="progress-title">${statNames[index]}</div>
        <div class="progress" role="progressbar" aria-valuenow="${pokemons[i].stats[index].base_stat}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width:${pokemons[i].stats[index].base_stat}%"></div>
        </div>
      </div>
    `;
  }
  pokemonsInfoRef.innerHTML = getDialogStatsTemplate(statsHtml);
}

function renderMainDialog(i) {
  const pokemonsInfoRef = document.getElementById("pokemons_info");
  pokemonsInfoRef.innerHTML = ""; 
  pokemonsInfoRef.innerHTML = getDialogMainTemplate(i);
}

function renderDialogButtons(i, bgColor) {
 
  const btbRef = document.getElementById("arrow_buttons");
  btbRef.innerHTML = getDialogsButtonSection(i, bgColor);
    let previous_buttonRef= document.getElementById("previous_pokemon");
    let next_button = document.getElementById("next_pokemon")
   if(i===0) {
    previous_buttonRef.style.display="none";
  }else{
     previous_buttonRef.style.display="block";
  }
  
  if(i == pokemons.length -1) {
    next_button.style.display= "none";
  }else {
   next_button.style.display= "block";
  }
}

async function getMainEvolutionChain(pokemonIndex) {
  const evoChainResponse = await fetch(
    pokemons[pokemonIndex].species.evolution_chain.url 
  );
  const evoChainData = await evoChainResponse.json();
  const evolutions = [];
  let current = evoChainData.chain;
  while (current) {
    evolutions.push(current.species.name);
    current = current.evolves_to[0] || null;
  }
  return evolutions;
}

async function displayEvoChainImages(evoNames) {
  const evoChainDiv = document.getElementById("pokemons_info"); 
  evoChainDiv.innerHTML = "";

  for (const name of evoNames) {
    try {
      const pokeResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokeData = await pokeResponse.json();
      const imageUrl = pokeData.sprites.other.dream_world.front_default;
      evoChainDiv.innerHTML += `<img src="${imageUrl}" alt="${name}" style="width:75px; margin:5px; padding-top:40px; padding-bottom:40px;">`;
    } catch (error) {
      console.error(`Error fetching Pokémon ${name}:`, error);
    }
  }
}


async function renderEvoChainDialog(i) {
  const evoNames = await getMainEvolutionChain(i);
  await displayEvoChainImages(evoNames);
}
