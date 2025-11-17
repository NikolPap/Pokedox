function searchPokemon() {
  const query = document.getElementById("search").value.toLowerCase();
  const loadBtn = document.getElementById("load_more");

  if (query.trim() === "") {
    loadBtn.style.display = "block";
  } else {
    loadBtn.style.display = "none";
  }

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().startsWith(query)
  );

  renderSearchResults(filtered);
}

function renderSearchResults(filteredList) {
  let gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  if (filteredList.length === 0) {
    gallery.innerHTML = `
      <div class="no-results">
        <h2>Uuuups, nothing found 😢</h2>
      </div>
    `;
    return;
  }
  renderSearchContent(filteredList);
  renderSearchIcons(filteredList);
}

function renderSearchContent(filteredList) {
  filteredList.forEach((p) => {
    let realIndex = pokemons.indexOf(p);
    let mainType = p.types[0].type.name;
    let bgColor = typeColors[mainType] || "#777";

    gallery.innerHTML += getSearchContentTemplate(p, realIndex, bgColor);
  });
}

function renderSearchIcons(filteredList) {
  filteredList.forEach((p) => {
    let realIndex = pokemons.indexOf(p);
    let div = document.getElementById(`search_type_icons_${realIndex}`);
    div.innerHTML = "";

    p.types.forEach((t) => {
      let name = t.type.name;
      let color = typeColors[name];
      div.innerHTML += `
        <img style="background-color:${color}; border-radius:50%; width:20px; padding:5px"
             src="./assets/icons/${name}.svg">
      `;
    });
  });
}
