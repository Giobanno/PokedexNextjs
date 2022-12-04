import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon, Type, Ability, Move, Stat } from '../interfaces/typing';

const Detail = () => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id.toString();

      const getSpecificPokemon = async (id: string) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
            return response.json();
        }).then((json) =>  { 
          setPokemon(json)})
        .catch(() => {
            return null;
        });
      }

      getSpecificPokemon(id);
    }
  }, [router.isReady])

  if (!pokemon) return;

  const types = pokemon.types.map((type: Type) => {
    return type.type.name;
  }).join(', ');

  const abilities = pokemon.abilities.map((ability: Ability) => {
    return ability.ability.name;
  }).join(', ');

  const moves = pokemon.moves.map((move: Move) => {
    return move.move.name;
  }).join(', ');

  const stats = pokemon.stats.map((stat: Stat) => {
    return stat.stat.name + ": " + stat.base_stat;
  }).join(', ');

 return (
    <div className="container mx-auto max-w-xl p-5 bg-white rounded shadow text-black md:mt-10">
      <Image 
        src={pokemon.sprites.other?.['official-artwork'].front_default}
        alt={pokemon.name}
        width={175}
        height={175}
      />
      <div className="mb-3 text-lg font-bold">{pokemon.name} (#{pokemon.id})</div>
      <div className="mb-3">
        <div className="text-md font-bold">Type: </div>
        <div>{types}</div>
      </div>
      <div className="mb-3">
        <div className="text-md font-bold">Stats: </div>
        <div>{stats}</div>
      </div>
      <div className="mb-3">
        <div className="text-md font-bold">Abilities: </div>
        <div>{abilities}</div>
      </div> 
      <div className="mb-3">
        <div className="text-md font-bold">Moves: </div>
        <div>{moves}</div>
      </div> 
      <Link 
      href="/" className="text-lg font-bold border p-2 mr-3 hover:bg-slate-200 rounded disabled:opacity-50 ">Terug</Link>
    </div>
  )
}

export default Detail;