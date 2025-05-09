import React from 'react';

export default function CookingNews() {
  // Sample news data (replace with API call in a real app)
  const newsItems = [
    {
      id: '1',
      title: 'Top 10 Summer Dessert Trends for 2025',
      source: 'Food Network',
      date: 'May 8, 2025',
      image: '/api/placeholder/300/200',
      url: '#',
    },
    {
      id: '2',
      title: 'New Vegan Cooking Techniques to Try',
      source: 'Bon Appétit',
      date: 'May 7, 2025',
      image: '/api/placeholder/300/200',
      url: '#',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cooking News</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {newsItems.map((news) => (
          <div
            key={news.id}
            className="min-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
              <p className="text-sm text-gray-500">
                {news.source} • {news.date}
              </p>
              <a
                href={news.url}
                className="text-blue-500 hover:underline text-sm mt-2 inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}