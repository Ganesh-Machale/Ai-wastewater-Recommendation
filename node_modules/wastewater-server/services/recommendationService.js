/**
 * Recommendation Service
 * 
 * Provides rule-based prototype treatment recommendations.
 * Designed to be enhanced with AI/domain-knowledge decision engines in future phases.
 */

function generateRecommendations(qualityLevel, pollutionLevel, parameters) {
  const { pH, tds } = parameters;
  const recs = [];

  if (qualityLevel === 'Good') {
    recs.push('Preliminary screening and fine filtration to remove suspended particulates.');
    recs.push('Standard pH stabilization check for storage or discharge.');
    recs.push('Routine periodic monitoring to maintain baseline water metrics.');
  } else if (qualityLevel === 'Moderate') {
    if (pH < 6.5) {
      recs.push('Alkali dosing (e.g., Sodium Hydroxide or Lime) to raise pH to neutral range (6.5-8.5).');
    } else if (pH > 8.5) {
      recs.push('Acid neutralization (e.g., Sulfuric or Hydrochloric acid) to lower pH.');
    }
    if (tds > 500) {
      recs.push('Coagulation and flocculation followed by gravity sedimentation to drop dissolved solids.');
    }
    recs.push('Biological treatment assessment (Aerobic / Anaerobic digesters) to handle organic load.');
    recs.push('Secondary laboratory testing recommended prior to environmental release.');
  } else {
    // Poor
    if (pH < 5.5) {
      recs.push('Intense neutralization treatment needed for high acidity before biological steps.');
    } else if (pH > 9.5) {
      recs.push('Controlled acid dosing to prevent caustic damage to downstream infrastructure.');
    }
    if (tds > 1500) {
      recs.push('High-efficiency Membrane Filtration / Reverse Osmosis (RO) or Evaporative Crystallization for extreme TDS reduction.');
    }
    recs.push('Multi-stage treatment mandatory: Primary physical separation + Secondary activated sludge + Tertiary chemical oxidation.');
    recs.push('Immediate certified laboratory analysis and qualified environmental engineer consultation required.');
  }

  return recs;
}

module.exports = {
  generateRecommendations,
};
