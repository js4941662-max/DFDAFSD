
export interface SystemState {
  alphaIndex: number;
  nodesProcessed: number;
  successRate: number;
  averageSigma: number;
  entropy: number;
  impressions: string;
  engagementRate: string;
}

export interface HeavyRankerFeatures {
  pReply: number;
  pLike: number;
  pAuthorReply: number;
  pProfileClick: number;
  pBookmark: number;
  dwellTimePotential: number;
}

export interface AttentionVector {
  hookStrength: number;
  informationGap: number;
  authorityBias: number;
  controversyIndex: number;
}

export interface CommunityAlignment {
  cluster: string;
  score: number;
  saliency: number;
}

export interface PostAnalysis {
  originalPostText: string;
  detectedAuthor?: string;
  sophistication: 'ELITE' | 'HIGH' | 'MID' | 'LOW';
  tone: string;
  deconstruction: {
    heavyRankerFeatures: HeavyRankerFeatures;
    attentionVector: AttentionVector;
    simClusters: CommunityAlignment[];
    coreThesis: string;
    manifoldCoordinates: [number, number, number];
    attentionArbitragePotential: number;
    eigenMatrix: number[][];
  };
  resonancePotential: number;
  statisticalPriors: {
    clusterMeanResonance: number;
    posteriorLikelihood: number;
  };
}

export interface ReplyStrategy {
  strategy: string;
  replyText: string;
  reasoning: string;
  confidence: number;
  scores: {
    algorithmScore: number;
    hook: number;
    intellectualDepth: number;
    authority: number;
    emotionalImpact: number;
    wealthFit: number;
    viralPotential: number;
    pAuthorReplyScore: number;
  };
  recursiveAudit: {
    initialDraftCritique: string;
    rankerSimulationDelta: number;
    finalAlphaAdjustment: string;
  };
  cognitiveChain: {
    strategistInsight: string;
    editorRefinement: string;
    rankerPrediction: string;
  };
  gnnWeights: {
    pReply: number;
    pLike: number;
    pRetweet: number;
    pAuthorReply: number;
    pProfileClick: number;
    pBookmark: number;
    pStay: number;
  };
  statisticalTelemetry: {
    bayesianCertainty: number;
    pValue: number;
    chiSquaredFit: number;
    sigmaLevel: number;
    mcmcIterations: number;
    entropyReduction: number;
  };
  gauntletResults: {
    sanctum: {
      isSafe: boolean;
      qualityTier: 'S' | 'A' | 'B' | 'F';
      slopIndex: number;
    };
    contextualRelevance: boolean;
  };
}

export interface AnalysisResponse {
  analysis: PostAnalysis;
  strategies: ReplyStrategy[];
}
