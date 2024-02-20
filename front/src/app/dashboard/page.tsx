"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { categories } from "@/lib/constants/fakeDatas";
import ToogleBtn from "@/components/Toogle";
import CardQuizz from "@/components/Dashboard/Cards/CardQuizz";
import { Card } from "@/types/Card";
import { CardsCategoryEnum } from "@/types/CategoryCard";
import { Button } from "@/components/Ui/ButtonShadcn";
import DialogCreateCard from "@/components/Dialog/DialogCreateCard";
import { useGetCardsQuery } from "@/lib/services/cards";

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const [selectedToggle, setSelectedToggle] = useState<string | undefined>();
  const { data, isLoading } = useGetCardsQuery();
  const cards = data ? data : [];
  return (
    <div className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Welcome {user?.firstname}
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              Here you can manage your quizz
            </p>
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

              <div className="my-4">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-bold py-2">Quizzes</h3>
                  <DialogCreateCard titleBtn="Create" />
                </div>

                {cards.length === 0 ? (
                  <div className="text-center py-10 bg-gray-100 flex flex-col gap-2 items-center rounded-md">
                    <h4>No quizz</h4>
                    <DialogCreateCard titleBtn="Create One" />
                  </div>
                ) : (
                  cards.map((d) => <CardQuizz key={d.id} {...d} />)
                )}
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
