import React, { useState } from 'react'
import { getSpotifyToken } from '../lib/api'
import { Map } from './Map'
import { Header } from './Header'
import { Chart } from './Chart'
import { Country } from '../types'

getSpotifyToken()

function App() {
  const [country, setCoutry] = useState<Country>()

  return (
    <>
      <Header />
      <Chart country={country} setCountry={setCoutry} />
      <Map country={country} setCountry={setCoutry} />
    </>
  )
}

export default App
