import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { InputSection } from "./components/InputSection";
import { ROHeader } from "./components/ROHeader";
import { KPIStrip } from "./components/KPIStrip";
import { PerformanceTable } from "./components/PerformanceTable";
import { AnalysisCharts } from "./components/AnalysisCharts";
import { AnalysisKPIs } from "./components/AnalysisKPIs";
import { SmartInsights } from "./components/SmartInsights";
import { ManagerProfile } from "./components/ManagerProfile";
import { SetTargetsModal } from "./components/SetTargetsModal";

const mockROData = {
  name: "BPCL Syall Service Station - Kirti Nagar",
  location: "KIRTI NAGAR DELHI, WEST DELHI, Delhi 110015",
  ccNumber: "12345",
  rank: "A+",
};

const mockKPIData = {
  totalRevenue: "72.0",
  targetAchievement: "82",
  yoyGrowth: "+12.3",
  fuelVsNonFuel: "78:22",
};

const getFuelData = (targets: any) => [
  {
    product: "MS",
    target: targets.fuel.MS,
    achieved: 1980,
    ly: 1820,
    volume: 1800,
  },
  {
    product: "HSD",
    target: targets.fuel.HSD,
    achieved: 3360,
    ly: 3080,
    volume: 3500,
  },
  {
    product: "SPEED",
    target: targets.fuel.SPEED,
    achieved: 276,
    ly: 245,
    volume: 300,
  },
  {
    product: "TOTAL",
    target:
      targets.fuel.MS + targets.fuel.HSD + targets.fuel.SPEED,
    achieved: 5616,
    ly: 5145,
    volume: 5600,
    isTotal: true,
  },
];

const getNonFuelData = (targets: any) => [
  {
    product: "QOC",
    target: targets.nonFuel.QOC,
    achieved: 650,
    ly: 595,
    volume: 650,
  },
  {
    product: "Lubricants",
    target: targets.nonFuel.Lubricants,
    achieved: 380,
    ly: 348,
    volume: 380,
  },
  {
    product: "UFill",
    target: targets.nonFuel.UFill,
    achieved: 280,
    ly: 256,
    volume: 280,
  },
  {
    product: "SBI",
    target: targets.nonFuel.SBI,
    achieved: 150,
    ly: 138,
    volume: 150,
  },
  {
    product: "BeCafe",
    target: targets.nonFuel.BeCafe,
    achieved: 124,
    ly: 114,
    volume: 124,
  },
  {
    product: "TOTAL",
    target:
      targets.nonFuel.QOC +
      targets.nonFuel.Lubricants +
      targets.nonFuel.UFill +
      targets.nonFuel.SBI +
      targets.nonFuel.BeCafe,
    achieved: 1584,
    ly: 1451,
    volume: 1584,
    isTotal: true,
  },
];

const mockFuelChartData = [
  { name: "MS", value: 1980 },
  { name: "HSD", value: 3360 },
  { name: "SPEED", value: 276 },
];

const mockNonFuelChartData = [
  { name: "QOC", value: 650 },
  { name: "Lubricants", value: 380 },
  { name: "UFill", value: 280 },
  { name: "SBI", value: 150 },
  { name: "BeCafe", value: 124 },
];

const mockTargetData = [
  { category: "Fuel", target: 6849, achieved: 5616 },
  { category: "Non-Fuel", target: 1932, achieved: 1584 },
];

const mockTrendData = [
  { date: "Week 1", fuel: 1280, nonFuel: 360 },
  { date: "Week 2", fuel: 1420, nonFuel: 398 },
  { date: "Week 3", fuel: 1485, nonFuel: 425 },
  { date: "Week 4", fuel: 1431, nonFuel: 401 },
];

const mockInsights = [
  "Target achievement at 82% - on track to meet monthly goals with ₹72 Cr total revenue",
  "HSD contributes 60% of total fuel revenue (₹33.6 Cr), highest in category",
  "Non-fuel sales growing 9.2% vs LY - strong performance in QOC (₹6.5 Cr) and Lubricants (₹3.8 Cr)",
];

const mockAnalysisKPIs = {
  fuelYoY: 9.2,
  nonFuelYoY: 9.2,
  volumeGrowth: 8.8,
  revenueGrowth: 12.3,
};

const mockGrowthData = [
  { month: "Jan", currentYear: 68, lastYear: 61 },
  { month: "Feb", currentYear: 70, lastYear: 62 },
  { month: "Mar", currentYear: 72, lastYear: 64 },
  { month: "Apr", currentYear: 75, lastYear: 67 },
];

const mockCategoryGrowthData = [
  { category: "MS", growth: 8.8 },
  { category: "HSD", growth: 9.1 },
  { category: "SPEED", growth: 12.7 },
  { category: "QOC", growth: 9.2 },
  { category: "Lubricants", growth: 9.2 },
  { category: "UFill", growth: 9.4 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTargetsModal, setShowTargetsModal] =
    useState(false);
  const [targets, setTargets] = useState({
    fuel: { MS: 2415, HSD: 4098, SPEED: 336 },
    nonFuel: {
      QOC: 793,
      Lubricants: 463,
      UFill: 341,
      SBI: 183,
      BeCafe: 152,
    },
  });

  const handleFetch = (
    ccNumber: string,
    dateRange: string,
    file?: File,
  ) => {
    setLoading(true);
    if (file) {
      console.log("Uploaded file:", file.name);
    }
    setTimeout(() => {
      setDataFetched(true);
      setLoading(false);
    }, 800);
  };

  const handleSaveTargets = (newTargets: any) => {
    setTargets(newTargets);
  };

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onProfileClick={() => setShowProfile(true)}
        />
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <ManagerProfile
            onBack={() => setShowProfile(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <InputSection onFetch={handleFetch} />

        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: "#007BC9" }}
            ></div>
          </div>
        )}

        {dataFetched && !loading && (
          <div className="mt-8">
            {activeTab === "dashboard" && (
              <>
                <ROHeader
                  data={mockROData}
                  onSetTargets={() => setShowTargetsModal(true)}
                />
                <KPIStrip data={mockKPIData} />
                <div className="space-y-6">
                  <PerformanceTable
                    title="Fuel Performance"
                    data={getFuelData(targets)}
                    showVolume={false}
                  />
                  <PerformanceTable
                    title="Non-Fuel Performance"
                    data={getNonFuelData(targets)}
                    showVolume={false}
                  />
                  <SmartInsights insights={mockInsights} />
                </div>
              </>
            )}

            {activeTab === "analysis" && (
              <>
                <ROHeader data={mockROData} />
                <AnalysisKPIs data={mockAnalysisKPIs} />
                <AnalysisCharts
                  fuelData={mockFuelChartData}
                  nonFuelData={mockNonFuelChartData}
                  targetData={mockTargetData}
                  trendData={mockTrendData}
                  growthData={mockGrowthData}
                  categoryGrowthData={mockCategoryGrowthData}
                />
                <div className="mt-6">
                  <SmartInsights insights={mockInsights} />
                </div>
              </>
            )}
          </div>
        )}

        {!dataFetched && !loading && (
          <div className="mt-16 text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#007BC9" }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl text-gray-900 mb-2">
              Welcome to BPCL Insight
            </h3>
            <p className="text-gray-600">
              Enter a CC Number and date range to view
              performance data
            </p>
          </div>
        )}

        {showTargetsModal && (
          <SetTargetsModal
            onClose={() => setShowTargetsModal(false)}
            onSave={handleSaveTargets}
            initialTargets={targets}
          />
        )}
      </div>
    </div>
  );
}