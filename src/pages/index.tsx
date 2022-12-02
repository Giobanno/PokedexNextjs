import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any>();

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

  console.log(pokemonList);

  return (
    <div className="container block mx-auto">
      <div className="container">Home</div>
      <Link href="/detail">Go to Detail</Link>
    </div>
  )
}

export default Home;