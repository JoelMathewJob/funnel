import { useDrop } from 'react-dnd';
import CustomerCard from './CustomerCard';

// Function to get color scheme for different stages
const getStageColors = (stage) => {
  const colors = {
    'Cold': { bg: 'bg-blue-50', header: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-800' },
    'Interested': { bg: 'bg-green-50', header: 'bg-green-100', border: 'border-green-200', text: 'text-green-800' },
    'Demo': { bg: 'bg-yellow-50', header: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-800' },
    'Pilot': { bg: 'bg-orange-50', header: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-800' },
    'Close': { bg: 'bg-purple-50', header: 'bg-purple-100', border: 'border-purple-200', text: 'text-purple-800' }
  };
  
  return colors[stage] || { bg: 'bg-gray-50', header: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-800' };
};

const StageColumn = ({ stage, customers, onCustomerClick, moveCustomer }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'CUSTOMER',
    drop: (item) => moveCustomer(item.id, stage),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const colors = getStageColors(stage);

  return (
    <div 
      ref={dropRef}
      className={`flex-1 min-w-0 ${colors.bg} rounded-lg shadow-md mx-1 border ${colors.border}
                ${isOver ? 'ring-2 ring-indigo-300 transform scale-[1.02]' : ''} transition-all duration-200`}
    >
      <div className={`p-3 border-b ${colors.header} rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {stage === 'Cold' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
              </svg>
            )}
            {stage === 'Interested' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            )}
            {stage === 'Demo' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
            {stage === 'Pilot' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            {stage === 'Close' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <h3 className={`font-medium ${colors.text} truncate`}>{stage}</h3>
          </div>
          <span className="bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full flex-shrink-0 ml-2 font-medium">
            {customers.length}
          </span>
        </div>
      </div>
      
      <div className="p-2 min-h-[300px] max-h-[calc(100vh-200px)] overflow-y-auto">
        {customers.length === 0 ? (
          <div className="text-center text-gray-500 mt-8 italic flex flex-col items-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            No customers in this stage
          </div>
        ) : (
          customers.map(customer => (
            <CustomerCard 
              key={customer.id} 
              customer={customer}
              onClick={onCustomerClick}
              stageColor={colors.text}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StageColumn; 