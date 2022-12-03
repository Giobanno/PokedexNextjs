import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any>();
  const [pokemonData, setPokemonData] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<any>();

  // Get all pokemons and change endpoint offset param for pagination
  const getPokemons = async (url = "", limit = 15) => {
    let uri = url === "" ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0` : url;
    return await fetch(uri).then(response => {
        return response.json();
    }).catch((error) => {
        setErrorMsg('Geen resultaten');
        return null;
    });
  }

  useEffect(() => {
      const fetchPokeList = async () => {
          let pagination: any = await getPokemons();
          setPokemonList(pagination);
      };

      fetchPokeList();
  }, []);

  // Pagination
  const paginateList = async (direction: any) => {
    switch(direction) {
      case 'previous':
        const pokemonPrevious = await getPokemons(pokemonList.previous);
        setPokemonList(pokemonPrevious);
        break;
      case 'next':
        const pokemonNext = await getPokemons(pokemonList.next);
        setPokemonList(pokemonNext);
        break;
      default:
        return;
    }
  }

  // Get pokemon details based off the pagination request
  useEffect(() => {
    const fetchPokeData = async () => {
      let data: any[] = [];
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
  const searchPokemon = async (input: any) => {
    input.preventDefault();
    const pokemonName = JSON.stringify(input.target.pokemon.value).toLowerCase().replaceAll('"', '');

    if (!pokemonName) return;
    const getPokemon = await getPokemons(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    setPokemonData([getPokemon]);
  }

  if (pokemonList && pokemonData) return (
    <div className="container mx-auto max-w-xl p-5 bg-white rounded shadow">
      <div className="text-lg font-bold text-black mb-5">Pokédex</div>
      <form className="mb-5" onSubmit={searchPokemon}>
          <input className="rounded p-1 text-white pl-2" type="text" name="pokemon" placeholder="Zoek een pokémon" required/>
          <button className="font-bold border p-1 ml-1 hover:bg-slate-200 rounded disabled:opacity-50 text-black" type="submit">Zoek</button>
      </form>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        { !errorMsg && pokemonData ? 
           pokemonData.map((pokemon: any, i: number) => {
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