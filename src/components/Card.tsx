import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ pokemon }) => {

  

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
          <div className="text-center">
            {pokemon.name} (#{pokemon.id})
          </div>
        </div>
      </Link>
    </div>

  )
}

export default Card;