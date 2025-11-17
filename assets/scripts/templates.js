function getMainPokemonTemplate(i, bgColor) {
  return `<button style="background-color: ${bgColor};" class="open_dialog_button box_shadow" tabindex="1" onclick="openDialog(${i}, event, '${bgColor}')">
     <div class="main_info">
        <span>#${pokemons[i].id}</span>
        <span>${pokemons[i].name.charAt(0).toUpperCase() + pokemons[i].name.slice(1)}</span>
     </div>
     <img class="main-image" src="${pokemons[i].image}" alt="${pokemons[i].name} image">
     <div id="type_icons_${i}" class="type_icons"></div>
  </button>`;
}

function getSearchContentTemplate(p, index, bgColor) {
  return `
      <button style="background-color:${bgColor};" class="open_dialog_button box_shadow" onclick="openDialog(${index}, event, '${bgColor}')">
        <div class="main_info">
            <span>#${p.id}</span>
            <span>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
        </div>
        <img class="main-image" src="${p.image}">
        <div id="search_type_icons_${index}" class="type_icons"></div>
      </button>
    `;
}

function getPokemonDialogTemplate(i,bgColor) {
  return `
     
     <div  style="background-color: ${bgColor};"  class="open_dialog_button box_shadow">
     <img  class="main-image-dialog"   src= "${pokemons[i].image}" alt = "${
    pokemons[i].name
  } image">
     <div id="type_icons_dialog_${i}" class="type_icons_dialog"></div>
     </div>

     `
}

function getDialogMainTemplate(i) {
  const abilitiesList = pokemons[i].abilities
  .map(a => a.ability?.name)
  .join(", ");
  return `<table class="pokemon-stats">
  <tbody>
    <tr><td class="td_left td_start">Height</td><td class="td_start">:${pokemons[i].height}</td></tr>
    <tr><td class="td_left">Weight</td><td>:${pokemons[i].weight}kg</td></tr>
    <tr><td class="td_left">Base Experience</td><td>:${pokemons[i].base_experience}</td></tr>
    <tr><td class="td_left td_end">Abilities</td><td class="td_end td_wrap">:${
      pokemons[i].abilities.map(a => a.ability?.name).join(", ")
    }</td></tr>
  </tbody>
</table>`
}


function getDialogNavTemplate(i) {
  return `<a onclick="openMainDialog(${i})" class="nav-link nav_link_border active" aria-current="page" href="#">main</a>
        <a onclick="openStatsDialog(${i})" class="nav-link nav_link_border" href="#">stats</a>
        <a onclick="openEvoChainDialog(${i})" class="nav-link" href="#">evo chain</a>`
}


function getDialogStatsTemplate(i) {
  const statNames = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
  let html = "";
  
  for (let index = 0; index< statNames.length; index++) {
    html += `
      <div class="progress-wrapper${index === statNames.length - 1 ? ' progress_end' : ''}">
        <div class="progress-title">${statNames[index]}</div>
        <div class="progress" role="progressbar" aria-valuenow="${pokemons[i].stats[index].base_stat}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width:${pokemons[i].stats[index].base_stat}%"></div>
        </div>
      </div>`;
  }
  
  return html;
};