"use client";
import React from "react";
import { useEffect, useState } from "react";

function MainComponent() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch("/api/news", {
        method: "GET", // Change POST to GET
      });
      if (response.ok) {
        const data = await response.json();
        setNews(data.articles || []);
      } else {
        console.error("Failed to fetch news");
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10 font-serif">
        海外AIニュース
      </h1>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 font-sans">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 font-sans">
                {article.source.name}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-indigo-600 font-semibold font-sans">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <i className="fas fa-external-link-alt text-indigo-600"></i>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MainComponent;