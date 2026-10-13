/**
 * Recommendation Service
 * 
 * Generates tailored wastewater treatment recommendations based on:
 * 1. Random Forest Machine Learning predicted class (Class 0 to 4)
 * 2. Quality and pollution hazard levels
 * 3. Specific chemical parameter values (pH, TDS, COD, Turbidity, Iron, etc.)
 */

const CLASS_DETAILS = {
  0: {
    title: 'Class 0 - Compliant Effluent / Low Contamination',
    qualityLevel: 'Good',
    pollutionLevel: 'Low',
    primaryRecs: [
      'Multi-media pressure sand filtration to eliminate residual trace suspended particulates.',
      'Maintain continuous dissolved oxygen (DO) monitoring in the discharge basin.',
      'Routine chlorination/UV disinfection check prior to environmental discharge or industrial recycling.',
      'Scheduled periodic monitoring to ensure ongoing compliance with environmental standards.'
    ]
  },
  1: {
    title: 'Class 1 - Low Nutrient / Phosphorus-Deficient Effluent',
    qualityLevel: 'Moderate',
    pollutionLevel: 'Medium',
    primaryRecs: [
      'Evaluate Biological Nutrient Removal (BNR) process; supplement trace phosphorus if active biomass activity declines.',
      'Primary coagulant dosing (Alum or Polyaluminum Chloride) for particulate stabilization.',
      'Dual-media filtration (sand + anthracite) to maintain low effluent turbidity.',
      'Periodic bench-scale testing to balance biological nitrification and denitrification stages.'
    ]
  },
  2: {
    title: 'Class 2 - High TDS / Saline Industrial Effluent',
    qualityLevel: 'Poor',
    pollutionLevel: 'High',
    primaryRecs: [
      'High-Efficiency Reverse Osmosis (RO) or Nanofiltration required to reject concentrated dissolved solids and minerals.',
      'Electrocoagulation or chemical precipitation pretreatment to mitigate membrane scaling.',
      'Implement brine concentration system or Multi-Effect Evaporator (MEE) for Zero Liquid Discharge (ZLD) compliance.',
      'Continuous conductivity and TDS telemetry to safeguard downstream reverse osmosis membranes.'
    ]
  },
  3: {
    title: 'Class 3 - High COD / Heavy Organic Contamination',
    qualityLevel: 'Poor',
    pollutionLevel: 'High',
    primaryRecs: [
      'High-rate biological treatment (Moving Bed Biofilm Reactor - MBBR or Activated Sludge Process) to rapidly reduce excessive Chemical Oxygen Demand (COD).',
      'Advanced Oxidation Process (AOP: Ozone/UV or Fenton reagent) to break down refractory and toxic organic compounds.',
      'Granular Activated Carbon (GAC) adsorption columns for tertiary organic polishing.',
      'Frequent sludge settling rate (SVI) checks and dissolved oxygen regulation in aeration tanks.'
    ]
  },
  4: {
    title: 'Class 4 - Moderate Mineral & Particulate Effluent',
    qualityLevel: 'Moderate',
    pollutionLevel: 'Medium',
    primaryRecs: [
      'Chemical coagulation and flocculation using organic polymers or ferric chloride to aggregate fine suspended particles and iron complexes.',
      'Lamella inclined-plate clarifier or Dissolved Air Flotation (DAF) for rapid solids-liquid separation.',
      'Pressure sand and carbon filtration sequence to eliminate residual turbidity and mineral load.',
      'Final pH stabilization and disinfection before intermediate cooling tower or irrigation reuse.'
    ]
  }
};

function generateRecommendations(predictedClass, qualityLevel, pollutionLevel, parameters = {}) {
  const recs = [];
  const classInfo = CLASS_DETAILS[predictedClass];

  if (classInfo && Array.isArray(classInfo.primaryRecs)) {
    recs.push(...classInfo.primaryRecs);
  }

  // Parameter-specific targeted corrections
  const pH = Number(parameters.pH);
  const tds = Number(parameters.tds || parameters.TDS);
  const cod = Number(parameters.cod || parameters['COD(mg/L)']);
  const turbidity = Number(parameters.turbidity || parameters.Turbidity);
  const iron = Number(parameters.iron || parameters.Iron);

  if (!isNaN(pH)) {
    if (pH < 6.5) {
      recs.push(`pH Level (${pH}): Alkaline dosing (Sodium Hydroxide NaOH or Lime) required to bring pH into safe discharge range (6.5 - 8.5).`);
    } else if (pH > 8.5) {
      recs.push(`pH Level (${pH}): Acid neutralization dosing (Sulfuric acid H2SO4) required to prevent alkaline infrastructure damage.`);
    }
  }

  if (!isNaN(tds) && tds > 900 && predictedClass !== 2) {
    recs.push(`Elevated TDS (${tds} mg/L): Secondary membrane demineralization recommended.`);
  }

  if (!isNaN(cod) && cod > 400 && predictedClass !== 3) {
    recs.push(`Elevated COD (${cod} mg/L): Supplement aeration with bio-augmentation to digest excess organics.`);
  }

  if (!isNaN(turbidity) && turbidity > 3.0) {
    recs.push(`High Turbidity (${turbidity} NTU): Optimize coagulant dosage to improve settling in secondary clarifier.`);
  }

  if (!isNaN(iron) && iron > 0.40) {
    recs.push(`High Iron Content (${iron} mg/L): Aeration followed by manganese greensand filtration to remove precipitated iron.`);
  }

  return recs;
}

module.exports = {
  CLASS_DETAILS,
  generateRecommendations,
};
