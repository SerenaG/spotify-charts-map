import React, { useState, useEffect } from 'react'
import { feature } from 'topojson-client'
import { geoMercator, geoPath, GeoProjection, geoDistance, geoBounds, geoCentroid } from 'd3-geo'
import { Feature } from 'geojson'
import { useWindowSize } from '../hooks/useWindowSize'
import { countries } from '../lib/countries-110m'
import { playlistsIds } from '../lib/playlist-ids'
import { Country } from '../types'
import { Geo } from './Geo'

let projection: GeoProjection
let topology = feature(countries, countries.objects.countries) as GeoJSON.FeatureCollection
let features = topology.features.filter(f => f.properties.name !== 'Antarctica')

export const Map = ({
  country,
  setCountry,
}: {
  country: Country | null
  setCountry: (country: Country) => void
}) => {
  const size = useWindowSize()
  const [hovered, setHovered] = useState<number | null>()
  const [geographies, setGeographies] = useState<Country[]>([])

  useEffect(() => {
    const bounds = geoBounds(topology)
    const center = geoCentroid(topology)
    const distance = geoDistance(bounds[0], bounds[1])
    const scale = size.width / distance / Math.sqrt(2)

    projection = geoMercator()
      .scale(scale / 1.8)
      .center(center)
      .translate([size.width / 1.8, size.height / 2.2])

    setGeographies(() =>
      features.map((geo: Feature) => ({
        ...geo,
        playlistId: playlistsIds[geo.properties.name],
      }))
    )
  }, [size.width, size.height])

  return (
    <div className="map">
      <svg className="countries" width="100%" height="100%">
        {geographies.map((geo, i) => (
          <Geo
            key={i}
            country={geo}
            selectedCoutry={country}
            position={i}
            total={geographies.length}
            geoPath={geoPath().projection(projection)(geo)}
            hovered={hovered}
            setCountry={setCountry}
            setHovered={setHovered}
          />
        ))}
      </svg>
      <div className="hovered-name">{geographies[hovered]?.properties.name}</div>
    </div>
  )
}
