const { Pool } = require('pg');
 
class MusicsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT musics.id, musics.title, musics.performer FROM playlistsongs
      LEFT JOIN musics ON musics.id = playlistsongs.song_id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId]
    }
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = MusicsService;