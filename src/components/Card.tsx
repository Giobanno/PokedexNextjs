import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '../interfaces/typing';

const Card = (props: { pokemon: Pokemon }) => {
  const { pokemon } = props;

  return (
    <div className="hover:scale-105">
      <Link 
        href={{pathname: "/detail", query: {id: pokemon.id} }}
      >
        <div className="flex flex-col justify-center items-center bg-slate-800 rounded p-2">
          <Image
            src={pokemon.sprites.other?.['official-artwork'].front_default}
            alt={pokemon.name}
            width={75}
            height={75}
          />
          <div className="text-center text-white">
            {pokemon.name} (#{pokemon.id})
          </div>
        </div>
      </Link>
    </div>

  )
}

export default Card;