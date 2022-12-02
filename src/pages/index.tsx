import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any>();
  const [pokemonData, setPokemonData] = useState<any>();

  // Get all pokemons and change endpoint offset param for pagination
  const getPokemons = async (url = "", limit = 15) => {
    let uri = url === "" ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0` : url;
    return await fetch(uri).then(response => {
        return response.json();
    }).catch(error => {
        return error;
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
      for (let i = 0; i < pokemonList?.results.length; i++) {
        const pokemon = await getPokemons(pokemonList.results[i].url);
        data.push(pokemon);
      }
      setPokemonData(data);
    };

    fetchPokeData();
  }, [pokemonList]);

  console.log(pokemonList);
  console.log(pokemonData);

  if (pokemonList && pokemonData) return (
    <div className="container mx-auto max-w-xl">
      <div>Pokédex</div>
      <div className="grid grid-cols-3 gap-4">
        {pokemonData && pokemonData.map((pokemon: any, i: number) => {
          return <Card pokemon={pokemon} key={i} />;
        })}
      </div>
      <button disabled={!pokemonList.previous} onClick={() => paginateList('previous')}>Terug</button>
      <button disabled={!pokemonList.next} onClick={() => paginateList('next')}>Volgende</button>
    </div>
  )
}

export default Home;