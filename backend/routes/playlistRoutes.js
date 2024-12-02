const express = require('express');
const router = express.Router();
const { createPlaylist, getPlaylistsByProfile, deleteEpisodeFromPlaylist ,getAllPlaylists,getAllPlaylistsByProfileId} = require('../controller/playlistController');

router.post('/create', createPlaylist); 
router.get('/profile/:profile_id', getPlaylistsByProfile); 
router.delete('/profile/:profile_id/episode/:episode_id', deleteEpisodeFromPlaylist);
router.get('/playlists', getAllPlaylists);

router.get('/playlists/details/profile/:profile_id', getAllPlaylistsByProfileId);

module.exports = router;
