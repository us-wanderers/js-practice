let list_pokemons = []
const view = document.querySelector('.view')
const search_btn = document.querySelector('.submit-btn')

view.addEventListener("click", list_pokemon_information)
search_btn.addEventListener("click", find_pokemons)

async function init() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        list_pokemons = data.results;
        await generate_list(list_pokemons);
    } catch (e) {
        alert("" + e);
    }
}

async function generate_list(list_pokemons) {
    let html = "";

    for (const pokemon of list_pokemons) {
        try {
            const res = await fetch(pokemon.url);
            if (!res.ok) continue;

            const data = await res.json();
            const img_url = data.sprites.front_default;
            const id = data.id;

            html += `
            <div class="pokemon" id="${id}">
                <img src="${img_url}" alt="${data.name}">
            </div>`;
        } 
        catch (e) {
            console.error(e);
        }
    }

    view.innerHTML = html;
}

async function list_pokemon_information(event) {
    try {
        const target = event.target.closest('.pokemon');
        if (!target) return;
        const id = target.id;
        const url = list_pokemons[id - 1].url;
        let tmp = await fetch(url);
        const data = await tmp.json();
        const name = data.name;
        const height = data.height;
        const weight = data.weight;
        const img_url = data['sprites']['front_default'];
        document.querySelector(".name").innerHTML = name;
        document.querySelector(".height").innerHTML = height;
        document.querySelector(".weight").innerHTML = weight;
        document.querySelector(".pokemon-img").src = img_url;
    }
    catch (e) {
        console.error(e);
    }
}

function find_pokemons(event) {
    event.preventDefault();
    const name = document.querySelector(".search-input").value.toLowerCase();
    const filtered = list_pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name)
    );
    generate_list(filtered)
}
init()