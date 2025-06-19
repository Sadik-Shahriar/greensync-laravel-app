import React from 'react';

const Rewards = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">
            Rewards & Achievements
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of your well-earned rewards and achievements.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <p>Your rewards content will be displayed here soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
