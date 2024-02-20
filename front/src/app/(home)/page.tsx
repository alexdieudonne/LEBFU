/* eslint-disable @next/next/no-img-element */
"use client";
import ToogleBtn from "@/components/Toogle";
import { categories } from "@/lib/constants/fakeDatas";
import React, { useState } from "react";

export default function Home() {
  const [selectedToggle, setSelectedToggle] = useState<string | undefined>();
  return (
    <main className="flex flex-col">
      <h3 className="text-2xl font-bold px-4 py-2">Categories</h3>
      <div className="flex overflow-x-scroll pb-4 px-4 gap-3">
        {categories.map((category, key) => (
          <ToogleBtn
            key={category.id}
            title={category.name}
            isActive={selectedToggle === category.id}
            id={category.id}
            onToggle={(currentState, id) => {
              setSelectedToggle(id);
            }}
          />
        ))}
      </div>
      <div className="flex">
        <aside className="bg-gray-800 flex text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transition duration-200 ease-in-out z-20">
          <div className="flex flex-col justify-between h-full">
            <nav>
              <ul>
                <li>
                  <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">
                    Category 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">
                    Tasks
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">
                    Team
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <aside className="relative ml-3">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold mb-4">
              Welcome to the Dashboard
            </h1>
            <p>
              This is the main content area where your dashboard data will be
              displayed.
            </p>
          </div>
        </aside>
      </div>

    </main>
  );
}