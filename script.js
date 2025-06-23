const poke_link = 'https://pokeapi.co/api/v2/pokemon/';
let page = 0;
const limit = 20;

async function fetchPokemon(key) {
  try {
    const cachedByName = localStorage.getItem(key);
    const cachedById = localStorage.getItem(Number(key));
    if (cachedByName) return JSON.parse(cachedByName);
    if (cachedById) return JSON.parse(cachedById);

    const response = await fetch(poke_link + key);
    const data = await response.json();
    const pokemon = {
      name: data.name,
      id: data.id,
      attr1: data.types[0]?.type.name ?? null,
      attr2: data.types[1]?.type.name ?? null,
      img: data.sprites.front_default,
    };

    localStorage.setItem(data.id, JSON.stringify(pokemon));
    localStorage.setItem(data.name.toLowerCase(), JSON.stringify(pokemon));

    return pokemon;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
}

function renderPokemonCard(pokemon) {
  const container = document.getElementById('pokemon-list');
  const div = document.createElement('div');
  div.className = 'pokemon-card';
  div.innerHTML = `
	  <img src="${pokemon.img}" class="pokemon-img" />
	  <div class="pokemon-info">
		<p class="pokemon-id">#${String(pokemon.id)}</p>
		<h3 class="pokemon-name">${pokemon.name}</h3>
		<p class="pokemon-type">${pokemon.attr1}${pokemon.attr2 ? ' / ' + pokemon.attr2 : ''}</p>
	  </div>
	`;
  container.appendChild(div);
}

async function loadPokemons(direction) {
  if (direction === 'prev' && page > 0) {
    page--;
    if (page === 0) {
      document.getElementById('prev').style.display = 'none';
    }
  }
  if (direction === 'next') {
    page++;
    document.getElementById('prev').style.display = 'inline-block';
  }
  document.getElementById('pokemon-list').innerHTML = '';
  for (let i = page * limit + 1; i <= page * limit + limit; i++) {
    fetchPokemon(i)
      .then((pokemon) => {
        if (pokemon) {
          renderPokemonCard(pokemon);
        }
      })
      .catch((error) => console.error('Error rendering Pokemon card:', error));
  }
}

async function searchPokemon() {
  const keyword = document.getElementById('search-input').value.trim().toLowerCase();
  if (!keyword) return;

  try {
    const pokemon = await fetchPokemon(keyword);
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }

    document.getElementById('pokemon-list').innerHTML = '';
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('home').style.display = 'inline-block';

    renderPokemonCard(pokemon);
  } catch (err) {
    alert('Không tìm thấy Pokemon!');
  }
}

function backToHome() {
  document.getElementById('pokemon-list').innerHTML = '';
  page = 0;
  loadPokemons('prev');
  document.getElementById('home').style.display = 'none';
  document.getElementById('prev').style.display = 'none';
  document.getElementById('next').style.display = 'inline-block';
}

function pressEnterSearch(e) {
  if (e.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
}

document.getElementById('prev').addEventListener('click', () => loadPokemons('prev'));

document.getElementById('next').addEventListener('click', () => loadPokemons('next'));

document.getElementById('title').addEventListener('click', () => backToHome());

document.getElementById('home').addEventListener('click', () => backToHome());

document.getElementById('search-btn').addEventListener('click', searchPokemon);

document.getElementById('search-input').addEventListener('keypress', pressEnterSearch);

document.getElementById('prev').style.display = 'none';
loadPokemons('prev');
document.getElementById('home').style.display = 'none';
