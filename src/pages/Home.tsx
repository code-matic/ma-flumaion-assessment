import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 font-sans">
      {/* Hero Section */}
      <header className="text-center py-16 px-5 bg-gray-50 rounded-lg mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Task Scheduler
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organize your time efficiently
        </p>
      </header>

      {/* Features Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Book Time Slots
            </h3>
            <p className="text-gray-600">
              Schedule your tasks with specific time slots to manage your day
              effectively.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Assign Tasks
            </h3>
            <p className="text-gray-600">
              Create detailed task descriptions to keep track of what needs to
              be done.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Edit & Update
            </h3>
            <p className="text-gray-600">
              Easily modify your existing tasks as plans change.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Delete & Archive
            </h3>
            <p className="text-gray-600">
              Remove completed tasks or those no longer needed.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10 px-5 bg-gray-50 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Ready to get organized?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/tasks"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Open Scheduler
          </Link>
          <Link
            to="/tasks"
            className="inline-block px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300"
          >
            View Tasks
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
