import React from "react";
import CookingNews from "../pages/CookingTech/CookingNews";

export default function RightSideBar() {
  return (
    <div className="w-80 p-4 fixed right-0 top-0 h-full bg-white/95 backdrop-blur-sm border-l border-sky-100 overflow-y-auto">
      <div className="pt-16 space-y-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 p-6">
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Cooking News</h2>
          <CookingNews />
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 p-6">
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Popular Techniques</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <span className="text-sky-600 font-medium">1</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-900">Knife Skills</h3>
                <p className="text-xs text-sky-500">Master the basics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <span className="text-sky-600 font-medium">2</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-900">Sauce Making</h3>
                <p className="text-xs text-sky-500">Essential techniques</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <span className="text-sky-600 font-medium">3</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-900">Temperature Control</h3>
                <p className="text-xs text-sky-500">Perfect cooking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 p-6">
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Quick Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-sky-50 rounded-xl">
              <p className="text-sm text-sky-700">
                Always sharpen your knives before starting to cook for better precision and safety.
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-xl">
              <p className="text-sm text-sky-700">
                Let meat rest after cooking to allow juices to redistribute.
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-xl">
              <p className="text-sm text-sky-700">
                Use the right size pan for the amount of food you're cooking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}