const express = require('express');
const router = express.Router();
const { getUsers, toggleUserStatus, getAdminStats } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/users', getUsers);
router.patch('/users/:id/status', toggleUserStatus);
router.get('/stats', getAdminStats);

module.exports = router;
