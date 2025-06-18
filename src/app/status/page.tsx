"use client";

import React, { useState, useMemo } from "react";

const MAX_BASE_LEVEL = 99;
const MAX_STAT = 99;
const MIN_STAT = 1;
const MAX_STATUS_POINT = 1170; // Classic RO, base 99, no rebirth

type StatKey = "str" | "agi" | "vit" | "int" | "dex" | "luk";

// Status point cost table (classic)
function calcStatusPointCost(stat: number) {
  let cost = 0;
  for (let i = MIN_STAT + 1; i <= stat; i++) {
    cost += i;
  }
  return cost;
}

function calcTotalStatusPoints(stats: Record<StatKey, number>) {
  return (["str", "agi", "vit", "int", "dex", "luk"] as StatKey[]).reduce(
    (sum, key) => sum + calcStatusPointCost(stats[key]),
    0
  );
}

export default function StatusCalculator() {
  const [stats, setStats] = useState<Record<StatKey, number>>({
    str: 1,
    agi: 1,
    vit: 1,
    int: 1,
    dex: 1,
    luk: 1,
  });

  // Point calculation
  const pointsUsed = useMemo(() => calcTotalStatusPoints(stats), [stats]);
  const pointsLeft = MAX_STATUS_POINT - pointsUsed;

  // Derived stats (classic formulas)
  const atk = stats.str + Math.floor(stats.dex / 5) + Math.floor(stats.luk / 3);
  const maxHP = 35 + stats.vit * 1.5 + stats.str * 0.5 + MAX_BASE_LEVEL * 1; // baseLevel is always 99
  const hit = stats.dex + Math.floor(stats.luk / 3);
  const flee = stats.agi + Math.floor(stats.luk / 5);

  // Stat input handler
  function handleStatChange(key: StatKey, value: number) {
    if (value < MIN_STAT || value > MAX_STAT) return;
    setStats((prev) => ({ ...prev, [key]: value }));
  }

  function handleStatStep(key: StatKey, delta: number) {
    setStats((prev) => {
      const next = prev[key] + delta;
      if (next < MIN_STAT || next > MAX_STAT) return prev;
      // Check if enough points left if increasing
      if (delta > 0) {
        const testStats = { ...prev, [key]: next };
        if (calcTotalStatusPoints(testStats) > MAX_STATUS_POINT) return prev;
      }
      return { ...prev, [key]: next };
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-pink-50 to-purple-50 pt-16 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">
            คำนวณ Status
          </h1>
          <p className="text-gray-500 mt-2 text-base sm:text-lg">Ragnarok Classic (Base 99, Stat Max 99)</p>
        </header>
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {(["str", "agi", "vit", "int", "dex", "luk"] as StatKey[]).map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="font-bold text-blue-700 uppercase mb-1">{key}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-lg font-bold"
                      onClick={() => handleStatStep(key, -1)}
                      disabled={stats[key] <= MIN_STAT}
                    >-</button>
                    <input
                      type="number"
                      min={MIN_STAT}
                      max={MAX_STAT}
                      value={stats[key]}
                      onChange={e => handleStatChange(key, Number(e.target.value))}
                      className="w-16 text-center border border-gray-300 rounded-lg p-1 text-lg font-bold focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      className="px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-lg font-bold"
                      onClick={() => handleStatStep(key, 1)}
                      disabled={stats[key] >= MAX_STAT || pointsLeft <= 0}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <div className="text-gray-700 text-lg font-semibold">
                ใช้ Status Point: <span className="text-blue-600">{pointsUsed}</span> / {MAX_STATUS_POINT}
              </div>
              <div className="text-gray-700 text-lg font-semibold">
                เหลือ: <span className={pointsLeft < 0 ? "text-red-600" : "text-green-600"}>{pointsLeft}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-4">ค่าสถานะย่อย (Derived Stats)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-lg">
            <div>
              <span className="font-semibold text-gray-700">ATK</span>
              <div className="text-blue-600 font-bold">{atk}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Max HP</span>
              <div className="text-blue-600 font-bold">{maxHP.toFixed(0)}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Hit</span>
              <div className="text-blue-600 font-bold">{hit}</div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Flee</span>
              <div className="text-blue-600 font-bold">{flee}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 