"use client";
import React, { useState, useEffect } from "react";
import { parseNumber } from "@/Utils";
import { SKILL_DATA } from "@/data/skills";
import SkillSelector from "@/components/page/skill-spell/SkillSelector";
import StatInput from "@/components/page/skill-spell/StatInput";
import ResultCard from "@/components/page/skill-spell/ResultCard";
import GlossarySection from "@/components/page/skill-spell/GlossarySection";

export default function Home() {
  const [classIdx, setClassIdx] = useState(0);
  const [skillIdx, setSkillIdx] = useState(0);
  const [woeMode, setWoeMode] = useState(false);
  const [baseMode, setBaseMode] = useState<"630" | "530">("630");

  const [dex, setDex] = useState(99);
  const [intStat, setIntStat] = useState(40);
  const [vct, setVct] = useState(0);
  const [fct, setFct] = useState(0);

  const selectedClass = SKILL_DATA[classIdx];
  const selectedSkill = selectedClass.skills[skillIdx];
  const skillData =
    woeMode && selectedSkill.woe ? selectedSkill.woe : selectedSkill;

  const [delay, setDelay] = useState(skillData.baseDelay);
  const [cooldown, setCooldown] = useState(skillData.baseCooldown);

  // update delay/cooldown เมื่อเปลี่ยนสกิล/WOE
  useEffect(() => {
    setDelay(skillData.baseDelay);
    setCooldown(skillData.baseCooldown);
  }, [classIdx, skillIdx, woeMode]);

  // สูตรคำนวณ
  const baseValue = baseMode === "630" ? 630 : 530;
  const statSum = dex * 2 + intStat;
  const sqrtTerm = Math.sqrt(statSum / baseValue);
  const vctRate = 1 - Math.min(sqrtTerm, 1);
  const vctPercent = 1 - vct / 100;
  const vctRaw = skillData.baseVCT * vctRate * vctPercent;
  const fctRaw = skillData.baseFCT * (1 - fct / 100);
  const totalCast = vctRaw + fctRaw;
  const resultTime = Math.max(totalCast, delay, cooldown);

  // --- Render ---
  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-pink-50 to-purple-50 pt-16 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">
            Skill & Spell Simulator
          </h1>
          <p className="text-gray-500 mt-2 text-base sm:text-lg">Ragnarok Hi-Class WOE/Normal</p>
        </header>
        <SkillSelector
          classIdx={classIdx}
          setClassIdx={setClassIdx}
          skillIdx={skillIdx}
          setSkillIdx={setSkillIdx}
          woeMode={woeMode}
          setWoeMode={setWoeMode}
          selectedClass={{ allClasses: SKILL_DATA, skills: selectedClass.skills }}
        />
        <StatInput
          dex={dex}
          setDex={setDex}
          intStat={intStat}
          setIntStat={setIntStat}
          vct={vct}
          setVct={setVct}
          fct={fct}
          setFct={setFct}
          delay={delay}
          setDelay={setDelay}
          cooldown={cooldown}
          setCooldown={setCooldown}
        />
        <ResultCard
          selectedSkill={selectedSkill}
          vctRaw={vctRaw}
          fctRaw={fctRaw}
          totalCast={totalCast}
          resultTime={resultTime}
          delay={delay}
          cooldown={cooldown}
          skillData={skillData}
          dex={dex}
          intStat={intStat}
          statSum={statSum}
          sqrtTerm={sqrtTerm}
          vctPercent={vctPercent}
          fct={fct}
          baseMode={baseMode}
        />
        <GlossarySection />
      </div>
    </main>
  );
}
