import React from 'react';
import Image from 'next/image';

const Card = ({ pokemon }) => {
  return (
    <div className="text-center">
      <Image
        src={pokemon.sprites.back_default}
        alt={pokemon.name}
        width={75}
        height={75}
      />
      {pokemon.name}
    </div>
  )
}

export default Card;