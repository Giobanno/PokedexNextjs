import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ pokemon }) => {

  return (
    <>
      <Link 
        href={{pathname: "/detail", query: {id: pokemon.id} }}
      >
        <div className="flex flex-col justify-center items-center bg-slate-800">
          <Image
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            width={75}
            height={75}
          />
          <div className="text-center">
            {pokemon.name}
          </div>
        </div>
      </Link>
    </>

  )
}

export default Card;