import React from "react";
import CastingAnimation from "./CastingAnimation";

export default function ResultCard({ selectedSkill, vctRaw, fctRaw, totalCast, resultTime, delay, cooldown, skillData, dex, intStat, statSum, sqrtTerm, vctPercent, fct, baseMode }: any) {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-8 text-gray-800 shadow-xl mb-8 border border-gray-200">
      <h2 className="font-bold text-2xl mb-4 text-blue-700 drop-shadow">{selectedSkill.name} : ผลลัพธ์</h2>
      <div className="flex flex-col gap-2 text-lg mb-4">
        <span>VCT: <b>{vctRaw.toFixed(3)} s</b></span>
        <span>FCT: <b>{fctRaw.toFixed(3)} s</b></span>
        <span>เวลาร่ายรวม: <b>{totalCast.toFixed(3)} s</b></span>
        <span>ยิง/ร่ายใหม่ได้เร็วสุด: <b>{resultTime.toFixed(3)} s</b></span>
      </div>
      <CastingAnimation vctTime={vctRaw} fctTime={fctRaw} totalTime={totalCast} delay={delay} cooldown={cooldown} resultTime={resultTime} />
      <div className="mt-6 bg-white/80 rounded-xl p-4 border text-sm shadow-sm">
        <div className="font-semibold mb-1 text-blue-700">สูตร:</div>
        <div>
          <b>VCT Scaling 630</b> = VCT (seconds) = (BaseVCT - Sum_VCT) × (1 − SQRT[&#123;DEX × 2 + INT&#125; ÷ 630]) × (1 − Sum_GearVCTReduc ÷ 100) × (1 − Sum_SkillVCTReduc ÷ 100)
          <br />
          <span className="text-gray-500">แทนค่า:</span> ({skillData.baseVCT} - 0) × (1 − SQRT[&#123;{dex} × 2 + {intStat}&#125; ÷ 630]) × (1 − {vctPercent} / 100) × (1 − 0 / 100)
          <br />
          = {skillData.baseVCT} × (1 − sqrt({statSum} / 630)) × {vctPercent.toFixed(3)}
          <br />
          = {skillData.baseVCT} × (1 − {sqrtTerm.toFixed(4)}) × {vctPercent.toFixed(3)}
          <br />
          = <b>{vctRaw.toFixed(3)} s</b>
        </div>
        <div className="mt-2">
          FCT = BaseFCT × (1 - %ลดFCT / 100)
          <br />= {skillData.baseFCT} × (1 - {fct} / 100)
          <br />= <b>{fctRaw.toFixed(3)} s</b>
        </div>
        <div className="mt-2">
          เวลาร่ายรวม = VCT + FCT = <b>{vctRaw.toFixed(3)} + {fctRaw.toFixed(3)} = {totalCast.toFixed(3)} s</b>
        </div>
        <div className="mt-2">
          ยิง/ร่ายใหม่ได้เร็วสุด = Max(เวลาร่ายรวม, Delay, Cooldown) = <b>{resultTime.toFixed(3)} s</b>
        </div>
      </div>
    </div>
  );
} 