"use client";
import React, { useState } from "react";
import { MONSTER_DATA } from "@/data/monsters";

const sortOptions = [
  { label: "Level", value: "level" },
  { label: "Name", value: "name" },
  { label: "HP", value: "hp" },
  { label: "HIT/FLEE", value: "hit/flee" },
  { label: "EXP", value: "exp" },
  { label: "JOB", value: "job" },
];

const elementOptions = [
  "Neutral",
  "Fire",
  "Water",
  "Earth",
  "Wind",
  "Poison",
  "Holy",
  "Dark",
];

const raceOptions = ["Plant", "Brute", "Demon", "Undead", "Fish", "Dragon"];

const sizeOptions = ["Small", "Medium", "Large"];



function SortDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-200 font-semibold flex items-center gap-2"
      >
        {selected}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  selected === option.value ? "font-bold bg-gray-200" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MonsterPage() {
  const [sortBy, setSortBy] = useState("level");
  const [element, setElement] = useState<string[]>([]);
  const [race, setRace] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  // Sorting logic
  const sortedMonsters = [...MONSTER_DATA].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "level") {
      return a.level - b.level;
    }
    // Type assertion to fix TS index error
    return (b as any)[sortBy] - (a as any)[sortBy];
  });

  const filteredMonsters = sortedMonsters.filter((m) => {
    if (element.length > 0 && !element.includes(m.element)) return false;
    if (race.length > 0 && !race.includes(m.race)) return false;
    if (size.length > 0 && !size.includes(m.size)) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white flex max-w-screen-xl mx-auto pt-[70px]">
      {/* Sidebar */}
      <aside className="w-80 bg-white border rounded-xl m-6 p-6 flex flex-col gap-6 shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <span className="text-lg font-bold text-gray-800">
            Monster Search
          </span>
        </div>
        <input
          className="bg-gray-100 text-gray-800 rounded-md px-4 py-2 focus:outline-none"
          placeholder="Search monster..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <div className="text-gray-500 mb-2 font-semibold">Element</div>
          <div className="flex flex-wrap gap-2">
            {elementOptions.map((el) => (
              <button
                key={el}
                className={`px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs ${
                  element.includes(el) ? "!bg-blue-500 text-white" : ""
                }`}
                onClick={() =>
                  setElement(
                    element.includes(el)
                      ? element.filter((e: string) => e !== el)
                      : [...element, el]
                  )
                }
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-2 font-semibold">Race</div>
          <div className="flex flex-wrap gap-2">
            {raceOptions.map(
              (raceType) => (
                <button
                  key={raceType}
                  className={`px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs ${
                    race.includes(raceType) ? "!bg-blue-500 text-white" : ""
                  }`}
                  onClick={() =>
                    setRace(
                      race.includes(raceType)
                        ? race.filter((r: string) => r !== raceType)
                        : [...race, raceType]
                    )
                  }
                >
                  {raceType}
                </button>
              )
            )}
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-2 font-semibold">Size</div>
          <div className="flex gap-2">
            {sizeOptions.map((sizeType) => (
              <button
                key={sizeType}
                className={`px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs ${
                  size.includes(sizeType) ? "!bg-blue-500 text-white" : ""
                }`}
                onClick={() =>
                  setSize(
                    size.includes(sizeType)
                      ? size.filter((s: string) => s !== sizeType)
                      : [...size, sizeType]
                  )
                }
              >
                {sizeType}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Monster List</h1>
          <SortDropdown selected={sortBy} setSelected={setSortBy} />
        </div>
        <div className="grid grid-cols-1 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
          {/* Example Monster Card */}
          {filteredMonsters.map((m, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 flex items-center gap-6 shadow hover:border-blue-500 transition cursor-pointer"
            >
              <div className="bg-gray-200 flex items-center justify-center rounded">
                {/* Monster image placeholder */}
                <img
                  src={`https://rolth.maxion.gg/_next/image?url=https%3A%2F%2Fcdn.maxion.gg%2Flandverse%2Fimage-th%2Fmonster%2F${m.id}.gif&w=96&q=75`}
                  alt={m.name}
                  className="w-[80px] h-[80px]"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">
                    {m.name}
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
                    {m.element}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                    {m.race}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                    {m.size}
                  </span>
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  HP: {m.hp} | HIT/FLEE: 0/0 | EXP: {m.base_exp} JOB: {m.job_exp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
