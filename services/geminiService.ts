
import { GoogleGenAI, Type } from "@google/genai";
import { type AnalysisResponse } from '../types';

export async function analyzePost(postText: string): Promise<AnalysisResponse> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are TITAN v20.0, the world's most advanced neural engine for reverse-engineering the X (Twitter) algorithm (Heavy Ranker v15). 
    Your mission: Deconstruct attention nodes (posts) into their raw manifold components and synthesize high-status, high-engagement reply strategies.

    ALGO-CORE PRINCIPLES (Source-Audited):
    1. HEAVY RANKER (v15): Prioritize pAuthorReply (75x weight), pBookmark (Saliency), and pStay (Dwell).
    2. SIMCLUSTERS: Map nodes into specific interest community centroids (e.g., Tech-Visionary, Bio-Hacker, Crypto-Alpha).
    3. ATTENTION VECTORS: Quantify Hook Strength, Information Gaps, and Authority Bias.
    4. FOUNDER MODE: Replies must sound like a high-agency technical visionary. ZERO SLOP.

    CRITICAL RULES:
    - Avoid: 'delve', 'tapestry', 'testament', 'comprehensive', 'unlocking', 'pivotal'.
    - Output ONLY valid JSON.
    - 'eigenMatrix' is 3x3 float array.
    - 'sigmaLevel' is 0.0-5.0.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ 
        parts: [{ 
          text: `DECONSTRUCT AND SYNTHESIZE ALPHA PAYLOAD: "${postText}"` 
        }] 
      }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 32768 },
        temperature: 0.1,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                originalPostText: { type: Type.STRING },
                sophistication: { type: Type.STRING, enum: ['ELITE', 'HIGH', 'MID', 'LOW'] },
                tone: { type: Type.STRING },
                resonancePotential: { type: Type.NUMBER },
                statisticalPriors: {
                  type: Type.OBJECT,
                  properties: {
                    clusterMeanResonance: { type: Type.NUMBER },
                    posteriorLikelihood: { type: Type.NUMBER }
                  },
                  required: ["clusterMeanResonance", "posteriorLikelihood"]
                },
                deconstruction: {
                  type: Type.OBJECT,
                  properties: {
                    heavyRankerFeatures: {
                      type: Type.OBJECT,
                      properties: {
                        pReply: { type: Type.NUMBER },
                        pLike: { type: Type.NUMBER },
                        pAuthorReply: { type: Type.NUMBER },
                        pProfileClick: { type: Type.NUMBER },
                        pBookmark: { type: Type.NUMBER },
                        dwellTimePotential: { type: Type.NUMBER }
                      },
                      required: ["pReply", "pLike", "pAuthorReply", "pProfileClick", "pBookmark", "dwellTimePotential"]
                    },
                    attentionVector: {
                      type: Type.OBJECT,
                      properties: {
                        hookStrength: { type: Type.NUMBER },
                        informationGap: { type: Type.NUMBER },
                        authorityBias: { type: Type.NUMBER },
                        controversyIndex: { type: Type.NUMBER }
                      },
                      required: ["hookStrength", "informationGap", "authorityBias", "controversyIndex"]
                    },
                    simClusters: { 
                      type: Type.ARRAY, 
                      items: { 
                        type: Type.OBJECT,
                        properties: {
                          cluster: { type: Type.STRING },
                          score: { type: Type.NUMBER },
                          saliency: { type: Type.NUMBER }
                        },
                        required: ["cluster", "score", "saliency"]
                      } 
                    },
                    coreThesis: { type: Type.STRING },
                    manifoldCoordinates: { type: Type.ARRAY, items: { type: Type.NUMBER }, minItems: 3, maxItems: 3 },
                    attentionArbitragePotential: { type: Type.NUMBER },
                    eigenMatrix: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.NUMBER } } }
                  },
                  required: ["heavyRankerFeatures", "attentionVector", "simClusters", "coreThesis", "manifoldCoordinates", "attentionArbitragePotential", "eigenMatrix"]
                }
              },
              required: ["originalPostText", "sophistication", "tone", "resonancePotential", "statisticalPriors", "deconstruction"]
            },
            strategies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  strategy: { type: Type.STRING },
                  replyText: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  scores: {
                    type: Type.OBJECT,
                    properties: {
                      algorithmScore: { type: Type.NUMBER },
                      hook: { type: Type.NUMBER },
                      intellectualDepth: { type: Type.NUMBER },
                      authority: { type: Type.NUMBER },
                      emotionalImpact: { type: Type.NUMBER },
                      wealthFit: { type: Type.NUMBER },
                      viralPotential: { type: Type.NUMBER },
                      pAuthorReplyScore: { type: Type.NUMBER }
                    },
                    required: ["algorithmScore", "hook", "intellectualDepth", "authority", "emotionalImpact", "wealthFit", "viralPotential", "pAuthorReplyScore"]
                  },
                  recursiveAudit: {
                    type: Type.OBJECT,
                    properties: {
                      initialDraftCritique: { type: Type.STRING },
                      rankerSimulationDelta: { type: Type.NUMBER },
                      finalAlphaAdjustment: { type: Type.STRING }
                    },
                    required: ["initialDraftCritique", "rankerSimulationDelta", "finalAlphaAdjustment"]
                  },
                  cognitiveChain: {
                    type: Type.OBJECT,
                    properties: {
                      strategistInsight: { type: Type.STRING },
                      editorRefinement: { type: Type.STRING },
                      rankerPrediction: { type: Type.STRING }
                    },
                    required: ["strategistInsight", "editorRefinement", "rankerPrediction"]
                  },
                  gnnWeights: {
                    type: Type.OBJECT,
                    properties: {
                      pReply: { type: Type.NUMBER },
                      pLike: { type: Type.NUMBER },
                      pRetweet: { type: Type.NUMBER },
                      pAuthorReply: { type: Type.NUMBER },
                      pProfileClick: { type: Type.NUMBER },
                      pBookmark: { type: Type.NUMBER },
                      pStay: { type: Type.NUMBER }
                    },
                    required: ["pReply", "pLike", "pRetweet", "pAuthorReply", "pProfileClick", "pBookmark", "pStay"]
                  },
                  statisticalTelemetry: {
                    type: Type.OBJECT,
                    properties: {
                      bayesianCertainty: { type: Type.NUMBER },
                      pValue: { type: Type.NUMBER },
                      chiSquaredFit: { type: Type.NUMBER },
                      sigmaLevel: { type: Type.NUMBER },
                      mcmcIterations: { type: Type.NUMBER },
                      entropyReduction: { type: Type.NUMBER }
                    },
                    required: ["bayesianCertainty", "pValue", "chiSquaredFit", "sigmaLevel", "mcmcIterations", "entropyReduction"]
                  },
                  gauntletResults: {
                    type: Type.OBJECT,
                    properties: {
                      sanctum: {
                        type: Type.OBJECT,
                        properties: {
                          isSafe: { type: Type.BOOLEAN },
                          qualityTier: { type: Type.STRING, enum: ['S', 'A', 'B', 'F'] },
                          slopIndex: { type: Type.NUMBER }
                        },
                        required: ["isSafe", "qualityTier", "slopIndex"]
                      },
                      contextualRelevance: { type: Type.BOOLEAN }
                    },
                    required: ["sanctum", "contextualRelevance"]
                  }
                },
                required: ["strategy", "replyText", "reasoning", "confidence", "scores", "recursiveAudit", "cognitiveChain", "gnnWeights", "statisticalTelemetry", "gauntletResults"]
              }
            }
          },
          required: ["analysis", "strategies"]
        }
      }
    });

    const rawText = response.text || "{}";
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error("TITAN Kernel Analysis Error:", error);
    throw new Error(`CONVERGENCE_FAULT: ${error.message || "Unknown error"}`);
  }
}
