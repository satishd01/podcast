const db = require('../db');

exports.createPlan = (req, res) => {
    const { plan_name, description, price, valid_from, valid_until, is_active } = req.body;

    const query = 'INSERT INTO plans (plan_name, description, price, valid_from, valid_until, is_active) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [plan_name, description, price, valid_from, valid_until, is_active], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Plan created successfully', plan_id: results.insertId });
    });
};

exports.getAllPlans = (req, res) => {
    const query = 'SELECT * FROM plans';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

exports.getPlanById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM plans WHERE plan_id = ?';
    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json(results[0]);
    });
};

exports.updatePlan = (req, res) => {
    const { id } = req.params;
    const { plan_name, description, price, valid_from, valid_until, is_active } = req.body;

    const query = 'UPDATE plans SET plan_name = ?, description = ?, price = ?, valid_from = ?, valid_until = ?, is_active = ? WHERE plan_id = ?';
    db.query(query, [plan_name, description, price, valid_from, valid_until, is_active, id], (err, results) => {
        if (err || results.affectedRows === 0) {
            return res.status(404).json({ error: 'Plan not found or not updated' });
        }
        res.status(200).json({ message: 'Plan updated successfully' });
    });
};

exports.deletePlan = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM plans WHERE plan_id = ?';
    db.query(query, [id], (err, results) => {
        if (err || results.affectedRows === 0) {
            return res.status(404).json({ error: 'Plan not found or not deleted' });
        }
        res.status(200).json({ message: 'Plan deleted successfully' });
    });
};
