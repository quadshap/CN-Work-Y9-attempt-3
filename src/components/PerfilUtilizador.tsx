import React from 'react';
import { X, User, TrendingUp, TrendingDown, Heart, Brain, Activity, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAtlasStore } from '../store/useAtlasStore';

export const PerfilUtilizador: React.FC = () => {
  const { showUserProfile, setShowUserProfile, meters, selectedHabits } = useAtlasStore();

  if (!showUserProfile) return null;

  const getHealthStatus = (value: number) => {
    if (value >= 80) return { status: 'Excelente', color: 'text-green-600', bg: 'bg-green-50' };
    if (value >= 60) return { status: 'Bom', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (value >= 40) return { status: 'Preocupante', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { status: 'Crítico', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const overallHealth = meters.overallWellness || 75;
  const healthStatus = getHealthStatus(overallHealth);

  const getTopPositiveFactors = () => {
    if (!meters.exponentialFactors?.positive) return [];
    return meters.exponentialFactors.positive
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3);
  };

  const getTopNegativeFactors = () => {
    if (!meters.exponentialFactors?.negative) return [];
    return meters.exponentialFactors.negative
      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
      .slice(0, 3);
  };

  const topPositiveFactors = getTopPositiveFactors();
  const topNegativeFactors = getTopNegativeFactors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Perfil de Saúde Inteligente</h2>
              <p className="text-sm text-gray-600">Resumo personalizado do teu bem-estar</p>
            </div>
          </div>
          <button
            onClick={() => setShowUserProfile(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar perfil"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Overall Health Status */}
        <div className={`mx-6 mt-6 p-4 rounded-lg ${healthStatus.bg}`}>
          <div className="flex items-center space-x-2">
            <Heart className={`w-5 h-5 ${healthStatus.color}`} />
            <span className={`font-semibold ${healthStatus.color}`}>
              Estado Geral: {healthStatus.status}
            </span>
            <span className="text-sm text-gray-600">
              ({Math.round(overallHealth)}% de bem-estar)
            </span>
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Saúde</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(meters.health || 75)}%</div>
              <div className="text-sm text-gray-600">Saúde Física</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(meters.mentalHealth || 70)}%</div>
              <div className="text-sm text-gray-600">Saúde Mental</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Activity className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(meters.physicalFitness || 65)}%</div>
              <div className="text-sm text-gray-600">Condição Física</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(100 - (meters.diseaseRisk || 25))}%</div>
              <div className="text-sm text-gray-600">Resistência</div>
            </div>
          </div>
        </div>

        {/* Quality of Life Metrics */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualidade de Vida</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-yellow-800">Felicidade</div>
              <div className="text-2xl font-bold text-yellow-900">{Math.round(meters.happiness || 70)}%</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-blue-800">Qualidade de Vida</div>
              <div className="text-2xl font-bold text-blue-900">{Math.round(meters.qualityOfLife || 72)}%</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-800">Expectativa de Vida</div>
              <div className="text-2xl font-bold text-green-900">{Math.round(meters.lifeExpectancy || 78)} anos</div>
            </div>
          </div>
        </div>

        {/* Top Positive Factors */}
        {topPositiveFactors.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              Principais Fatores Positivos
            </h3>
            <div className="space-y-2">
              {topPositiveFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <span className="font-medium text-green-800">{factor.habit}</span>
                      <p className="text-sm text-green-600">{factor.mechanism}</p>
                    </div>
                  </div>
                  <span className="text-green-700 font-semibold">
                    +{Math.round(factor.impact)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Negative Factors */}
        {topNegativeFactors.length > 0 && (
          <div className="px-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
              Principais Fatores de Risco
            </h3>
            <div className="space-y-2">
              {topNegativeFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="font-medium text-red-800">{factor.habit}</span>
                      <p className="text-sm text-red-600">{factor.mechanism}</p>
                    </div>
                  </div>
                  <span className="text-red-700 font-semibold">
                    {Math.round(factor.impact)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prioritized Recommendations */}
        {meters.prioritizedRecommendations && meters.prioritizedRecommendations.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recomendações Prioritárias</h3>
            <div className="space-y-3">
              {meters.prioritizedRecommendations.slice(0, 5).map((recommendation, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <p className="text-blue-800 text-sm flex-1">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 text-center">
            Esta informação é baseada nos teus hábitos atuais e é apenas educativa. 
            Consulta um profissional de saúde para orientação médica personalizada.
          </p>
        </div>
      </div>
    </div>
  );
};