import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';


const Detail = () => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>();

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id.toString();

      const getSpecificPokemon = async (id: any) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
            return response.json();
        }).then((json) =>  { 
          setPokemon(json)})
        .catch(error => {
            return error;
        });
      }

      getSpecificPokemon(id);

    }
  }, [router.isReady])

  if (!pokemon) return;

  const abilities = pokemon.abilities.map((ability: any) => {
    return ability.ability.name;
  }).join(', ');

  const moves = pokemon.moves.map((move: any) => {
    return move.move.name;
  }).join(', ');

  const stats = pokemon.stats.map((stat: any) => {
    return stat.stat.name + ": " + stat.base_stat;
  }).join(', ');

 return (
    <div className="container mx-auto max-w-xl">
      <Image 
        src={pokemon.sprites.other?.['official-artwork'].front_default}
        alt={pokemon.name}
        width={175}
        height={175}
      />
      <div className="mb-3">{pokemon.name} (#{pokemon.id})</div>
      <div className="mb-3">
        Stats: <div>{stats}</div>
      </div>
      <div className="mb-3">
        Abilities: <div>{abilities}</div>
      </div> 
      <div className="mb-3">
        Moves: <div>{moves}</div>
      </div> 
      <Link 
      href="/">Terug</Link>
    </div>
  )
}

export default Detail;