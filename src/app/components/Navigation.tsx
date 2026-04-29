import { User, LogOut } from 'lucide-react';
import bpclLogo from '../../imports/Bharat_Petroleum-Logo.wine.png';

export function Navigation({ activeTab, onTabChange, onProfileClick }: { activeTab: string; onTabChange: (tab: string) => void; onProfileClick: () => void }) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <img src={bpclLogo} alt="BPCL Logo" className="h-12 w-auto" />
            <span className="font-semibold text-gray-900">BPCL Insight</span>
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`py-2 px-1 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-b-2 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={activeTab === 'dashboard' ? { borderColor: '#007BC9' } : {}}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('analysis')}
              className={`py-2 px-1 transition-colors ${
                activeTab === 'analysis'
                  ? 'border-b-2 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              style={activeTab === 'analysis' ? { borderColor: '#007BC9' } : {}}
            >
              Analysis
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <User size={20} className="text-gray-600" />
            <span className="text-sm text-gray-700">Profile</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
