class Pokemon {
    constructor (id, name, img, height, weight, types, abilities) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.abilities = abilities;
    }
}

// Getting pokemon's id:
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id')

// This event is triggered when the HTML document has been loaded
document.addEventListener('DOMContentLoaded', () => getPokemon(id))

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

const setInfo = (data) => {
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    const img = data.sprites.other.dream_world.front_default;
    const types = []
    data.types.forEach(item => types.push(item.type.name))
    const abilities = []
    data.abilities.forEach(item => abilities.push(item.ability.name))

    const pokemon = new Pokemon(id, name, img, height, weight, types, abilities)
    pokemonCard(pokemon)
}

const pokemonCard = (pokemon) => {
    const img = document.querySelector('img');
    img.src = pokemon.img
    img.alt = pokemon.name


    const name = document.querySelector('h2');
    name.innerHTML = `${pokemon.name}`

    const types = document.querySelector('h3');
    types.innerHTML = pokemon.types.join(', ');

    const height = document.querySelectorAll('h4')[0];
    height.innerHTML = pokemon.height;

    const weight = document.querySelectorAll('h4')[1];
    weight.innerHTML = pokemon.weight;

    const abilities = document.querySelectorAll('h4')[2];
    abilities.innerHTML = pokemon.abilities.join(', ');
}