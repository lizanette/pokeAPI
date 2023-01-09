class Pokemon {
    constructor (id, name, img) {
        this.id = id;
        this.name = name;
        this.img = img;
    }
}

const row = document.querySelector(".row");
const prev = document.getElementById("previous");
const next = document.getElementById("next");

// Pagination:
// We show the first 10 pokemons
let from = 1;
let to = 9;

console.log(window.location.pathname)

prev.addEventListener('click', () => {
    if (from > 1) {
        from -= 10; // Getting the 10 previous pokemons
        removeData(row); // Deleting current pokemons
        getData(from, to);
    }
});

next.addEventListener('click', () => {
    from += 10; // Getting the 10 next pokemons
    removeData(row); // Deleting current pokemons
    getData(from, to)
});

// This event is triggered when the HTML document has been loaded
document.addEventListener('DOMContentLoaded', () => getData(from, to))

// Retrieving information:
const getPokemon = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await res.json()
        setInfo(data);
    } catch (error) {
        console.log(error)
    }
}

const getData = (from, to) => {
    for (let i = from; i <= to + from; i++)
        getPokemon(i);
}

const setInfo = (data) => {
    const pokemon = new Pokemon(data.id, data.name, data.sprites.front_default)
    pokemonCard(pokemon)
}

const pokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'card')
    
    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = pokemon.name;
    img.classList.add('card-img-top');

    const card_body = document.createElement('div');
    card_body.classList.add('card-body');

    const name = document.createElement('h5');
    name.classList.add('card-title');
    name.textContent = pokemon.name;

    const id = document.createElement('h6');
    id.classList.add('card-subtitle', 'text-muted', 'mb-2');
    id.textContent = '#' + pokemon.id;

    card_body.appendChild(id)
    card_body.appendChild(name)


    card.appendChild(img);
    card.appendChild(card_body);

    row.appendChild(card)

    card.addEventListener('click', () => {
        window.location.href = 'card.html?id=' + pokemon.id;  
    })
}

// Deleting current pokemons to show the new ones:
const removeData = (row) => {
    while(row.hasChildNodes()) {
        row.removeChild(row.firstChild);
    }
};


