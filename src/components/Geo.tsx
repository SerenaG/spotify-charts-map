import React from 'react'
import { Country } from '../types'
import { scaleLinear } from 'd3'

const highlightColor = '#1ed760'

const colorScale = scaleLinear<string, string>()
  .domain([0, 1])
  .range(['black', highlightColor])

export const Geo = ({
  country,
  selectedCoutry,
  position,
  total,
  geoPath,
  hovered,
  setCountry,
  setHovered,
}: {
  country: Country
  selectedCoutry: Country
  position: number
  total: number
  geoPath: string
  hovered: number
  setCountry: (country: Country | null) => void
  setHovered: (position: number | null) => void
}) => {
  const {
    playlistId,
    properties: { name },
  } = country
  const color = colorScale((1 / total) * position + 0.2)

  return (
    <path
      className={`country country-${name} ${playlistId ? 'country--hoverable' : ''} ${
        selectedCoutry?.properties.name === name ? 'country--selected' : ''
      }`}
      d={geoPath}
      fill={hovered === position ? highlightColor : playlistId ? `${color}` : 'black'}
      onClick={() => playlistId && setCountry(country)}
      onMouseEnter={() => playlistId && setHovered(position)}
      onMouseLeave={() => setHovered(null)}
    />
  )
}
