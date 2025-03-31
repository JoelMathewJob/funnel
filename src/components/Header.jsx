import logo from '../assets/image.png';

const Header = ({ onAddCustomerClick }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Pirates Alert" className="h-20 w-20 mr-3 rounded-full" />
            <h1 className="text-3xl font-bold text-white">Pirates Alert</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onAddCustomerClick} 
              className="bg-white text-indigo-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Customer
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 