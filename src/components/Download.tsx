import React from 'react'
import { ReactComponent as DownloadIcon } from '../assets/download.svg'

export const Download = ({ playlist }: { playlist: SpotifyApi.PlaylistObjectFull }) => {
  const fileName: string = `${playlist.name.replace(/ /g, '')}.json`
  const tracks = playlist.tracks.items.map(track => ({
    artists: track.track.artists.map(artist => artist.name),
    name: track.track.name,
  }))
  const data = {
    playlist: playlist.name,
    tracks,
  }
  const json: string = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))

  return (
    <a className="download" href={`data:${json}`} download={fileName}>
      <DownloadIcon className="download-icon" height="20" />
    </a>
  )
}
