"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { categories } from "@/lib/constants/fakeDatas";
import ToogleBtn from "@/components/Toogle";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const [selectedToggle, setSelectedToggle] = useState<string | undefined>();
  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Dashboard
            </h2>
            <main className="flex flex-col">
              <h3 className="text-2xl font-bold py-2">Categories</h3>
              <div className="flex overflow-x-scroll pb-4 gap-3">
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
                          <a
                            href="#"
                            className="block py-2.5 px-4 hover:bg-gray-700"
                          >
                            Category 1
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2.5 px-4 hover:bg-gray-700"
                          >
                            Projects
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2.5 px-4 hover:bg-gray-700"
                          >
                            Tasks
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2.5 px-4 hover:bg-gray-700"
                          >
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
                      This is the main content area where your dashboard data
                      will be displayed.
                    </p>
                  </div>
                </aside>
              </div>
            </main>
          </section>
        </div>
      </div>
    </section>
  );
}
