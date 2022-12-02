import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="container block mx-auto">
      <div className="container">Home</div>
      <Link href="/detail">Go to Detail</Link>
    </div>
  )
}

export default Home;