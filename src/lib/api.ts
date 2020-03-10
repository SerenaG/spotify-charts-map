import ky from 'ky'
import localStore from 'store'

const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ''
const spotifyClientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''

const spotifyUrl = 'https://api.spotify.com/v1/'
const tokenUrl = 'https://accounts.spotify.com/api/token'

const encodedToken = new Buffer(spotifyClientId + ':' + spotifyClientSecret).toString('base64')

function getToken(): string {
  return localStore.get('spotify-token')
}

function setToken(value: string) {
  return localStore.set('spotify-token', value)
}

const authorizedKy = ky.extend({
  hooks: {
    beforeRequest: [options => options.headers.set('Authorization', `Bearer ${getToken()}`)],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401) {
          setToken(null)
          await getSpotifyToken()
          return authorizedKy(request)
        }
        return response
      },
    ],
  },
})

export async function getSpotifyToken() {
  if (getToken()) return

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${encodedToken}`,
  }

  await ky
    .post(tokenUrl, {
      searchParams: { grant_type: 'client_credentials' },
      headers,
    })
    .json<any>()
    .then(data => setToken(data.access_token))
}

export function getPlaylist(id: string): Promise<SpotifyApi.PlaylistObjectFull> {
  const url = `${spotifyUrl}playlists/${id}`
  return authorizedKy.get(url).json<SpotifyApi.PlaylistObjectFull>()
}
