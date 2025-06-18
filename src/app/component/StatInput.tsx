import React from "react";
import { parseNumber } from "@/Utils";

export default function StatInput({ dex, setDex, intStat, setIntStat, vct, setVct, fct, setFct, delay, setDelay, cooldown, setCooldown }: any) {
  return (
    <div className="border border-gray-200 bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <label className="font-bold text-gray-700">DEX</label>
          <input type="number" value={dex} onChange={(e) => setDex(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} />
        </div>
        <div>
          <label className="font-bold text-gray-700">INT</label>
          <input type="number" value={intStat} onChange={(e) => setIntStat(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} />
        </div>
        <div>
          <label className="font-bold text-gray-700">% ลด VCT</label>
          <input type="number" value={vct} onChange={(e) => setVct(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} max={100} />
        </div>
        <div>
          <label className="font-bold text-gray-700">% ลด FCT</label>
          <input type="number" value={fct} onChange={(e) => setFct(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} max={100} />
        </div>
        <div>
          <label className="font-bold text-gray-700">Delay (s)</label>
          <input type="number" value={delay} onChange={(e) => setDelay(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} step={0.01} />
        </div>
        <div>
          <label className="font-bold text-gray-700">Cooldown (s)</label>
          <input type="number" value={cooldown} onChange={(e) => setCooldown(parseNumber(e.target.value, 0))} className="w-full mt-1 mb-3 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-300 transition-all" min={0} step={0.01} />
        </div>
      </div>
    </div>
  );
} 