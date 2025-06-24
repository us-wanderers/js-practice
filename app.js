let list_pokemons = []
const view = document.querySelector('.view')
document.querySelector('.submit-btn').addEventListener("click", find_pokemons)
document.querySelector('.footer').addEventListener("click", switch_page)
view.addEventListener("click", list_pokemon_information)

async function get_all_pokemons() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
        const data = await res.json();
        list_pokemons = data.results;
    } catch (e) {
        alert("".join(e));
    }
}

async function init() {
    try {
        await get_all_pokemons()
        const n_pokemons = list_pokemons.length
        const n_pages = n_pokemons / 20
        let html = ""
        for (let i = 1; i <= n_pages; i++) {
            html += `<div class="button" page_number="${i}">${i}</div>`
        }
        document.querySelector(".footer").innerHTML = html
        generate_list(list_pokemons, 0)
    }
    catch (e) {
        alert("".join(e))
    }
}

async function generate_list(list_pokemons, index) {
    let html = "";
    const start_index = index * 20
    for (let i = start_index; i < start_index + 20; i++) {
        try {
            const pokemon = list_pokemons[i];
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
    generate_list(filtered, 0)
}

function switch_page(event) {
    const target = event.target.closest('.button');
    if (!target) return;
    generate_list(list_pokemons, parseInt(target.innerHTML) - 1)
}   

init()