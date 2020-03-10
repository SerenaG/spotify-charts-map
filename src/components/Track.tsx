import React from 'react'

export const Track = ({
  track: { name, artists, external_urls },
  position,
}: {
  position: number
  track: SpotifyApi.TrackObjectFull
}) => {
  const artistsNames = artists.map(artist => artist.name).join(', ')
  return (
    <a className="track" target="blank" href={external_urls.spotify}>
      <div className="track-position">{position}.</div>
      <div>
        <span className="track-artists">{artistsNames}</span>
        <span> - </span>
        <span className="track-name">{name}</span>
      </div>
    </a>
  )
}
