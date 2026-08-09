const User = require('../models/User');
const ParameterAnalysis = require('../models/ParameterAnalysis');
const ImageAnalysis = require('../models/ImageAnalysis');

// @desc    Get system users list for admin
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const users = await User.find(query).select('-passwordHash').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active/deactive status
// @route   PATCH /api/admin/users/:id/status
// @access  Private/Admin
const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Admin cannot deactivate their own account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User account ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin global analytics & metrics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalParameterAnalyses = await ParameterAnalysis.countDocuments();
    const totalImageAnalyses = await ImageAnalysis.countDocuments();
    const totalAnalyses = totalParameterAnalyses + totalImageAnalyses;

    // Recent system activity
    const recentUsers = await User.find().select('-passwordHash').sort({ createdAt: -1 }).limit(5);

    const recentAnalyses = await ParameterAnalysis.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalAnalyses,
        totalParameterAnalyses,
        totalImageAnalyses,
      },
      recentUsers,
      recentAnalyses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  toggleUserStatus,
  getAdminStats,
};
