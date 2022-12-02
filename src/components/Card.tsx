import React from 'react';
import Image from 'next/image';

const Card = ({ pokemon }) => {
  return (
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
  )
}

export default Card;