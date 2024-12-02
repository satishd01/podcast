    const db = require('../db');
    const createPlaylist = (req, res) => {
        const { profile_id, episode_id, playlist_name } = req.body;
    
        if (!profile_id || !episode_id || !playlist_name) {
            return res.status(400).json({
                message: "Profile ID, episode ID, and playlist name are required."
            });
        }
    
        // Check if the episode exists (use the correct column name for ID)
        const checkEpisodeSQL = 'SELECT * FROM Episode WHERE id = ?';
        db.query(checkEpisodeSQL, [episode_id], (episodeError, episodeResult) => {
            if (episodeError) {
                return res.status(500).json({ message: 'Error checking episode', error: episodeError });
            }
    
            if (episodeResult.length === 0) {
                return res.status(400).json({ message: `No episode found with id: ${episode_id}` });
            }
    
            // Insert new playlist entry
            const playlistSQL = 'INSERT INTO Playlist (profile_id, episode_id, playlist_name) VALUES (?, ?, ?)';
            const playlistValues = [profile_id, episode_id, playlist_name];
    
            db.query(playlistSQL, playlistValues, (playlistError, playlistResult) => {
                if (playlistError) {
                    return res.status(500).json({ message: 'Error creating playlist', error: playlistError });
                }
    
                res.status(201).json({
                    message: 'Playlist created successfully',
                    playlistId: playlistResult.insertId,
                    data: {
                        profile_id,
                        episode_id,
                        playlist_name,
                    },
                });
            });
        });
    };
    const getPlaylistsByProfile = (req, res) => {
        const { profile_id } = req.params;
    
        const query = `
            SELECT 
                p.playlist_id, 
                p.playlist_name, 
                e.title AS episode_title, 
                e.creator AS episode_creator, 
                e.image AS episode_image
            FROM 
                Playlist p
            JOIN 
                Episode e 
            ON 
                p.episode_id = e.id
            WHERE 
                p.profile_id = ?
        `;
    
        db.query(query, [profile_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching playlists', error: err });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: `No playlists found for profile_id: ${profile_id}` });
            }
    
            res.status(200).json({
                message: 'Playlists fetched successfully',
                data: result,
            });
        });
    };
    
    const deleteEpisodeFromPlaylist = (req, res) => {
        const { profile_id, episode_id } = req.params;
    
        const query = 'DELETE FROM Playlist WHERE profile_id = ? AND episode_id = ?';
    
        db.query(query, [profile_id, episode_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting episode from playlist', error: err });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Episode not found in playlist' });
            }
    
            res.status(200).json({
                message: 'Episode removed from playlist successfully',
            });
        });
    };
    const getAllPlaylists = (req, res) => {
        const query = `
            SELECT 
                p.playlist_id, 
                p.profile_id, 
                p.playlist_name, 
                e.title AS episode_title, 
                e.creator AS episode_creator, 
                e.image AS episode_image
            FROM 
                Playlist p
            JOIN 
                Episode e 
            ON 
                p.episode_id = e.id
        `;
    
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching all playlists', error: err });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: 'No playlists found' });
            }
    
            res.status(200).json({
                message: 'All playlists fetched successfully',
                data: result,
            });
        });
    };
    const getAllPlaylistsByProfileId = (req, res) => {
        const { profile_id } = req.params;
    
        const query = `
            SELECT 
                p.playlist_id, 
                p.playlist_name, 
                e.id AS episode_id,
                e.title AS episode_title, 
                e.creator AS episode_creator, 
                e.image AS episode_image
            FROM 
                Playlist p
            JOIN 
                Episode e 
            ON 
                p.episode_id = e.id
            WHERE 
                p.profile_id = ?
        `;
    
        db.query(query, [profile_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching playlists for profile', error: err });
            }
    
            if (result.length === 0) {
                return res.status(404).json({ message: `No playlists found for profile_id: ${profile_id}` });
            }
    
            res.status(200).json({
                message: 'Playlists fetched successfully by profile ID',
                data: result,
            });
        });
    };
        
    
    module.exports = {
        createPlaylist,
        getPlaylistsByProfile,
        deleteEpisodeFromPlaylist,
        getAllPlaylists,
        getAllPlaylistsByProfileId,
    
    };
    