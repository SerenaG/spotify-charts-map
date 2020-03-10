import React, { useState, useEffect } from 'react'
import { getPlaylist } from '../lib/api'
import { Country } from '../types'
import { Track } from './Track'
import { Download } from './Download'
import { ReactComponent as CloseIcon } from '../assets/close.svg'

export const Chart = ({
  country,
  setCountry,
}: {
  country: Country | null
  setCountry: (country: Country) => void
}) => {
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull | null>()

  useEffect(() => {
    if (!country) return
    getPlaylist(country.playlistId).then(playlist => setPlaylist(playlist))
  }, [country])

  if (!playlist) return null

  const { external_urls, images, tracks } = playlist
  const columns = [tracks.items.slice(0, 5), tracks.items.slice(5, 10)]

  return (
    <div className="chart">
      <div className="chart-image">
        <a target="blank" href={external_urls.spotify}>
          <img src={images[0].url} alt="playlist cover"></img>
        </a>
      </div>
      <div className="chart-list">
        <div className="country">
          <div>
            <a target="blank" href={external_urls.spotify}>
              {country.properties.name}
            </a>
            <Download playlist={playlist} />
          </div>
          <CloseIcon
            className="close-icon"
            onClick={() => {
              setPlaylist(null)
              setCountry(null)
            }}
          />
        </div>
        <div className="tracks">
          {columns.map((items, col) => (
            <div className="tracks-columns" key={col}>
              {items.map(({ track }: SpotifyApi.PlaylistTrackObject, i: number) => (
                <Track position={i + col * 5 + 1} track={track} key={track.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
