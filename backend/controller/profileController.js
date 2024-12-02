
const db = require('../db'); 
const jwt = require('jsonwebtoken');

const createProfile = (req, res) => {
    const { name, email, plan_id, subscription_start_date, subscription_end_date } = req.body;

    if (!name || !email || !plan_id || !subscription_start_date || !subscription_end_date) {
        return res.status(400).json({
            message: "Name, email, plan_id, subscription_start_date, and subscription_end_date are required."
        });
    }

    const checkPlanSQL = 'SELECT * FROM Plan WHERE plan_id = ?';
    db.query(checkPlanSQL, [plan_id], (planError, planResult) => {
        if (planError) {
            return res.status(500).json({ message: 'Error checking plan', error: planError });
        }

        if (planResult.length === 0) {
            return res.status(400).json({ message: `No plan found with plan_id: ${plan_id}` });
        }

        const profileSQL = 'INSERT INTO Profile (name, email, plan_id, subscription_start_date, subscription_end_date) VALUES (?, ?, ?, ?, ?)';
        const profileValues = [name, email, plan_id, subscription_start_date, subscription_end_date];

        db.query(profileSQL, profileValues, (profileError, profileResult) => {
            if (profileError) {
                return res.status(500).json({ message: 'Error creating profile', error: profileError });
            }

            // Generate JWT token after profile creation
            const profileId = profileResult.insertId;  // This is the newly created profile ID
            const token = jwt.sign({ profile_id: profileId }, '8cc4510a207f10f3a4170bf15c114b6ff73deafd20d05c3384ee34175fa0fe98-secret-key', { expiresIn: '1h' });

            res.status(201).json({
                message: 'Profile created successfully',
                profileId: profileId,
                token: token // Send back the token so the client can use it for future requests
            });
        });
    });
};



const getAllProfiles = (req, res) => {
    const getProfilesSQL = 'SELECT * FROM Profile';
    db.query(getProfilesSQL, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error retrieving profiles', error });
        }
        res.status(200).json(results);
    });
};

const getProfileById = (req, res) => {
    const { id } = req.params;
    const getProfileSQL = 'SELECT * FROM Profile WHERE profile_id = ?';

    db.query(getProfileSQL, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error retrieving profile', error });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: `No profile found with ID: ${id}` });
        }
        res.status(200).json(results[0]);
    });
};

const updateProfile = (req, res) => {
    const { id } = req.params;
    const { name, email, plan_id, subscription_start_date, subscription_end_date } = req.body;

    const updateProfileSQL = `
        UPDATE Profile 
        SET name = ?, email = ?, plan_id = ?, subscription_start_date = ?, subscription_end_date = ? 
        WHERE profile_id = ?
    `;
    const updateValues = [name, email, plan_id, subscription_start_date, subscription_end_date, id];

    db.query(updateProfileSQL, updateValues, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error updating profile', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No profile found with ID: ${id}` });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
    });
};

const deleteProfile = (req, res) => {
    const { id } = req.params;
    const deleteProfileSQL = 'DELETE FROM Profile WHERE profile_id = ?';

    db.query(deleteProfileSQL, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting profile', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No profile found with ID: ${id}` });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    });
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
};

