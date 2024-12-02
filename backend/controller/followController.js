const db = require('../db');

// Follow a podcast
exports.followPodcast = (req, res) => {
    const { profileId, podcastId } = req.body;

    if (!profileId || !podcastId) {
        return res.status(400).json({ message: 'Profile ID and Podcast ID are required' });
    }

    const checkIfAlreadyFollowingSQL = 'SELECT * FROM profile_podcast_follow WHERE profile_id = ? AND podcast_id = ?';
    db.query(checkIfAlreadyFollowingSQL, [profileId, podcastId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'User is already following this podcast' });
        }

        const followPodcastSQL = 'INSERT INTO profile_podcast_follow (profile_id, podcast_id) VALUES (?, ?)';
        db.query(followPodcastSQL, [profileId, podcastId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error following podcast', error: err });
            }

            res.status(201).json({ message: 'Podcast followed successfully' });
        });
    });
};

// Unfollow a podcast
exports.unfollowPodcast = (req, res) => {
    const { profileId, podcastId } = req.body;

    if (!profileId || !podcastId) {
        return res.status(400).json({ message: 'Profile ID and Podcast ID are required' });
    }

    const unfollowPodcastSQL = 'DELETE FROM profile_podcast_follow WHERE profile_id = ? AND podcast_id = ?';
    db.query(unfollowPodcastSQL, [profileId, podcastId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error unfollowing podcast', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'User is not following this podcast' });
        }

        res.status(200).json({ message: 'Podcast unfollowed successfully' });
    });
};

// Get all podcasts a user is following
exports.getUserFollowedPodcasts = (req, res) => {
    const { profileId } = req.params;

    if (!profileId) {
        return res.status(400).json({ message: 'Profile ID is required' });
    }

    const getFollowedPodcastsSQL = `
    SELECT p.podcast_id, p.name, p.show_title, p.description, p.image, p.audio_file
    FROM podcast p
    JOIN profile_podcast_follow f ON p.podcast_id = f.podcast_id
    WHERE f.profile_id = ?
`;
    db.query(getFollowedPodcastsSQL, [profileId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching followed podcasts', error: err });
        }

        res.status(200).json({ podcasts: result });
    });
};

// Get all followers of a podcast
exports.getPodcastFollowers = (req, res) => {
    const { podcastId } = req.params;

    if (!podcastId) {
        return res.status(400).json({ message: 'Podcast ID is required' });
    }

    // SQL query to get all followers of a specific podcast
    const getPodcastFollowersSQL = `
    SELECT pr.profile_id, pr.name, pr.email, pr.plan_id, pr.subscription_start_date, pr.subscription_end_date
    FROM profile pr
    JOIN profile_podcast_follow f ON pr.profile_id = f.profile_id
    WHERE f.podcast_id = ?
    `;

    db.query(getPodcastFollowersSQL, [podcastId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching podcast followers', error: err });
        }

        res.status(200).json({ followers: result });
    });
};
