import React from 'react';
import { RotateCcw, Eye, ArrowLeftRight, BarChart3 } from 'lucide-react';
import { useAtlasStore } from '../store/useAtlasStore';

export const AlternadorComparar: React.FC = () => {
  const { compareMode, setCompareMode, comparisonData, getCurrentDisplayData } = useAtlasStore();
  
  const displayData = getCurrentDisplayData();
  const hasComparisonData = comparisonData !== null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Modo Comparação</h3>
        <ArrowLeftRight className="w-5 h-5 text-gray-500" />
      </div>

      <div className="space-y-3">
        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-4">
          <span className="text-sm text-gray-600 mr-3">Desligado</span>
          <div className="relative">
            <button
              onClick={() => setCompareMode(compareMode === 'off' ? 'before' : 'off')}
              className={`w-12 h-6 rounded-full transition-colors ${
                compareMode !== 'off' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                compareMode !== 'off' ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <span className="text-sm text-gray-600 ml-3">Ligado</span>
        </div>

        {compareMode !== 'off' && hasComparisonData && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCompareMode('before')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                compareMode === 'before'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              📸 Antes
            </button>
            <button
              onClick={() => setCompareMode('after')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                compareMode === 'after'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              🔄 Depois
            </button>
          </div>
        )}

        {/* Comparison Status */}
        {compareMode !== 'off' && hasComparisonData && (
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg mt-4">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="font-medium">Estado atual:</span>
            </div>
            {compareMode === 'before' && (
              <p>📸 A mostrar o estado <strong>inicial</strong> (quando ligaste a comparação). Clica em "Depois" para ver as mudanças.</p>
            )}
            {compareMode === 'after' && (
              <p>🔄 A mostrar o estado <strong>atual</strong> com as tuas mudanças. Clica em "Antes" para comparar com o estado inicial.</p>
            )}
          </div>
        )}

        {/* Quick Stats Comparison */}
        {compareMode !== 'off' && hasComparisonData && comparisonData && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Comparação Rápida</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="font-medium text-blue-800">Antes</div>
                <div className="text-blue-600">{Math.round(comparisonData.beforeMeters.health)}% saúde</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-800">Depois</div>
                <div className="text-green-600">{Math.round(displayData.meters.health)}% saúde</div>
              </div>
            </div>
            <div className="text-center mt-2">
              {displayData.meters.health > comparisonData.beforeMeters.health ? (
                <span className="text-green-600 font-medium">
                  ↗️ +{Math.round(displayData.meters.health - comparisonData.beforeMeters.health)}% melhoria
                </span>
              ) : displayData.meters.health < comparisonData.beforeMeters.health ? (
                <span className="text-red-600 font-medium">
                  ↘️ {Math.round(displayData.meters.health - comparisonData.beforeMeters.health)}% declínio
                </span>
              ) : (
                <span className="text-gray-600">→ Sem mudanças</span>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        {compareMode === 'off' && (
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>Liga a comparação para guardar o estado atual e ver como as mudanças de hábitos afetam a tua saúde.</p>
          </div>
        )}

        {compareMode !== 'off' && !hasComparisonData && (
          <div className="text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
            <p>A preparar comparação... Por favor aguarda.</p>
          </div>
        )}

        {compareMode !== 'off' && hasComparisonData && (
          <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg">
            <p><strong>Dica:</strong> Podes continuar a ajustar os hábitos. As mudanças serão guardadas no estado "Depois".</p>
          </div>
        )}
      </div>
    </div>
  );
};