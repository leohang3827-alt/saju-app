import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import ReportResult from './pages/ReportResult';
import History from './pages/History';
import MyPage from './pages/MyPage';
import DetailedReport from './pages/DetailedReport';
import LockedModal from './widgets/LockedModal';
import Splash from './pages/Splash';
import type { SajuInput, SajuResultData, HistoryItem } from './models/saju';
import { analyzeSaju } from './services/sajuService';
import { saveToHistory, getLatestHistoryItem } from './repository/historyRepository';

type Tab = 'home' | 'report' | 'history' | 'my';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeResult, setActiveResult] = useState<SajuResultData | null>(null);
  
  // Custom navigation state for the Report tab (either showing the input form, basic report result, or premium detailed report)
  const [reportSubScreen, setReportSubScreen] = useState<'form' | 'result' | 'detailed'>('form');
  
  // Locked Modal state
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  
  // Splash Screen active state
  const [isSplashActive, setIsSplashActive] = useState(true);

  // Load the latest history item on mount
  useEffect(() => {
    const latest = getLatestHistoryItem();
    if (latest) {
      setActiveResult(latest.result);
      try {
        localStorage.setItem('saju_latest_result', JSON.stringify(latest.result));
      } catch (e) {}
      setReportSubScreen('result');
    } else {
      setReportSubScreen('form');
    }
  }, []);

  const handleAnalyze = (name: string, input: SajuInput) => {
    try {
      const result = analyzeSaju(name, input);
      
      // Save to local history
      saveToHistory(
        name,
        input.gender,
        `${input.year}-${input.month.toString().padStart(2, '0')}-${input.day.toString().padStart(2, '0')}`,
        input.knowTime ? `${input.hour.toString().padStart(2, '0')}:${input.minute.toString().padStart(2, '0')}` : '모름',
        input.calendar,
        result
      );

      // Save as latest result
      try {
        localStorage.setItem('saju_latest_result', JSON.stringify(result));
      } catch (e) {}

      // Set active result and navigate to results screen
      setActiveResult(result);
      setReportSubScreen('result');
      setActiveTab('report');
    } catch (err: any) {
      alert(err.message || '오류가 발생했습니다.');
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    try {
      localStorage.setItem('saju_latest_result', JSON.stringify(item.result));
    } catch (e) {}
    setActiveResult(item.result);
    setReportSubScreen('result');
    setActiveTab('report');
  };

  const handleSelectFreeReportFromHome = () => {
    // When clicking "1. 사주의 기본 구조 및 오행 분석" on Home:
    // We open the form directly so the user can enter a new analysis.
    setReportSubScreen('form');
    setActiveTab('report');
  };

  const handleGoToInputFromHistory = () => {
    setReportSubScreen('form');
    setActiveTab('report');
  };

  // Render active page content based on tab and sub-screen states
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onSelectReport={(idx) => {
              if (idx === 1) handleSelectFreeReportFromHome();
            }}
            onOpenLockModal={() => setIsLockModalOpen(true)}
            onAnalyze={handleAnalyze}
          />
        );
      case 'report':
        if (reportSubScreen === 'detailed' && activeResult) {
          return (
            <DetailedReport 
              result={activeResult}
              onBack={() => setReportSubScreen('result')}
            />
          );
        } else if (reportSubScreen === 'result' && activeResult) {
          return (
            <ReportResult 
              result={activeResult}
              onBack={() => setActiveTab('home')}
              onOpenLockModal={() => setIsLockModalOpen(true)}
            />
          );
        } else {
          return (
            <InputForm 
              onAnalyze={handleAnalyze}
              onBack={() => setActiveTab('home')}
            />
          );
        }
      case 'history':
        return (
          <History 
            onSelectHistory={handleSelectHistory}
            onGoToInput={handleGoToInputFromHistory}
          />
        );
      case 'my':
        return (
          <MyPage 
            result={activeResult}
            onOpenLockModal={() => setIsLockModalOpen(true)}
          />
        );
      default:
        return <Home onSelectReport={() => {}} onOpenLockModal={() => {}} onAnalyze={handleAnalyze} />;
    }
  };

  return (
    <div id="app-container">
      {isSplashActive ? (
        <Splash onStart={() => setIsSplashActive(false)} />
      ) : (
        <>
          {/* Scrollable Page Content */}
          {renderContent()}

          {/* Bottom Tab Navigation */}
          <nav className="nav-bar">
            <button 
              onClick={() => setActiveTab('home')}
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            >
              <span className="nav-icon">🏠</span>
              <span>홈</span>
            </button>
            
            <button 
              onClick={() => {
                // Clicking Report goes to result if analyzed, or form if not
                if (activeResult) {
                  setReportSubScreen('result');
                } else {
                  setReportSubScreen('form');
                }
                setActiveTab('report');
              }}
              className={`nav-item ${activeTab === 'report' ? 'active' : ''}`}
            >
              <span className="nav-icon">📋</span>
              <span>리포트</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('history')}
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            >
              <span className="nav-icon">🕰️</span>
              <span>기록</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('my')}
              className={`nav-item ${activeTab === 'my' ? 'active' : ''}`}
            >
              <span className="nav-icon">👤</span>
              <span>마이</span>
            </button>
          </nav>
        </>
      )}

      {/* Global Locked Feature Modal */}
      <LockedModal 
        isOpen={isLockModalOpen}
        onClose={() => setIsLockModalOpen(false)}
      />
    </div>
  );
};
export default App;
