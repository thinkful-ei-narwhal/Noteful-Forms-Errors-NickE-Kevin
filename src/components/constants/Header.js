import React from 'react';

export default function Header() {

  setTimeout(() => {
    throw new Error("Timeout error");
  }, 3000
  )

  return (
    <header>
      <a href="/"><h1 className="header">Noteful</h1></a>
    </header>
  )
}