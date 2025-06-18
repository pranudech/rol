import React from "react";

export default function SkillSelector({
  classIdx, setClassIdx, skillIdx, setSkillIdx, woeMode, setWoeMode, selectedClass
}: any) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
      {/* Class Selector */}
      <select
        className="rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 transition-all"
        value={classIdx}
        onChange={(e) => {
          setClassIdx(+e.target.value);
          setSkillIdx(0);
        }}
      >
        {selectedClass.allClasses.map((c: any, i: number) => (
          <option key={c.class} value={i}>{c.class}</option>
        ))}
      </select>
      {/* Skill Selector */}
      <select
        className="rounded-lg border border-gray-300 px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 transition-all"
        value={skillIdx}
        onChange={(e) => setSkillIdx(+e.target.value)}
      >
        {selectedClass.skills.map((s: any, i: number) => (
          <option key={s.name} value={i}>{s.name}</option>
        ))}
      </select>
      {/* WOE Toggle */}
      <label className="inline-flex items-center ml-4 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={woeMode}
          onChange={(e) => setWoeMode(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
        />
        <span className="ml-2 text-gray-700 font-semibold">WOE Mode</span>
      </label>
    </div>
  );
} 