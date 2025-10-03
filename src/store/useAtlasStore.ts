import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateExponentialHealth } from '../utils/exponentialHealthCalculator';

export interface HabitLevel {
  level: number;
}

export interface HabitLevels {
  [key: string]: HabitLevel;
}

interface MeterStats {
  cardioStrain: number;
  inflammation: number;
  sleepQuality: number;
  stressLoad: number;
  recoveryCapacity: number;
  cognitiveFunction: number;
  immuneSystem: number;
  metabolicHealth: number;
}

interface Meters {
  health: number;
  happiness: number;
  qualityOfLife: number;
  mentalHealth: number;
  lifeExpectancy: number;
  diseaseRisk: number;
  physicalFitness: number;
  overallWellness: number;
  stats: MeterStats;
  exponentialFactors: {
    positive: Array<{ habit: string, impact: number, explanation: string }>;
    negative: Array<{ habit: string, impact: number, explanation: string }>;
  };
  organHealth: Record<string, number>;
  prioritizedRecommendations: Array<{
    priority: 'critical' | 'high' | 'moderate';
    action: string;
    rationale: string;
    expectedImpact: string;
  }>;
}

interface AccessibilitySettings {
  reduceMotion: boolean;
  highContrast: boolean;
}

interface AtlasState {
  selectedHabits: HabitLevels;
  meters: Meters;
  focusOrganId: string | undefined;
  compareMode: 'off' | 'before' | 'after';
  comparisonData: {
    beforeHabits: HabitLevels;
    beforeMeters: Meters;
    afterHabits: HabitLevels;
    afterMeters: Meters;
  } | null;
  accessibility: AccessibilitySettings;
  setHabitLevel: (habitId: string, level: number) => void;
  setFocusOrgan: (organId: string | undefined) => void;
  setCompareMode: (mode: 'off' | 'before' | 'after') => void;
  getCurrentDisplayData: () => { habits: HabitLevels; meters: Meters };
  toggleReduceMotion: () => void;
  toggleHighContrast: () => void;
}

/**
 * EXPONENTIAL HEALTH IMPACT SYSTEM
 * 
 * This system implements specialized, realistic impacts for each habit based on
 * medical research. Each habit has primary, secondary, and minimal effects rather
 * than broad impacts across all metrics.
 * 
 * Based on epidemiological studies and longitudinal health research.
 */
const calculateMeters = (habits: HabitLevels): Meters => {
  // Use specialized health calculation system
  const healthResult = calculateExponentialHealth(habits);
  
  // Extract values from specialized calculation
  const health = healthResult.overallHealth;
  const physicalHealth = healthResult.riskAssessment.physicalHealth;
  const mentalHealth = healthResult.riskAssessment.mentalHealth;
  const lifeExpectancy = healthResult.riskAssessment.lifeExpectancy;
  const diseaseRisk = healthResult.riskAssessment.diseaseRisk;
  
  // Calculate happiness based on social and mental factors
  const socialLevel = habits.social_connection?.level || 0;
  const stressLevel = habits.chronic_stress?.level || 0;
  const exerciseLevel = habits.exercise?.level || 0;
  const happiness = Math.max(10, Math.min(100, 50 + (socialLevel * 12) + (exerciseLevel * 8) - (stressLevel * 15)));
  
  // Calculate physical fitness based on exercise and sedentary behavior
  const sedentaryLevel = habits.sedentary?.level || 0;
  const physicalFitness = Math.max(10, Math.min(100, 50 + (exerciseLevel * 15) - (sedentaryLevel * 12)));
  
  // Calculate composite metrics
  const qualityOfLife = Math.max(10, Math.min(100, (health + happiness + mentalHealth) / 3));
  const overallWellness = Math.max(10, Math.min(100, (health + happiness + physicalFitness) / 3));
  
  // Calculate detailed stats based on specialized factors
  const sleepLevel = habits.sleep_consistency?.level || 0;
  const hydrationLevel = habits.hydration?.level || 0;
  const meditationLevel = habits.meditation?.level || 0;
  const alcoholLevel = habits.alcohol?.level || 0;
  const smokingLevel = habits.smoking?.level || 0;
  const processedDietLevel = habits.processed_diet?.level || 0;
  
  const stats: MeterStats = {
    cardioStrain: Math.max(0, Math.min(10, 5 + (smokingLevel * 1.5) + (sedentaryLevel * 1.2) - (exerciseLevel * 1.8))),
    inflammation: Math.max(0, Math.min(10, 5 + (processedDietLevel * 1.4) + (stressLevel * 1.1) - ((habits.healthy_diet?.level || 0) * 1.3))),
    sleepQuality: Math.max(0, Math.min(10, 5 + (sleepLevel * 1.6) - (stressLevel * 1.2) - ((habits.gaming?.level || 0) * 0.8))),
    stressLoad: Math.max(0, Math.min(10, 5 + (stressLevel * 1.8) - (meditationLevel * 1.4) - ((habits.social_connection?.level || 0) * 0.6))),
    recoveryCapacity: Math.max(0, Math.min(10, 5 + (sleepLevel * 1.5) + (exerciseLevel * 1.0) - (alcoholLevel * 1.2))),
    cognitiveFunction: Math.max(0, Math.min(10, 5 + ((habits.reading?.level || 0) * 1.3) + (sleepLevel * 1.1) - ((habits.drugs?.level || 0) * 2.0))),
    immuneSystem: Math.max(0, Math.min(10, 5 + ((habits.healthy_diet?.level || 0) * 1.2) + (sleepLevel * 1.0) - (stressLevel * 1.1))),
    metabolicHealth: Math.max(0, Math.min(10, 5 + (exerciseLevel * 1.3) + ((habits.healthy_diet?.level || 0) * 1.1) - (processedDietLevel * 1.4))),
  };
  
  return {
    health,
    happiness,
    qualityOfLife,
    mentalHealth,
    lifeExpectancy,
    diseaseRisk,
    physicalFitness,
    overallWellness,
    stats,
    exponentialFactors: healthResult.exponentialFactors,
    organHealth: healthResult.organHealth,
    prioritizedRecommendations: healthResult.prioritizedRecommendations,
  };
};

export const useAtlasStore = create<AtlasState>()(
  persist(
    (set, get) => ({
      selectedHabits: {},
      meters: calculateMeters({}),
      focusOrganId: undefined,
      compareMode: 'off',
      comparisonData: null,
      accessibility: {
        reduceMotion: false,
        highContrast: false,
      },
      
      setHabitLevel: (habitId: string, level: number) => {
        // Validate input
        if (typeof level !== 'number' || level < 0 || level > 3 || !Number.isInteger(level)) {
          console.error(`Invalid habit level: ${level} for habit ${habitId}`);
          return;
        }
        
        const currentHabits = get().selectedHabits;
        const newHabits = {
          ...currentHabits,
          [habitId]: { level }
        };
        
        try {
          const newMeters = calculateMeters(newHabits);
          const currentState = get();
          
          // Update comparison data if in comparison mode
          let updatedComparisonData = currentState.comparisonData;
          if (currentState.compareMode !== 'off' && currentState.comparisonData) {
            updatedComparisonData = {
              ...currentState.comparisonData,
              afterHabits: newHabits,
              afterMeters: newMeters
            };
          }
          
          set({
            selectedHabits: newHabits,
            meters: newMeters,
            comparisonData: updatedComparisonData
          });
        } catch (error) {
          console.error('Error calculating meters:', error);
        }
      },
      
      setFocusOrgan: (organId: string | undefined) => {
        set({ focusOrganId: organId });
      },
      
      setCompareMode: (mode: 'off' | 'before' | 'after') => {
        const currentState = get();
        
        if (mode !== 'off' && currentState.compareMode === 'off') {
          // Starting comparison - save current state as "before"
          const beforeHabits = { ...currentState.selectedHabits };
          const beforeMeters = { ...currentState.meters };
          
          set({
            compareMode: mode,
            comparisonData: {
              beforeHabits,
              beforeMeters,
              afterHabits: { ...beforeHabits },
              afterMeters: { ...beforeMeters }
            }
          });
        } else if (mode === 'off') {
          // Ending comparison - clear comparison data
          set({
            compareMode: 'off',
            comparisonData: null
          });
        } else {
          // Just switching between before/after
          set({ compareMode: mode });
        }
      },
      
      getCurrentDisplayData: () => {
        const state = get();
        
        if (state.compareMode === 'off' || !state.comparisonData) {
          return {
            habits: state.selectedHabits,
            meters: state.meters
          };
        }
        
        if (state.compareMode === 'before') {
          return {
            habits: state.comparisonData.beforeHabits,
            meters: state.comparisonData.beforeMeters
          };
        } else {
          // 'after' mode - show current state
          return {
            habits: state.selectedHabits,
            meters: state.meters
          };
        }
      },
      
      toggleReduceMotion: () => {
        set((state) => ({
          accessibility: {
            ...state.accessibility,
            reduceMotion: !state.accessibility.reduceMotion,
          },
        }));
      },
      
      toggleHighContrast: () => {
        set((state) => ({
          accessibility: {
            ...state.accessibility,
            highContrast: !state.accessibility.highContrast,
          },
        }));
      },
    }),
    {
      name: 'atlas-habits-storage',
      version: 3, // Incremented version for rebalanced calculation system
      migrate: (persistedState: any, version: number) => {
        // For any version prior to 3, return default state to prevent migration errors
        if (version < 3) {
          return {
            selectedHabits: {},
            meters: calculateMeters({}),
            focusOrganId: undefined,
            compareMode: 'off',
            accessibility: {
              reduceMotion: false,
              highContrast: false,
            },
          };
        }
        return persistedState;
      },
    }
  )
);