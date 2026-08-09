const ParameterAnalysis = require('../models/ParameterAnalysis');
const ImageAnalysis = require('../models/ImageAnalysis');

// @desc    Get user dashboard stats & chart data
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch parameter and image analyses
    const parameterRecords = await ParameterAnalysis.find({ userId }).sort({ createdAt: -1 });
    const imageRecords = await ImageAnalysis.find({ userId }).sort({ createdAt: -1 });

    const totalParameterCount = parameterRecords.length;
    const totalImageCount = imageRecords.length;
    const totalAnalyses = totalParameterCount + totalImageCount;

    // Quality breakdown counts
    let goodCount = 0;
    let moderateCount = 0;
    let poorCount = 0;

    parameterRecords.forEach((rec) => {
      if (rec.qualityLevel === 'Good') goodCount++;
      else if (rec.qualityLevel === 'Moderate') moderateCount++;
      else if (rec.qualityLevel === 'Poor') poorCount++;
    });

    // Water Quality Distribution for Recharts
    const qualityDistribution = [
      { name: 'Good Quality', count: goodCount, fill: '#10B981' },
      { name: 'Moderate Quality', count: moderateCount, fill: '#F59E0B' },
      { name: 'Poor Quality', count: poorCount, fill: '#EF4444' },
    ];

    // Parameter trend data (last 10 parameter analyses)
    const parameterTrends = parameterRecords
      .slice(0, 10)
      .reverse()
      .map((rec) => ({
        date: new Date(rec.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        pH: rec.parameters.pH,
        tds: rec.parameters.tds,
        quality: rec.qualityLevel,
      }));

    // Monthly activity timeline aggregation
    const monthMap = {};
    [...parameterRecords, ...imageRecords].forEach((rec) => {
      const month = new Date(rec.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!monthMap[month]) {
        monthMap[month] = { month, parameter: 0, image: 0 };
      }
      if (rec.type === 'parameter') {
        monthMap[month].parameter++;
      } else {
        monthMap[month].image++;
      }
    });

    const activityTimeline = Object.values(monthMap);

    // Recent 5 combined items
    const combinedRecent = [
      ...parameterRecords.map((item) => ({
        _id: item._id,
        type: 'parameter',
        title: `Parameter Analysis (pH: ${item.parameters.pH}, TDS: ${item.parameters.tds})`,
        status: item.qualityLevel,
        createdAt: item.createdAt,
      })),
      ...imageRecords.map((item) => ({
        _id: item._id,
        type: 'image',
        title: `Image Analysis (${item.originalName})`,
        status: item.status,
        createdAt: item.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.status(200).json({
      success: true,
      stats: {
        totalAnalyses,
        parameterAnalyses: totalParameterCount,
        imageAnalyses: totalImageCount,
        goodQualityCount: goodCount,
        moderateQualityCount: moderateCount,
        poorQualityCount: poorCount,
      },
      charts: {
        qualityDistribution,
        parameterTrends,
        activityTimeline,
      },
      recentAnalyses: combinedRecent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
