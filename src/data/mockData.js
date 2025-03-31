export const STAGES = {
  COLD: 'Cold',
  INTERESTED: 'Interested',
  DEMO: 'Demo',
  PILOT: 'Pilot',
  CLOSE: 'Close'
};

export const ENGAGEMENT_ACTIVITIES = {
  IC: { code: 'IC', name: 'Initial Conversation' },
  IR: { code: 'IR', name: 'Initial Report' },
  TP: { code: 'TP', name: 'Test Purchase' },
  DR: { code: 'DR', name: 'Demo Recording' },
  SO: { code: 'SO', name: 'Special Offer' },
  CR: { code: 'CR', name: 'Customer Review / Loss' },
  CS: { code: 'CS', name: 'Case Study' }
};

export const mockCustomers = [
  {
    id: '1',
    customerName: 'John Doe',
    companyName: 'ABC Corp',
    currentStage: STAGES.INTERESTED,
    engagementHistory: [
      { 
        from: STAGES.COLD, 
        to: STAGES.INTERESTED, 
        activity: 'IC',
        date: '2023-10-01'
      }
    ]
  },
  {
    id: '2',
    customerName: 'Sarah Smith',
    companyName: 'XYZ Ltd',
    currentStage: STAGES.INTERESTED,
    engagementHistory: [
      { 
        from: STAGES.COLD, 
        to: STAGES.INTERESTED, 
        activity: 'IR',
        date: '2023-10-03'
      }
    ]
  },
  {
    id: '3',
    customerName: 'Mark Johnson',
    companyName: 'Foo Industries',
    currentStage: STAGES.COLD,
    engagementHistory: []
  },
  {
    id: '4',
    customerName: 'Linda Brown',
    companyName: 'Bar Solutions',
    currentStage: STAGES.DEMO,
    engagementHistory: [
      { 
        from: STAGES.COLD, 
        to: STAGES.INTERESTED, 
        activity: 'IC',
        date: '2023-09-15'
      },
      { 
        from: STAGES.INTERESTED, 
        to: STAGES.DEMO, 
        activity: 'TP',
        date: '2023-09-28'
      }
    ]
  }
]; 