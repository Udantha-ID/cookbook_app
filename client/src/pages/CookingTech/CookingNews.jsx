import React from 'react';

const CookingNews = () => {
  const news = [
    {
      id: 1,
      title: "New Cooking Trends",
      description: "Discover the latest cooking techniques making waves in 2024",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Chef's Corner",
      description: "Professional tips for mastering basic cooking techniques",
      date: "5 hours ago"
    },
    {
      id: 3,
      title: "Seasonal Updates",
      description: "Best cooking methods for spring ingredients",
      date: "1 day ago"
    }
  ];

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div 
          key={item.id}
          className="p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors cursor-pointer"
        >
          <h3 className="text-sm font-medium text-sky-900 mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-sky-600 mb-2">
            {item.description}
          </p>
          <span className="text-xs text-sky-500">
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CookingNews; 