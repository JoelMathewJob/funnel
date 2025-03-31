import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { STAGES, mockCustomers } from './data/mockData';
import Header from './components/Header';
import StageColumn from './components/StageColumn';
import CustomerDetail from './components/CustomerDetail';
import AddCustomerModal from './components/AddCustomerModal';

function App() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Add a class to the body when a modal is open to prevent scrolling
    if (selectedCustomer || isAddModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedCustomer, isAddModalOpen]);

  const moveCustomer = (customerId, targetStage) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    // Only allow movement to adjacent stages
    const stageValues = Object.values(STAGES);
    const currentStageIndex = stageValues.indexOf(customer.currentStage);
    const targetStageIndex = stageValues.indexOf(targetStage);
    
    // Allow moving forward only one stage, or backward to any previous stage
    const isValidMove = 
      targetStageIndex === currentStageIndex + 1 || 
      targetStageIndex < currentStageIndex;
    
    if (!isValidMove) return;
    
    setCustomers(prev => {
      return prev.map(c => {
        if (c.id === customerId) {
          // If moving forward, record this as a movement with no engagement
          if (targetStageIndex > currentStageIndex) {
            return {
              ...c,
              currentStage: targetStage,
            };
          }
          // If moving backward, just update the stage
          return {
            ...c,
            currentStage: targetStage
          };
        }
        return c;
      });
    });
  };

  const assignEngagement = (customerId, engagementCode) => {
    setCustomers(prev => {
      return prev.map(customer => {
        if (customer.id === customerId) {
          // Find current stage index
          const stageValues = Object.values(STAGES);
          const currentStageIndex = stageValues.indexOf(customer.currentStage);
          const nextStage = stageValues[currentStageIndex + 1];
          
          if (!nextStage) return customer; // No next stage available
          
          // Check if engagement already used
          const isUsed = customer.engagementHistory.some(h => h.activity === engagementCode);
          if (isUsed) return customer;
          
          return {
            ...customer,
            currentStage: nextStage,
            engagementHistory: [
              ...customer.engagementHistory,
              {
                from: customer.currentStage,
                to: nextStage,
                activity: engagementCode,
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
        }
        return customer;
      });
    });
    
    // Update the selected customer view if it's open
    if (selectedCustomer) {
      const updatedCustomer = customers.find(c => c.id === selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };
  
  const handleAddCustomer = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <Header onAddCustomerClick={() => setIsAddModalOpen(true)} />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {Object.values(STAGES).map(stage => (
              <StageColumn 
                key={stage} 
                stage={stage} 
                customers={customers.filter(c => c.currentStage === stage)} 
                onCustomerClick={handleCustomerClick}
                moveCustomer={moveCustomer}
              />
            ))}
          </div>
        </main>
        
        {selectedCustomer && (
          <CustomerDetail 
            customer={customers.find(c => c.id === selectedCustomer.id)}
            onClose={() => setSelectedCustomer(null)}
            assignEngagement={assignEngagement}
          />
        )}
        
        <AddCustomerModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCustomer={handleAddCustomer}
        />
      </div>
    </DndProvider>
  );
}

export default App;
