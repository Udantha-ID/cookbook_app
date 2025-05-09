import React from 'react';

export default function CookingNews() {
  const newsItems = [
    {
      id: '1',
      title: 'Top 10 Summer Dessert Trends for 2025',
      source: 'Food Network',
      date: 'May 8, 2025',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      url: '#',
    },
    {
      id: '2',
      title: 'New Vegan Cooking Techniques to Try',
      source: 'Bon Appétit',
      date: 'May 7, 2025',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      url: '#',
    },
    {
      id: '3',
      title: 'Mediterranean Diet Wins Best Overall',
      source: 'Health Magazine',
      date: 'May 5, 2025',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGl0ZXJyYW5lYW4lMjBkaWV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      url: '#',
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Trending Cooking News
      </h2>
      <div className="space-y-4">
        {newsItems.map((news) => (
          <a 
            key={news.id} 
            href={news.url}
            className="block group transform hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              {/* Image with gradient overlay */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              {/* News content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {news.title}
                </h3>
                <div className="flex items-center mt-2 text-xs opacity-90">
                  <span>{news.source}</span>
                  <span className="mx-2">•</span>
                  <span>{news.date}</span>
                </div>
              </div>
              
              {/* Read more button */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 text-xs px-2 py-1 rounded-full font-medium text-gray-800">
                  Read →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}