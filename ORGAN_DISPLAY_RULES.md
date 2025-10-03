# Organ Display Rules and Health Metric Documentation

## Overview
This document specifies the conditional display rules for organs in the health monitoring application, defining how health metrics translate to visual representations and user feedback.

## Health Status Categories

### 1. Overall Health Status Levels
Based on the `organHealth` value (0-100 scale):

| Status | Health Range | Visual Indicator | User Communication |
|--------|-------------|------------------|-------------------|
| **Excellent** | 80-100% | Healthy color, high opacity (0.8-1.0) | "Excelente estado" |
| **Good** | 60-79% | Slightly affected color, moderate opacity (0.6-0.79) | "Bom estado" |
| **Fair** | 40-59% | Moderately affected color, reduced opacity (0.4-0.59) | "Estado preocupante" |
| **Poor** | 20-39% | Significantly affected color, low opacity (0.3-0.39) | "Estado crítico" |
| **Critical** | <20% | Affected color, minimum opacity (0.3) | "Requer atenção médica urgente" |

### 2. Color Interpolation System
Each organ transitions between two colors based on health:
- **healthyColor**: Displayed when organ health is at 100%
- **affectedColor**: Displayed when organ health approaches 0%
- **Interpolation formula**: Color is calculated proportionally based on health percentage

Example (from MapaDoCorpo.tsx):
```typescript
const healthRatio = organHealth / 100;
const r = baseColor_r * healthRatio + affectedColor_r * (1 - healthRatio);
// Similar for g and b channels
```

## Organ-Specific Display Rules

### Brain (Cérebro)
**Base Health**: 80/100 (from exponentialHealthCalculator.ts)

**Visual States:**
- **Excellent (80-100%)**: Pink (#ffa8a8), Full opacity
  - Indicates: Low depression/anxiety risk (<10%)
  - Population context: Better than 79% experiencing mental health symptoms

- **Good (60-79%)**: Transitioning to affected color
  - Indicates: Moderate mental health risk (10-20%)
  - Population context: Below average for depression/anxiety prevalence

- **Fair (40-59%)**: More affected color (#cc4444)
  - Indicates: High mental health risk (20-30%)
  - Population context: At or above 21.4% depression prevalence threshold

- **Poor (20-39%)**: Significantly affected
  - Indicates: Critical mental health concerns
  - Action: Recommend professional mental health consultation

**Triggered by Habits:**
- **Negative impact**: drugs (4.0x), alcohol (2.8x), chronic_stress (3.0x)
- **Positive impact**: sleep_consistency (-3.0x), exercise (-2.5x)

**Statistical Context:**
- 21.4% of US adults experience depression symptoms
- 19.1% have anxiety disorders
- 40% of people 65+ experience memory loss
- 1 in 9 Americans 65+ have Alzheimer's

### Heart (Coração)
**Base Health**: 75/100

**Visual States:**
- **Excellent (80-100%)**: Healthy red (#ff6b6b)
  - Indicates: <5% cardiovascular disease risk
  - Population context: Better than 5% baseline CAD prevalence

- **Good (60-79%)**: Moderate health
  - Indicates: 5-10% CVD risk
  - Population context: Approaching population baseline

- **Fair (40-59%)**: Affected red (#cc1f1f)
  - Indicates: 10-25% CVD risk
  - Population context: Above population risk, multiple risk factors

- **Poor/Critical (<40%)**: Severely affected
  - Indicates: >25% CVD risk, multiple severe risk factors
  - Action: Immediate lifestyle changes, medical consultation

**Triggered by Habits:**
- **Negative impact**: smoking (3.0x), chronic_stress (2.5x), sedentary behavior
- **Positive impact**: exercise (-3.0x), social_connection (-2.0x)

**Statistical Context:**
- 32% of global deaths are cardiovascular (17.9M annually)
- 5% of US adults 20+ have coronary heart disease
- Smoking increases risk 2-4x; current smokers: 5x risk
- Sedentary behavior (>8h/day): 32% higher CVD mortality

### Lungs (Pulmões)
**Base Health**: 78/100

**Visual States:**
- **Excellent (80-100%)**: Healthy pink (#ff9999)
  - Indicates: <5% COPD risk
  - Population context: Well below 12.64% global COPD prevalence

- **Good (60-79%)**: Slight discoloration
  - Indicates: 5-12% respiratory disease risk
  - Population context: Approaching population baseline

- **Fair (40-59%)**: Affected (#cc3333)
  - Indicates: >12% COPD risk, significant respiratory compromise
  - Population context: At or above 12.64% global COPD prevalence

- **Critical (<40%)**: Severely compromised
  - Action: Smoking cessation essential, pulmonary function testing recommended

**Triggered by Habits:**
- **Negative impact**: smoking (3.5x - highest vulnerability)
- **Positive impact**: exercise (-2.0x)

**Statistical Context:**
- 12.64% of adults 40+ have COPD globally
- 4.2% of US adults diagnosed with COPD
- Smokers: 15-30x increased lung cancer risk
- Projection: 600M COPD cases by 2050

### Liver (Fígado)
**Base Health**: 76/100

**Visual States:**
- **Excellent (80-100%)**: Healthy brown (#cc7a5c)
  - Indicates: <5% liver disease risk
  - Population context: Well below 4.8% ARLD prevalence

- **Good (60-79%)**: Moderate compromise
  - Indicates: 5-15% liver disease risk
  - Population context: Approaching population baseline

- **Fair (40-59%)**: Affected (#994433)
  - Indicates: 15-30% liver disease risk
  - Population context: At risk for NAFLD (affects 25-30% globally)

- **Critical (<40%)**: Severe hepatic compromise
  - Action: Alcohol cessation, weight management, hepatology consultation

**Triggered by Habits:**
- **Negative impact**: alcohol (3.8x - highest), processed_diet (2.0x)
- **Positive impact**: healthy_diet (-2.5x)

**Statistical Context:**
- 4.8% global ARLD prevalence
- 25-30% of adults have NAFLD
- Alcohol-related cirrhosis: 32.9% of ARLD cases
- 23.9% mortality rate for ARLD
- US: 3x increase in alcoholic cirrhosis deaths (1999-2019)

### Kidneys (Rins)
**Base Health**: 82/100

**Visual States:**
- **Excellent (80-100%)**: Healthy brown (#8B4513)
  - Indicates: Optimal kidney function, <5% chronic kidney disease risk
  - Population context: Well-managed blood pressure and glucose

- **Good (60-79%)**: Mild stress
  - Indicates: 5-15% CKD risk, possible early dysfunction
  - Population context: Elevated risk from hypertension/diabetes

- **Fair (40-59%)**: Moderate dysfunction (#654321)
  - Indicates: 15-40% CKD risk
  - Population context: Diabetic nephropathy range (20-40% of diabetics)

- **Critical (<40%)**: Severe renal impairment
  - Action: Nephrology referral, dialysis consideration

**Triggered by Habits:**
- **Negative impact**: drugs (3.2x), chronic_stress (1.8x)
- **Positive impact**: hydration (-2.8x)

**Statistical Context:**
- 537M people globally have diabetes (10.5%)
- Projected 783M by 2045
- 20-40% of diabetics develop nephropathy
- 25-34% of US adults have metabolic syndrome

### Gut (Intestino)
**Base Health**: 72/100

**Visual States:**
- **Excellent (80-100%)**: Healthy tan (#DEB887)
  - Indicates: High microbiome diversity, <5% IBD risk
  - Population context: Optimal digestive health

- **Good (60-79%)**: Moderate gut health
  - Indicates: Reduced microbiome diversity, mild inflammation
  - Population context: Below optimal but manageable

- **Fair (40-59%)**: Compromised (#CD853F)
  - Indicates: Significant dysbiosis, elevated inflammation (34.6% population)
  - Population context: Chronic inflammatory state common in Western populations

- **Critical (<40%)**: Severe gut dysfunction
  - Action: Gastroenterology consultation, comprehensive stool analysis

**Triggered by Habits:**
- **Negative impact**: processed_diet (3.0x), chronic_stress (2.2x)
- **Positive impact**: healthy_diet (-2.8x)

**Statistical Context:**
- 2.4-3.1M Americans have IBD
- 5-7% of Western society has immune-mediated inflammatory diseases
- 34.6% of US adults have systemic inflammation
- Western diets reduce microbiome diversity 25-40%

### Skin (Pele)
**Base Health**: 77/100

**Visual States:**
- **Excellent (80-100%)**: Healthy peachy (#FDBCB4)
  - Indicates: Good hydration, minimal oxidative stress
  - Population context: Optimal skin barrier function

- **Good (60-79%)**: Slight compromise
  - Indicates: Mild dehydration or stress-related changes

- **Fair (40-59%)**: Visible compromise (#E6967A)
  - Indicates: Significant premature aging, inflammation
  - Population context: Noticeable stress/lifestyle impact

- **Poor (<40%)**: Severe compromise
  - Action: Dermatology consultation for inflammatory conditions

**Triggered by Habits:**
- **Negative impact**: smoking (2.5x), chronic_stress (2.0x)
- **Positive impact**: hydration (-2.2x)

### Bladder (Bexiga)
**Base Health**: 80/100

**Visual States:**
- **Excellent (80-100%)**: Healthy cream (#FFE4B5)
  - Indicates: Normal bladder function, adequate hydration

- **Good (60-79%)**: Mild irritation
  - Indicates: Occasional urgency or minor dysfunction

- **Fair (40-59%)**: Compromised (#DEB887)
  - Indicates: Hyperactive bladder, frequent infections

- **Critical (<40%)**: Severe dysfunction
  - Action: Urology consultation

**Triggered by Habits:**
- **Negative impact**: alcohol (2.2x), chronic_stress (1.8x)
- **Positive impact**: hydration (-2.5x)

## Habit Impact Multipliers

### High Impact Habits (3.0x - 4.0x)
These habits have the most severe effects on specific organs:
- **Drugs on Brain**: 4.0x (most severe single impact)
- **Alcohol on Liver**: 3.8x
- **Smoking on Lungs**: 3.5x
- **Drugs on Kidneys**: 3.2x
- **Smoking on Heart**: 3.0x
- **Processed Diet on Gut**: 3.0x
- **Chronic Stress on Brain**: 3.0x

### Moderate Impact Habits (2.0x - 2.9x)
- **Alcohol on Brain**: 2.8x
- **Chronic Stress on Heart**: 2.5x
- **Smoking on Skin**: 2.5x
- **Chronic Stress on Gut**: 2.2x
- **Alcohol on Bladder**: 2.2x

### Beneficial Habit Multipliers (Negative values = improvement)
- **Sleep Consistency on Brain**: -3.0x
- **Exercise on Heart**: -3.0x
- **Hydration on Kidneys**: -2.8x
- **Healthy Diet on Gut**: -2.8x
- **Exercise on Brain**: -2.5x
- **Healthy Diet on Liver**: -2.5x
- **Hydration on Bladder**: -2.5x

## Visual Feedback Priority System

### Priority 1: Critical Organs (Health <40%)
- **Display**: Maximum visual emphasis with affected color and stroke
- **Alert**: Red border or pulsing effect (if motion not reduced)
- **Message**: "Requer atenção médica urgente" or "Estado crítico"
- **Action**: Immediate medical consultation recommended

### Priority 2: Compromised Organs (Health 40-59%)
- **Display**: Affected color, moderate opacity
- **Alert**: Yellow/orange stroke on hover
- **Message**: "Estado preocupante" with specific habit impacts
- **Action**: Lifestyle modification recommendations

### Priority 3: Suboptimal Organs (Health 60-79%)
- **Display**: Transitional color between healthy and affected
- **Alert**: Subtle color change on hover
- **Message**: "Alguns sinais de stress"
- **Action**: Preventive measures suggested

### Priority 4: Healthy Organs (Health 80-100%)
- **Display**: Healthy color, full opacity
- **Alert**: Blue stroke on selection/focus
- **Message**: "Excelente estado"
- **Action**: Maintenance recommendations

## Interaction States

### Default State
- Organ displays at calculated health color and opacity
- No stroke or minimal stroke
- Subtle shadow for depth

### Hover State
- Stroke color changes to blue (#3b82f6) or health-appropriate color
- Stroke width increases to 2px
- Scale transform: 1.05x (if reduceMotion is false)
- Cursor changes to pointer

### Focus/Selected State
- Stroke color: Blue (#3b82f6) for all health levels
- Stroke width: 3px
- Scale maintained
- Detail panel displays with:
  - Organ name and system
  - Current health percentage
  - Affecting habits (top 3 harmful, top 3 beneficial)
  - Personalized message
  - Statistical context
  - Recommendations

### High Contrast Mode
- Overrides color interpolation
- Green (health >70%), Yellow (40-70%), Red (<40%)
- Increased contrast ratio for accessibility

## Statistical Context Integration

Each organ's visual state should be interpreted against population statistics:

### Example: Brain at 60% Health
- **Visual**: Transitioning color, moderate opacity
- **User message**: "Estado preocupante, principalmente devido ao stress crónico"
- **Context**: "21.4% dos adultos experienciam sintomas de depressão (1 em 5)"
- **Comparison**: User is at higher risk than population baseline
- **Action**: "Recomenda-se aumentar exercício e melhorar qualidade do sono"

### Example: Heart at 50% Health
- **Visual**: Moderately affected color (#cc1f1f mixed with healthy)
- **User message**: "Estado preocupante, múltiplos fatores de risco"
- **Context**: "5% têm doença coronária; tabagismo aumenta risco em 2-4x"
- **Comparison**: User has elevated risk equivalent to 10-20% population risk
- **Action**: "Cessar tabagismo e aumentar atividade física urgentemente"

## Accessibility Considerations

### reduceMotion: true
- Disable scale transforms on hover
- Disable pulsing effects
- Maintain color and opacity changes only
- All transitions set to duration: 0

### highContrast: true
- Override subtle color interpolations
- Use high-contrast color scheme:
  - Green #00ff00 (health >70%)
  - Yellow #ffff00 (40-70%)
  - Red #ff0000 (<40%)
- Increase contrast filter on SVG: 1.5x
- Bold text and larger font sizes in tooltips

## Development Guidelines

### When to Update Visual State
1. **Habit level changes**: Immediate recalculation
2. **Comparison mode toggle**: Switch between before/after states
3. **Accessibility setting changes**: Immediate visual update
4. **Organ focus changes**: Update stroke and scale

### State Management Flow
```
User changes habit →
setHabitLevel() →
calculateMeters() →
calculateExponentialHealth() →
Update organHealth values →
getOrganColor() & getOrganOpacity() →
Visual update
```

### Performance Considerations
- Color interpolation performed on each render
- Memoize organ health calculations when possible
- Debounce multiple habit changes (100ms)
- Use CSS transitions for smooth visual changes (duration: 500ms)

## Future Enhancements

### Potential Additions
1. **Animated health change indicators**: Show arrows when health improves/declines
2. **Historical health tracking**: Display 30-day health trends per organ
3. **Comparative statistics**: Show user's health vs. age/gender cohort
4. **Risk prediction**: Calculate 5-year and 10-year disease risk
5. **Personalized goals**: Set target health levels with progress tracking
6. **Medical record integration**: Import lab values for more accurate assessment

### Statistical Updates
- Update statistics annually from latest CDC, WHO, medical literature
- Reference: `/src/data/healthStatistics.json`
- Maintain source citations and data collection years
- Document any methodology changes

## References

All statistics and medical information sourced from:
- CDC (Centers for Disease Control and Prevention) 2024
- WHO (World Health Organization) 2024
- Peer-reviewed medical journals (JAMA, BMC, Lancet, Nature)
- National health surveys (NHANES, NHIS)
- Professional medical associations (AHA, Alzheimer's Association, AASM)

Last updated: 2025-10-03
Data year range: 2020-2025
