import { useState } from 'react';

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      {/* Tab Headers */}
      <div className="mb-8 border-b border-nh-copper/20 overflow-x-auto">
        <div className="flex gap-2 min-w-max md:flex-wrap">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-heading font-semibold transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === index
                  ? 'text-nh-copper border-nh-copper'
                  : 'text-gray-400 border-transparent hover:text-white hover:border-nh-copper/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;

