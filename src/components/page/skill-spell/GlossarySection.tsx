import React from "react";

export default function GlossarySection() {
  return (
    <div id="glossary" className="max-w-2xl mx-auto px-4 mt-10 mb-8">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-3 text-blue-700">Glossary</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><b>Skill Name</b> = ชื่อสกิล</li>
          <li><b>Skill Description</b> = คำอธิบายสกิล</li>
          <li><b>Level</b> = เลเวลของสกิล</li>
          <li><b>Base Damage</b> = หากเป็นสกิลบัฟ จะเป็นการเพิ่มพลังโจมตี หากเป็นสกิลโจมตี จะแสดงความแรงในการโจมตี</li>
          <li><b>Formula</b> = ข้อมูลสำหรับเด็กเนิร์ด</li>
          <li><b>Duration</b> = ระยะเวลาของสกิล</li>
          <li><b>SP</b> = SP ที่ใช้</li>
          <li><b>Effect Chance</b> = โอกาศสำเร็จในการแสดงผล</li>
          <li><b>VCT</b> = ระยะการร่ายแบบแปรผัน</li>
          <li><b>FCT</b> = ระยะเวลาการร่ายแบบคงที่</li>
          <li><b>Delay</b> = ดีเลย์หลังการใช้งาน</li>
          <li><b>Cooldown</b> = คูลดาวน์หลังการใช้งาน</li>
          <li><b>Note</b> = ข้อมูลเสริม</li>
        </ul>
        <div className="mt-4 text-xs text-gray-600">
          <b>VCT Scaling 630</b> = VCT (seconds) = (BaseVCT - Sum_VCT) × (1 − SQRT[&#123;DEX × 2 + INT&#125; ÷ 630]) × (1 − Sum_GearVCTReduc ÷ 100) × (1 − Sum_SkillVCTReduc ÷ 100)
        </div>
      </div>
    </div>
  );
} 