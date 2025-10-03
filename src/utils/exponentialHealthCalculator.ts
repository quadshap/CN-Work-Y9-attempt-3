/**
 * REBALANCED HEALTH ASSESSMENT SYSTEM
 * 
 * This system implements realistic, specialized impacts for each habit based on medical research.
 * Each habit has primary, secondary, and minimal effects rather than broad impacts.
 * 
 * Based on epidemiological studies and meta-analyses with realistic impact ranges.
 */

import { HabitLevels } from '../store/useAtlasStore';
import habitsData from '../data/habits.json';

// SPECIALIZED HABIT IMPACTS - Each habit has focused effects
const HABIT_IMPACTS = {
  // HARMFUL HABITS
  drugs: {
    // Most negatively impactful overall - affects brain primarily
    primary: { stat: 'mentalHealth', impact: -20 },
    secondary: [
      { stat: 'cognitiveFunction', impact: -15 },
      { stat: 'overallHealth', impact: -12 }
    ],
    minimal: [
      { stat: 'lifeExpectancy', impact: -8 },
      { stat: 'diseaseRisk', impact: 15 }
    ]
  },
  
  smoking: {
    // Primary lung/cardiovascular impact
    primary: { stat: 'physicalHealth', impact: -18 },
    secondary: [
      { stat: 'lifeExpectancy', impact: -12 },
      { stat: 'diseaseRisk', impact: 18 }
    ],
    minimal: [
      { stat: 'overallHealth', impact: -6 },
      { stat: 'cardioStrain', impact: 8 }
    ]
  },
  
  alcohol: {
    // Primary liver/brain impact
    primary: { stat: 'overallHealth', impact: -16 },
    secondary: [
      { stat: 'mentalHealth', impact: -10 },
      { stat: 'cognitiveFunction', impact: -8 }
    ],
    minimal: [
      { stat: 'physicalHealth', impact: -5 },
      { stat: 'lifeExpectancy', impact: -4 }
    ]
  },
  
  chronic_stress: {
    // Primary mental health impact
    primary: { stat: 'mentalHealth', impact: -18 },
    secondary: [
      { stat: 'stressLoad', impact: 15 },
      { stat: 'sleepQuality', impact: -10 }
    ],
    minimal: [
      { stat: 'happiness', impact: -6 },
      { stat: 'immuneSystem', impact: -4 }
    ]
  },
  
  processed_diet: {
    // Primary metabolic/physical impact
    primary: { stat: 'metabolicHealth', impact: -15 },
    secondary: [
      { stat: 'physicalHealth', impact: -8 },
      { stat: 'inflammation', impact: 10 }
    ],
    minimal: [
      { stat: 'overallHealth', impact: -4 },
      { stat: 'diseaseRisk', impact: 6 }
    ]
  },
  
  sedentary: {
    // Primary physical fitness impact
    primary: { stat: 'physicalFitness', impact: -14 },
    secondary: [
      { stat: 'physicalHealth', impact: -8 },
      { stat: 'cardioStrain', impact: 8 }
    ],
    minimal: [
      { stat: 'mentalHealth', impact: -3 },
      { stat: 'metabolicHealth', impact: -5 }
    ]
  },
  
  social_isolation: {
    // Primary happiness/social impact
    primary: { stat: 'happiness', impact: -16 },
    secondary: [
      { stat: 'mentalHealth', impact: -12 },
      { stat: 'qualityOfLife', impact: -8 }
    ],
    minimal: [
      { stat: 'stressLoad', impact: 6 },
      { stat: 'overallWellness', impact: -4 }
    ]
  },
  
  pornography: {
    // Specialized dopamine/mental impact
    primary: { stat: 'happiness', impact: -14 },
    secondary: [
      { stat: 'mentalHealth', impact: -10 },
      { stat: 'cognitiveFunction', impact: -6 }
    ],
    minimal: [
      { stat: 'qualityOfLife', impact: -4 }
    ]
  },
  
  gaming: {
    // Specialized attention/social impact
    primary: { stat: 'cognitiveFunction', impact: -10 },
    secondary: [
      { stat: 'happiness', impact: -5 }
    ],
    minimal: [
      { stat: 'sleepQuality', impact: -3 }
    ]
  },
  
  // BENEFICIAL HABITS
  sleep_consistency: {
    // Most positively impactful overall - universal recovery
    primary: { stat: 'overallHealth', impact: 20 },
    secondary: [
      { stat: 'cognitiveFunction', impact: 15 },
      { stat: 'recoveryCapacity', impact: 18 },
      { stat: 'mentalHealth', impact: 12 }
    ],
    minimal: [
      { stat: 'physicalHealth', impact: 8 },
      { stat: 'immuneSystem', impact: 10 }
    ]
  },
  
  exercise: {
    // Primary mental health, secondary quality of life + happiness
    primary: { stat: 'mentalHealth', impact: 18 },
    secondary: [
      { stat: 'qualityOfLife', impact: 12 },
      { stat: 'happiness', impact: 10 }
    ],
    minimal: [
      { stat: 'cardioStrain', impact: -8 },
      { stat: 'metabolicHealth', impact: 6 }
    ]
  },
  
  healthy_diet: {
    // Universal positive effects (broader range)
    primary: { stat: 'physicalHealth', impact: 16 },
    secondary: [
      { stat: 'metabolicHealth', impact: 12 },
      { stat: 'overallHealth', impact: 10 },
      { stat: 'inflammation', impact: -8 }
    ],
    minimal: [
      { stat: 'immuneSystem', impact: 6 },
      { stat: 'diseaseRisk', impact: -5 }
    ]
  },
  
  hydration: {
    // Universal positive effects (broader range)
    primary: { stat: 'physicalHealth', impact: 12 },
    secondary: [
      { stat: 'cognitiveFunction', impact: 8 },
      { stat: 'overallHealth', impact: 6 }
    ],
    minimal: [
      { stat: 'metabolicHealth', impact: 4 },
      { stat: 'recoveryCapacity', impact: 5 }
    ]
  },
  
  social_connection: {
    // Primary happiness/social impact
    primary: { stat: 'happiness', impact: 18 },
    secondary: [
      { stat: 'mentalHealth', impact: 12 },
      { stat: 'qualityOfLife', impact: 10 }
    ],
    minimal: [
      { stat: 'overallWellness', impact: 6 },
      { stat: 'stressLoad', impact: -4 }
    ]
  },
  
  meditation: {
    // Primary stress/mental impact
    primary: { stat: 'stressLoad', impact: -15 },
    secondary: [
      { stat: 'mentalHealth', impact: 10 },
      { stat: 'sleepQuality', impact: 8 }
    ],
    minimal: [
      { stat: 'happiness', impact: 5 },
      { stat: 'cognitiveFunction', impact: 4 }
    ]
  },
  
  reading: {
    // Specialized cognitive impact
    primary: { stat: 'cognitiveFunction', impact: 12 },
    secondary: [
      { stat: 'mentalHealth', impact: 6 }
    ],
    minimal: [
      { stat: 'happiness', impact: 3 }
    ]
  },
  
  journaling: {
    // Specialized emotional processing impact
    primary: { stat: 'mentalHealth', impact: 10 },
    secondary: [
      { stat: 'stressLoad', impact: -6 }
    ],
    minimal: [
      { stat: 'happiness', impact: 3 }
    ]
  }
};

// ORGAN-SPECIFIC VULNERABILITY FACTORS - More realistic ranges
const ORGAN_VULNERABILITIES = {
  lungs: {
    smoking: 3.5,        // Reduced from 4.5
    exercise: -2.0,      // Reduced from -2.8
    chronic_stress: 1.2  // Reduced from 1.8
  },
  liver: {
    alcohol: 3.8,        // Reduced from 5.0
    processed_diet: 2.0, // Reduced from 2.5
    healthy_diet: -2.5   // Reduced from -3.2
  },
  heart: {
    smoking: 3.0,        // Reduced from 3.8
    exercise: -3.0,      // Reduced from -4.0
    chronic_stress: 2.5, // Reduced from 3.2
    social_connection: -2.0 // Reduced from -2.5
  },
  brain: {
    drugs: 4.0,          // Reduced from 4.8
    alcohol: 2.8,        // Reduced from 3.5
    exercise: -2.5,      // Reduced from -3.8
    sleep_consistency: -3.0, // Reduced from -4.2
    chronic_stress: 3.0  // Reduced from 3.8
  },
  kidneys: {
    drugs: 3.2,          // Reduced from 4.0
    hydration: -2.8,     // Reduced from -3.5
    chronic_stress: 1.8  // Reduced from 2.2
  },
  gut: {
    processed_diet: 3.0, // Reduced from 3.8
    healthy_diet: -2.8,  // Reduced from -3.5
    chronic_stress: 2.2  // Reduced from 2.8
  },
  skin: {
    smoking: 2.5,        // Reduced from 3.2
    hydration: -2.2,     // Reduced from -2.8
    chronic_stress: 2.0  // Reduced from 2.5
  },
  bladder: {
    hydration: -2.5,
    chronic_stress: 1.8,
    alcohol: 2.2,
    processed_diet: 1.5
  }
};

// BASELINE HEALTH VALUES - More realistic starting points
const BASELINE_ORGAN_HEALTH = {
  lungs: 78,    // Reduced from 82
  heart: 75,    // Reduced from 78
  brain: 80,    // Reduced from 85
  liver: 76,    // Reduced from 80
  kidneys: 82,  // Reduced from 85
  gut: 72,      // Reduced from 75
  skin: 77,     // Reduced from 80
  bladder: 80
};

interface ExponentialHealthResult {
  overallHealth: number;
  organHealth: Record<string, number>;
  exponentialFactors: {
    positive: Array<{ habit: string, impact: number, explanation: string }>;
    negative: Array<{ habit: string, impact: number, explanation: string }>;
  };
  riskAssessment: {
    physicalHealth: number;
    mentalHealth: number;
    lifeExpectancy: number;
    diseaseRisk: number;
  };
  prioritizedRecommendations: Array<{
    priority: 'critical' | 'high' | 'moderate';
    action: string;
    rationale: string;
    expectedImpact: string;
  }>;
}

/**
 * Calculate specialized health impact based on realistic medical research
 */
export const calculateExponentialHealth = (habits: HabitLevels): ExponentialHealthResult => {
  // Initialize all health metrics
  const healthMetrics = {
    overallHealth: 50,
    physicalHealth: 50,
    mentalHealth: 50,
    happiness: 50,
    qualityOfLife: 50,
    physicalFitness: 50,
    overallWellness: 50,
    lifeExpectancy: 75,
    diseaseRisk: 25,
    // Detailed stats
    cardioStrain: 5,
    inflammation: 5,
    sleepQuality: 5,
    stressLoad: 5,
    recoveryCapacity: 5,
    cognitiveFunction: 5,
    immuneSystem: 5,
    metabolicHealth: 5
  };

  const exponentialFactors = { positive: [], negative: [] };
  const organHealth: Record<string, number> = {};
  
  // Apply specialized habit impacts
  Object.entries(habits).forEach(([habitId, habitData]) => {
    const level = habitData?.level || 0;
    if (level === 0) return;
    
    const habitImpact = HABIT_IMPACTS[habitId];
    if (!habitImpact) return;
    
    const habit = habitsData.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    // Realistic scaling: level 1 = 30%, level 2 = 65%, level 3 = 100%
    const levelScaling = [0, 0.3, 0.65, 1.0][level];
    
    // Apply primary effect
    if (habitImpact.primary) {
      const impact = habitImpact.primary.impact * levelScaling;
      healthMetrics[habitImpact.primary.stat] += impact;
      
      // Track for exponential factors
      const factorData = {
        habit: habit.name,
        impact: Math.abs(impact),
        explanation: getSpecializedExplanation(habitId, level, habitImpact.primary.stat, impact)
      };
      
      if (impact > 0) {
        exponentialFactors.positive.push(factorData);
      } else {
        exponentialFactors.negative.push(factorData);
      }
    }
    
    // Apply secondary effects
    if (habitImpact.secondary) {
      habitImpact.secondary.forEach(effect => {
        const impact = effect.impact * levelScaling;
        healthMetrics[effect.stat] += impact;
      });
    }
    
    // Apply minimal effects
    if (habitImpact.minimal) {
      habitImpact.minimal.forEach(effect => {
        const impact = effect.impact * levelScaling;
        healthMetrics[effect.stat] += impact;
      });
    }
  });
  
  // Calculate organ-specific health with reduced impacts
  Object.keys(BASELINE_ORGAN_HEALTH).forEach(organId => {
    let organHealthValue = BASELINE_ORGAN_HEALTH[organId];
    const vulnerabilities = ORGAN_VULNERABILITIES[organId] || {};
    
    Object.entries(habits).forEach(([habitId, habitData]) => {
      const level = habitData?.level || 0;
      if (level === 0) return;
      
      const vulnerability = vulnerabilities[habitId];
      if (!vulnerability) return;
      
      // More realistic organ impact scaling
      const levelScaling = [0, 0.4, 0.7, 1.0][level];
      const organImpact = vulnerability * levelScaling * 2; // Reduced multiplier
      
      organHealthValue -= organImpact;
    });
    
    // Ensure realistic bounds
    organHealth[organId] = Math.max(20, Math.min(100, organHealthValue));
  });
  
  // Ensure all metrics stay within realistic bounds
  Object.keys(healthMetrics).forEach(key => {
    if (key === 'lifeExpectancy') {
      // Calculate severe substance abuse penalty
      const drugsLevel = habits.drugs?.level || 0;
      const alcoholLevel = habits.alcohol?.level || 0;
      const smokingLevel = habits.smoking?.level || 0;
      const pornographyLevel = habits.pornography?.level || 0;
      
      // Severe penalty for multiple high-level substance abuse
      const substanceAbusePenalty = (drugsLevel * 8) + (alcoholLevel * 6) + (smokingLevel * 7) + (pornographyLevel * 3);
      
      // Apply penalty to life expectancy
      healthMetrics[key] -= substanceAbusePenalty;
      
      // Enforce new range: 40-95 years
      healthMetrics[key] = Math.max(40, Math.min(95, healthMetrics[key]));
    } else if (key === 'diseaseRisk') {
      healthMetrics[key] = Math.max(5, Math.min(80, healthMetrics[key]));
    } else if (['cardioStrain', 'inflammation', 'sleepQuality', 'stressLoad', 'recoveryCapacity', 'cognitiveFunction', 'immuneSystem', 'metabolicHealth'].includes(key)) {
      healthMetrics[key] = Math.max(0, Math.min(10, healthMetrics[key]));
    } else {
      healthMetrics[key] = Math.max(10, Math.min(100, healthMetrics[key]));
    }
  });
  
  // Calculate composite metrics
  const overallHealth = healthMetrics.overallHealth;
  const qualityOfLife = Math.max(10, Math.min(100, (healthMetrics.overallHealth + healthMetrics.happiness + healthMetrics.mentalHealth) / 3));
  const overallWellness = Math.max(10, Math.min(100, (healthMetrics.overallHealth + healthMetrics.happiness + healthMetrics.physicalFitness) / 3));
  
  // Generate prioritized recommendations
  const prioritizedRecommendations = generatePrioritizedRecommendations(habits, exponentialFactors);
  
  return {
    overallHealth,
    organHealth,
    exponentialFactors,
    riskAssessment: {
      physicalHealth: healthMetrics.physicalHealth,
      mentalHealth: healthMetrics.mentalHealth,
      lifeExpectancy: healthMetrics.lifeExpectancy,
      diseaseRisk: healthMetrics.diseaseRisk
    },
    prioritizedRecommendations
  };
};

/**
 * Generate explanations for specialized habit impacts
 */
const getSpecializedExplanation = (habitId: string, level: number, primaryStat: string, impact: number): string => {
  const explanations = {
    // Harmful habits
    drugs: `Recreational drugs primarily disrupt neurotransmitter systems and cognitive function. Level ${level} use significantly impairs mental health and decision-making capacity.`,
    smoking: `Smoking primarily damages cardiovascular and respiratory systems. Level ${level} smoking dramatically reduces physical health and life expectancy.`,
    alcohol: `Alcohol consumption primarily affects liver function and overall health. Level ${level} consumption significantly impacts multiple organ systems.`,
    chronic_stress: `Chronic stress primarily elevates cortisol levels, severely impacting mental health. Level ${level} stress disrupts sleep, immunity, and emotional regulation.`,
    processed_diet: `Ultra-processed foods primarily disrupt metabolic health through inflammation and insulin resistance. Level ${level} consumption significantly affects physical wellbeing.`,
    sedentary: `Sedentary behavior primarily reduces physical fitness and cardiovascular health. Level ${level} inactivity significantly impacts strength and endurance.`,
    social_isolation: `Social isolation primarily affects happiness and mental wellbeing. Level ${level} isolation significantly reduces life satisfaction and emotional health.`,
    pornography: `Excessive pornography consumption primarily affects mental health through dopamine dysregulation. Level ${level} use impacts emotional and cognitive function.`,
    gaming: `Excessive gaming primarily affects cognitive function and attention span. Level ${level} gaming significantly impacts focus and mental clarity.`,
    
    // Beneficial habits
    sleep_consistency: `Quality sleep is the foundation of health, providing universal recovery benefits. Level ${level} sleep consistency dramatically improves all health metrics.`,
    exercise: `Physical exercise primarily boosts mental health through endorphins and neuroplasticity. Level ${level} activity significantly improves mood and life satisfaction.`,
    healthy_diet: `A healthy diet provides broad anti-inflammatory and nutritional benefits. Level ${level} nutrition significantly supports multiple body systems.`,
    hydration: `Proper hydration supports all cellular functions and physical performance. Level ${level} hydration significantly improves cognitive and physical function.`,
    social_connection: `Strong social connections primarily boost happiness and emotional wellbeing. Level ${level} social engagement significantly improves life satisfaction.`,
    meditation: `Meditation primarily reduces stress through parasympathetic activation. Level ${level} practice significantly improves stress management and mental clarity.`,
    reading: `Regular reading primarily enhances cognitive function and mental stimulation. Level ${level} reading significantly improves focus and knowledge retention.`,
    journaling: `Reflective writing primarily supports mental health through emotional processing. Level ${level} journaling significantly improves self-awareness and stress management.`
  };
  
  return explanations[habitId] || `This habit has specialized impact on ${primaryStat} at level ${level}.`;
};

/**
 * Generate prioritized recommendations based on specialized impacts
 */
const generatePrioritizedRecommendations = (habits: HabitLevels, exponentialFactors: any) => {
  const recommendations = [];
  
  // Critical recommendations - address most harmful habits first
  const criticalHarmful = ['drugs', 'smoking', 'chronic_stress', 'alcohol'];
  criticalHarmful.forEach(habitId => {
    const level = habits[habitId]?.level || 0;
    if (level > 0) {
      const habit = habitsData.habits.find(h => h.id === habitId);
      recommendations.push({
        priority: 'critical' as const,
        action: `Reduce ${habit?.name.toLowerCase()} immediately`,
        rationale: `This habit has severe specialized negative effects on your primary health systems.`,
        expectedImpact: `Reducing this could improve your primary affected health metric by 10-15%.`
      });
    }
  });
  
  // High priority - implement most beneficial habits
  const criticalBeneficial = ['sleep_consistency', 'exercise', 'healthy_diet'];
  criticalBeneficial.forEach(habitId => {
    const level = habits[habitId]?.level || 0;
    if (level < 2) {
      const habit = habitsData.habits.find(h => h.id === habitId);
      recommendations.push({
        priority: 'high' as const,
        action: `Increase ${habit?.name.toLowerCase()}`,
        rationale: `This habit provides specialized benefits that significantly improve your primary health systems.`,
        expectedImpact: `Improving this could increase your primary health metric by 8-12%.`
      });
    }
  });
  
  // Moderate priority - optimize specialized beneficial habits
  if (recommendations.length < 5) {
    const moderateBeneficial = ['social_connection', 'hydration', 'meditation'];
    moderateBeneficial.forEach(habitId => {
      const level = habits[habitId]?.level || 0;
      if (level < 3) {
        const habit = habitsData.habits.find(h => h.id === habitId);
        recommendations.push({
          priority: 'moderate' as const,
          action: `Improve ${habit?.name.toLowerCase()}`,
          rationale: `This habit provides specialized benefits for your targeted health areas.`,
          expectedImpact: `Could improve your specialized health metrics by 5-8%.`
        });
      }
    });
  }
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
};