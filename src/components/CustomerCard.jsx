import { useDrag } from 'react-dnd';
import { ENGAGEMENT_ACTIVITIES } from '../data/mockData';

const CustomerCard = ({ customer, onClick, stageColor }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CUSTOMER',
    item: { id: customer.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  // Get latest engagement if any
  const latestEngagement = customer.engagementHistory.length > 0 
    ? customer.engagementHistory[customer.engagementHistory.length - 1].activity 
    : null;
  
  return (
    <div 
      ref={dragRef}
      className={`bg-white shadow-lg rounded-md p-4 mb-3 cursor-pointer 
                hover:shadow-xl transition-all duration-200
                ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'} 
                border-l-4 ${stageColor ? stageColor.replace('text', 'border') : 'border-indigo-500'}`}
      onClick={() => onClick(customer)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-gray-800">{customer.customerName}</div>
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {customer.companyName}
          </div>
        </div>
        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
      </div>
      
      {latestEngagement && (
        <div className="mt-3 border-t pt-2 border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Latest Engagement:</span>
            <span>{customer.engagementHistory.length > 0 ? 
              customer.engagementHistory[customer.engagementHistory.length - 1].date : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {latestEngagement}
            </span>
            <span className="text-xs text-gray-600 truncate">
              {ENGAGEMENT_ACTIVITIES[latestEngagement]?.name}
            </span>
          </div>
        </div>
      )}
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {customer.engagementHistory.length} activities
        </div>
        <div className="flex items-center text-indigo-600 text-xs font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          View Details
        </div>
      </div>
    </div>
  );
};

export default CustomerCard; 