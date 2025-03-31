import EngagementBadge from './EngagementBadge';
import { ENGAGEMENT_ACTIVITIES, STAGES } from '../data/mockData';

const CustomerDetail = ({ customer, onClose, assignEngagement }) => {
  if (!customer) return null;

  // Get used engagements
  const usedEngagements = customer.engagementHistory.map(h => h.activity);
  
  // Get available engagements
  const availableEngagements = Object.keys(ENGAGEMENT_ACTIVITIES)
    .filter(code => !usedEngagements.includes(code));
    
  // Calculate next stage
  const stageValues = Object.values(STAGES);
  const currentStageIndex = stageValues.indexOf(customer.currentStage);
  const nextStage = stageValues[currentStageIndex + 1] || "Final Stage";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col relative">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-white rounded-t-lg border-b border-gray-200 p-5 flex items-center shadow-sm">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
            {customer.customerName.charAt(0)}
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold text-gray-800">{customer.customerName}</h2>
            <div className="text-gray-600">{customer.companyName}</div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none h-8 w-8 flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Current Stage</div>
              <div className="font-medium text-gray-800">{customer.currentStage}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Next Stage</div>
              <div className="font-medium text-gray-800">{nextStage}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Engagement History</h3>
            {customer.engagementHistory.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                No engagement history yet
              </div>
            ) : (
              <div className="space-y-3">
                {customer.engagementHistory.map((history, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{history.from}</span>
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-medium">{history.to}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-2">
                        {history.activity}
                      </span>
                      <span className="text-gray-700">{ENGAGEMENT_ACTIVITIES[history.activity].name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{history.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Available Engagements</h3>
            {availableEngagements.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                All engagements have been used
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                
                <div className="flex flex-wrap gap-2">
                  {availableEngagements.map(code => (
                    <EngagementBadge 
                      key={code} 
                      code={code} 
                      customerId={customer.id}
                      assignEngagement={assignEngagement}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail; 