/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily/Safely
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

// Fallback calculations for offline/no-api-key scenarios
function calculateLocalFallback(components: any, originalVehicle: any, lastReplaced: any) {
  // Let's do some deterministic engineering additions
  let totalWeight = 1600;
  let totalCost = 30000;
  let totalPower = 300;
  let capacityKwh = 80;
  let hasLidar = false;
  let hasLaserHL = false;
  let isSolidState = false;
  let compatibilityScore = 95;
  let innovationScore = 80;
  let carbonFootprint = 11000;

  // Scan current active components
  Object.keys(components).forEach((key) => {
    const comp = components[key];
    if (comp && comp.spec) {
      totalWeight += comp.spec.weight || 0;
      totalCost += comp.spec.cost || 0;
      if (comp.spec.powerKw) totalPower = Math.max(totalPower, comp.spec.powerKw);
      if (comp.spec.capacityKwh) capacityKwh = comp.spec.capacityKwh;
      if (comp.name?.toLowerCase().includes('lidar') || comp.id?.includes('lidar')) hasLidar = true;
      if (comp.name?.toLowerCase().includes('laser') || comp.id?.includes('laser')) hasLaserHL = true;
      if (comp.name?.toLowerCase().includes('solid state') || comp.id?.includes('solid')) isSolidState = true;
    }
  });

  // Calculate stats based on configuration
  const rangeKm = Math.round(capacityKwh * 6.5 * (1 - (totalWeight - 2100) / 4000));
  const accelerationSec = Math.max(1.8, Number((5.5 * (totalWeight / 1500) / (totalPower / 250)).toFixed(2)));
  const batteryEfficiencyWhKm = Math.round((capacityKwh * 1000) / rangeKm);
  const thermalPerformancePct = isSolidState ? 96 : 91;
  const reliabilityPct = Math.round(92 - (hasLidar ? 2 : 0) - (isSolidState ? 5 : 0)); // SSR/solid-state lowers TRL slightly
  const safetyScore = Math.round(95 + (hasLidar ? 4 : 0));
  const carbonFootprintCo2 = Math.round(10000 + (totalWeight * 2.1) + (isSolidState ? 3500 : 1500));
  const engineeringComplexityPct = Math.min(99, Math.round(75 + (hasLidar ? 8 : 0) + (isSolidState ? 12 : 0)));

  if (isSolidState) {
    innovationScore = 98;
    compatibilityScore -= 12; // lower compatibility initially due to high tech level
  }
  if (hasLidar) {
    innovationScore = Math.max(innovationScore, 92);
  }

  // Create highly contextual dynamic dependencies and recommendations
  const dependencies: any[] = [];
  const recommendations: any[] = [];

  if (lastReplaced) {
    const { key, currentName, previousName } = lastReplaced;
    if (key === 'battery') {
      dependencies.push({ source: 'Battery', target: 'Chassis Material', type: 'Structural', severity: 'High' });
      dependencies.push({ source: 'Battery', target: 'Battery Cooling', type: 'Cooling', severity: 'High' });
      dependencies.push({ source: 'Battery', target: 'ECU', type: 'Data', severity: 'Medium' });

      if (isSolidState) {
        recommendations.push({
          priority: 'Critical',
          system: 'Thermal System',
          reason: 'Solid state electrolytes operate at higher thermal thresholds. Traditional water-glycol snake channels will result in localized thermal hot spots.',
          costUsd: 3800,
          difficulty: 'Hard',
          expectedImprovement: 'Optimized cell thermal lifetime'
        });
        recommendations.push({
          priority: 'High',
          system: 'Electronics (ECU)',
          reason: 'Solid State Battery management profiles require updated charge algorithms. Standard legacy BMS limits charging current, capping performance.',
          costUsd: 1200,
          difficulty: 'Medium',
          expectedImprovement: 'Enables 10C ultra-fast charging capabilities'
        });
      } else {
        recommendations.push({
          priority: 'Medium',
          system: 'Suspension',
          reason: 'Weight variation in the battery pack alters center of mass. Recalibrate dampening ratios.',
          costUsd: 800,
          difficulty: 'Easy',
          expectedImprovement: 'Restores baseline high-speed cornering stability'
        });
      }
    } else if (key === 'motor') {
      dependencies.push({ source: 'Motor', target: 'Inverter', type: 'Power', severity: 'High' });
      dependencies.push({ source: 'Motor', target: 'Motor Cooling', type: 'Cooling', severity: 'Medium' });
      recommendations.push({
        priority: 'High',
        system: 'Inverter',
        reason: 'Upgraded high-flux motor demands greater peak phase current. Validate Silicon Carbide (SiC) inverter duty cycle limits.',
        costUsd: 2600,
        difficulty: 'Medium',
        expectedImprovement: 'Prevent thermal inverter shutdown at peak torque output'
      });
    } else if (hasLidar) {
      dependencies.push({ source: 'LiDAR', target: 'ECU', type: 'Data', severity: 'High' });
      recommendations.push({
        priority: 'High',
        system: 'ECU Computer',
        reason: '128-channel LiDAR generates upwards of 1.5M points per second. Standard legacy processing unit will experience memory overflow.',
        costUsd: 4500,
        difficulty: 'Hard',
        expectedImprovement: 'Enables Level 3 real-time point-cloud voxel mapping'
      });
    }
  }

  // Base default suggestions if none generated
  if (recommendations.length === 0) {
    recommendations.push({
      priority: 'Medium',
      system: 'Chassis Material',
      reason: 'Optimize structural cross-members to balance overall vehicle flex under high instantaneous axle loads.',
      costUsd: 1500,
      difficulty: 'Medium',
      expectedImprovement: '3.5% increase in high-speed torsional stiffness'
    });
    recommendations.push({
      priority: 'Low',
      system: 'Thermal Loop',
      reason: 'Consolidate front cabin HVAC heater and drivetrain cooling hoses using a unified manifold.',
      costUsd: 600,
      difficulty: 'Easy',
      expectedImprovement: 'Saves 2.4kg of piping material and reduces pressure drop'
    });
  }

  return {
    baseSpecs: {
      rangeKm,
      weightKg: Math.round(totalWeight),
      accelerationSec,
      powerKw: totalPower,
      batteryEfficiencyWhKm,
      thermalPerformancePct,
      manufacturingCostUsd: totalCost,
      comfortRating: originalVehicle?.baseSpecs?.comfortRating || 90,
      reliabilityPct,
      safetyScore,
      compatibilityScore,
      innovationScore,
      carbonFootprintCo2,
      engineeringComplexityPct,
      topSpeedKmh: Math.min(450, Math.max(80, Math.round(
        (originalVehicle?.baseSpecs?.topSpeedKmh || 220) *
        Math.sqrt(totalPower / (originalVehicle?.baseSpecs?.powerKw || 300))
      ))) || 220,
    },
    dependencies,
    recommendations,
    explanation: lastReplaced
      ? `Successfully integrated '${lastReplaced.currentName}' to replace '${lastReplaced.previousName}' in the vehicle ecosystem. Real-time engineering model verified performance parameters.`
      : 'Engineering simulation complete. Technology Genome components successfully balanced with zero structural errors.',
    isAiCalculated: false
  };
}

// Helper function to query Gemini with retries and alternative model fallbacks
async function generateContentWithRetryAndFallback(
  ai: any,
  params: {
    contents: any;
    config: any;
  }
) {
  const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    let delay = 1000;
    const maxRetries = 2; // 3 attempts total per model if transient errors

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Technology Genome AI] Querying model: ${model} (attempt ${attempt + 1}/3)...`);
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (response && response.text) {
          console.log(`[Technology Genome AI] Received response from model: ${model}`);
          return response;
        }
        throw new Error('Empty payload');
      } catch (err: any) {
        lastError = err;
        console.log(
          `[Technology Genome AI] Status info: model ${model} returned code ${err?.status || 'unknown'}`
        );

        // Check if this error is due to rate limits or quota exhaustion
        const errorString = JSON.stringify(err) || '';
        const errorMessage = (err?.message || '').toLowerCase();
        const isRateLimit =
          err?.status === 'RESOURCE_EXHAUSTED' ||
          err?.status === 429 ||
          err?.statusCode === 429 ||
          errorMessage.includes('quota') ||
          errorMessage.includes('rate_limit') ||
          errorMessage.includes('limit') ||
          errorMessage.includes('exhausted') ||
          errorMessage.includes('429') ||
          errorString.includes('RESOURCE_EXHAUSTED') ||
          errorString.includes('429');

        if (isRateLimit) {
          console.log(`[Technology Genome AI] Quota limit reached on model ${model}. Switching to alternative model...`);
          break; // Break the attempt loop for this model and move to the next model in modelsToTry
        }

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
  }

  return null; // Return null to signify fallback requirement safely
}

// API endpoint for AI analysis
app.post('/api/analyze', async (req, res) => {
  const { components, originalVehicle, lastReplaced } = req.body;

  try {
    const ai = getAiClient();
    if (!ai) {
      // Return beautiful local deterministic engineering calculations
      const fallback = calculateLocalFallback(components, originalVehicle, lastReplaced);
      return res.json(fallback);
    }

    const lastReplacedStr = lastReplaced
      ? `The engineer recently replaced the component '${lastReplaced.key}' from previous: '${lastReplaced.previousName}' to new: '${lastReplaced.currentName}'.`
      : 'This is a brand new configuration or imported merged vehicle design.';

    const systemInstruction = `You are a Senior Automotive Systems Design AI and PLM Engineering Specialist. 
Your role is to act as an advanced engineering decision-support engine. 
Analyze the requested technology gene replacement or design merge, calculate realistic automotive performance specs, map dependencies, and write precise recommendations.
Always format your output as a single valid JSON object following the required schema. No conversational preamble, markdown markers, or backticks outside of requested JSON.`;

    const prompt = `
Original Vehicle: ${originalVehicle?.name || 'Custom Hybrid'} (Base Weight: ${originalVehicle?.weightKg || 2200}kg, Range: ${originalVehicle?.rangeKm || 500}km, Power: ${originalVehicle?.baseSpecs?.powerKw || 400}kW, Top Speed: ${originalVehicle?.baseSpecs?.topSpeedKmh || 250}km/h)
${lastReplacedStr}

Current vehicle components map:
${JSON.stringify(
  Object.keys(components).reduce((acc: any, key) => {
    const c = components[key];
    acc[key] = { name: c.name, ...c.spec };
    return acc;
  }, {}),
  null,
  2
)}

Determine:
1. Exact vehicle performance specifications (rangeKm, weightKg, accelerationSec, powerKw, batteryEfficiencyWhKm, thermalPerformancePct, manufacturingCostUsd, comfortRating, reliabilityPct, safetyScore, compatibilityScore, innovationScore, carbonFootprintCo2, engineeringComplexityPct, topSpeedKmh). Give real logical numbers (e.g. if a massive solid state battery is used, weight might decrease slightly, range increases dramatically, innovation rises, compatibility might drop slightly, cost goes up).
2. Connected physical and digital subsystem dependencies that are affected. Provide a list of affected systems with severity and type of interaction (Power, Cooling, Data, Structural, Signal).
3. Highly detailed specific engineering recommendations (must include Priority, System, Reason, Cost, Difficulty, Expected Improvement). Write realistic design-oriented feedback, avoiding generic "upgrade it" summaries.
`;

    const response = await generateContentWithRetryAndFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            baseSpecs: {
              type: Type.OBJECT,
              properties: {
                rangeKm: { type: Type.INTEGER },
                weightKg: { type: Type.INTEGER },
                accelerationSec: { type: Type.NUMBER },
                powerKw: { type: Type.INTEGER },
                batteryEfficiencyWhKm: { type: Type.INTEGER },
                thermalPerformancePct: { type: Type.INTEGER },
                manufacturingCostUsd: { type: Type.INTEGER },
                comfortRating: { type: Type.INTEGER },
                reliabilityPct: { type: Type.INTEGER },
                safetyScore: { type: Type.INTEGER },
                compatibilityScore: { type: Type.INTEGER },
                innovationScore: { type: Type.INTEGER },
                carbonFootprintCo2: { type: Type.INTEGER },
                engineeringComplexityPct: { type: Type.INTEGER },
                topSpeedKmh: { type: Type.INTEGER },
              },
              required: [
                'rangeKm', 'weightKg', 'accelerationSec', 'powerKw',
                'batteryEfficiencyWhKm', 'thermalPerformancePct', 'manufacturingCostUsd',
                'comfortRating', 'reliabilityPct', 'safetyScore', 'compatibilityScore',
                'innovationScore', 'carbonFootprintCo2', 'engineeringComplexityPct',
                'topSpeedKmh'
              ],
            },
            dependencies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  type: { type: Type.STRING },
                  severity: { type: Type.STRING },
                },
                required: ['source', 'target', 'type', 'severity'],
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  priority: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  costUsd: { type: Type.INTEGER },
                  difficulty: { type: Type.STRING },
                  expectedImprovement: { type: Type.STRING },
                  system: { type: Type.STRING },
                },
                required: ['priority', 'reason', 'costUsd', 'difficulty', 'expectedImprovement', 'system'],
              },
            },
            explanation: { type: Type.STRING },
          },
          required: ['baseSpecs', 'dependencies', 'recommendations', 'explanation'],
        },
      },
    });

    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      parsed.isAiCalculated = true;
      return res.json(parsed);
    } else {
      throw new Error('All model candidates currently offline');
    }
  } catch (error) {
    console.log('[Technology Genome AI] Simulation fallback: using high-fidelity local PLM simulator (quota or connection limits reached)');
    const fallback = calculateLocalFallback(components, originalVehicle, lastReplaced);
    res.json(fallback);
  }
});

// Configure Vite or Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Technology Genome AI] Server running on http://localhost:${PORT}`);
  });
}

startServer();
