class Listener {
    constructor(musicsService, mailSender) {
      this._musicsService = musicsService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        
        const musics = await this._musicsService.getPlaylists(playlistId);
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(musics));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;