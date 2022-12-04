import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { PokemonList, Pokemon } from '../interfaces/typing';

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList>();
  const [pokemonData, setPokemonData] = useState<Pokemon[]>();
  const [errorMsg, setErrorMsg] = useState<string>();

  // Get all pokemons and change endpoint offset param for pagination
  const getPokemons = async (url: string = "", limit: number = 15) => {
    let uri = url === "" ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0` : url;
    return await fetch(uri).then(response => {
        return response.json();
    }).catch(() => {
        setErrorMsg('Geen resultaten');
        return null;
    });
  }

  // Set pokemon list using getPokemons
  useEffect(() => {
      const fetchPokeList = async () => {
          const pokemonList: PokemonList = await getPokemons();
          setPokemonList(pokemonList);
      };

      fetchPokeList();
  }, []);

  // Pagination
  const paginateList = async (direction) => {
    switch(direction) {
      case 'previous':
        const pokemonPrevious: PokemonList = await getPokemons(pokemonList.previous);
        setPokemonList(pokemonPrevious);
        break;
      case 'next':
        const pokemonNext: PokemonList = await getPokemons(pokemonList.next);
        setPokemonList(pokemonNext);
        break;
      default:
        return;
    }
  }

  // Get pokemon details based off the pagination request
  useEffect(() => {
    const fetchPokeData = async () => {
      const data: Pokemon[] = [];
      if (!pokemonList || !pokemonList.results) return;
      for (let i = 0; i < pokemonList?.results.length; i++) {
        const pokemon = await getPokemons(pokemonList.results[i].url);
        data.push(pokemon);
      }
      setPokemonData(data);
    };

    fetchPokeData();
  }, [pokemonList]);

  // Search specific pokemons
  const searchPokemon = async (input) => {
    input.preventDefault();
    const pokemonName = JSON.stringify(input.target.pokemon.value).toLowerCase().replaceAll('"', '');

    if (!pokemonName) return;
    const getPokemon: Pokemon = await getPokemons(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    setPokemonData([getPokemon]);
  }

  if (pokemonList && pokemonData) return (
    <div className="container mx-auto max-w-xl p-5 bg-white rounded shadow md:mt-10">
      <div className="text-lg font-bold text-black mb-5">Pokédex</div>
      <form className="mb-5 flex" onSubmit={searchPokemon}>
          <input className="custom-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" name="pokemon" placeholder="Zoek een pokémon" required/>
          <button className="font-bold border p-1 ml-1 hover:bg-slate-600 rounded disabled:opacity-50 text-white bg-black px-3" type="submit">Zoek</button>
      </form>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        { !errorMsg && pokemonData ? 
           pokemonData.map((pokemon: Pokemon, i: number) => {
            return <Card pokemon={pokemon} key={i} />;
          }) : 
          <div className="text-black"> {errorMsg} </div>
        }
      </div>
      <div className="text-lg font-bold text-black mt-5">
        <button className="border p-2 mr-3 hover:bg-slate-200 rounded disabled:opacity-50" disabled={!pokemonList.previous} onClick={() => paginateList('previous')}>Terug</button>
        <button className="border p-2 mr-3 hover:bg-slate-200 rounded disabled:opacity-50" disabled={!pokemonList.next} onClick={() => paginateList('next')}>Volgende</button>
      </div>  
    </div>
  )
}

export default Home;