import React, { useRef } from 'react'
import { ReactComponent as HeadphonesIcon } from '../assets/headphones.svg'

export const Track = ({
  track: { name, artists, external_urls, preview_url },
  position,
}: {
  position: number
  track: SpotifyApi.TrackObjectFull
}) => {
  const audio = useRef<HTMLAudioElement>(null)
  const artistsNames = artists.map(artist => artist.name).join(', ')

  const play = () => audio.current.play()
  const stop = () => audio.current.pause()

  return (
    <div onMouseOver={preview_url && play} onMouseOut={preview_url && stop}>
      <a className="track" target="blank" href={external_urls.spotify}>
        <div className="track-position">{position}.</div>
        <div>
          <span className="track-artists">{artistsNames}</span>
          <span> - </span>
          <span className="track-name">{name}</span>
          {preview_url && <HeadphonesIcon className="headphones-icon" />}
        </div>
      </a>
      <audio ref={audio} style={{ display: 'none' }} controls>
        <source src={preview_url} type="audio/mpeg" />
      </audio>
    </div>
  )
}
