import React, { useState, useEffect, useRef } from "react";

const CircularCasting = ({ progress, isAnimating, timeLeft, totalTime, vctPercent, fctPercent, delayPercent, resultTime, totalCast }: any) => {
  const radius = 40;
  const stroke = 8;
  const norm = 2 * Math.PI * radius;
  const vctLen = norm * (vctPercent / 100);
  const fctLen = norm * (fctPercent / 100);
  const delayLen = norm * (delayPercent / 100);
  const vctProg = Math.min(progress, vctPercent);
  const fctProg = progress > vctPercent ? Math.min(progress - vctPercent, fctPercent) : 0;
  const delayProg = progress > vctPercent + fctPercent ? Math.min(progress - vctPercent - fctPercent, delayPercent) : 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={2 * (radius + stroke)} height={2 * (radius + stroke)}>
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} stroke="#3b82f6" strokeWidth={stroke} fill="none"
          strokeDasharray={`${vctLen} ${norm - vctLen}`}
          strokeDashoffset={norm - (vctProg / 100) * norm}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        <circle cx={radius + stroke} cy={radius + stroke} r={radius} stroke="#a21caf" strokeWidth={stroke} fill="none"
          strokeDasharray={`${fctLen} ${norm - fctLen}`}
          strokeDashoffset={norm - ((vctPercent + fctProg) / 100) * norm}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        {delayPercent > 0 && (
          <circle cx={radius + stroke} cy={radius + stroke} r={radius} stroke="#f59e42" strokeWidth={stroke} fill="none"
            strokeDasharray={`${delayLen} ${norm - delayLen}`}
            strokeDashoffset={norm - ((vctPercent + fctPercent + delayProg) / 100) * norm}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ top: radius + stroke - 20, left: '50%', transform: 'translate(-50%, 0)' }}>
        <span className="text-lg font-bold">{isAnimating ? `${timeLeft.toFixed(1)}s` : `${resultTime.toFixed(1)}s`}</span>
        <span className="text-xs text-gray-500">วงกลม</span>
      </div>
    </div>
  );
};

const CastingAnimation = ({
  vctTime,
  fctTime,
  totalTime,
  delay,
  cooldown,
  resultTime,
}: {
  vctTime: number;
  fctTime: number;
  totalTime: number;
  delay: number;
  cooldown: number;
  resultTime: number;
}) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(resultTime);
  const [tab, setTab] = useState<'bar' | 'circular'>('bar');
  const [auto, setAuto] = useState(false);
  const vctPercent = (vctTime / resultTime) * 100;
  const fctPercent = (fctTime / resultTime) * 100;
  const delayPercent = resultTime > totalTime ? ((resultTime - totalTime) / resultTime) * 100 : 0;

  // Refs for audio elements
  const startSoundRef = useRef<HTMLAudioElement | null>(null);
  const castingSoundRef = useRef<HTMLAudioElement | null>(null);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    startSoundRef.current = new Audio("/casting-start.mp3");
    castingSoundRef.current = new Audio("/casting-loop.mp3");
    completeSoundRef.current = new Audio("/casting-complete.mp3");
    if (castingSoundRef.current) castingSoundRef.current.loop = true;
    return () => { castingSoundRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      setProgress(0);
      setTimeLeft(resultTime);
      startSoundRef.current?.play();
      setTimeout(() => { castingSoundRef.current?.play(); }, 500);
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            clearInterval(timeInterval);
            setIsAnimating(false);
            castingSoundRef.current?.pause();
            castingSoundRef.current?.load();
            completeSoundRef.current?.play();
            if (auto) setTimeout(() => setIsAnimating(true), 500);
            return 100;
          }
          return prev + 1;
        });
      }, resultTime * 1000 / (100 * 10));
      const timeInterval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 0.1);
          return Number(newTime.toFixed(1));
        });
      }, 100 / 10);
      return () => {
        clearInterval(progressInterval);
        clearInterval(timeInterval);
        castingSoundRef.current?.pause();
        castingSoundRef.current?.load();
      };
    }
  }, [isAnimating, resultTime, auto]);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-700 mr-2">ตัวอย่างการร่าย</h3>
          <div className="inline-flex rounded border border-gray-300 overflow-hidden">
            <button
              className={`px-3 py-1 text-xs font-medium ${tab === 'bar' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTab('bar')}
              disabled={isAnimating}
            >Bar</button>
            <button
              className={`px-3 py-1 text-xs font-medium border-l ${tab === 'circular' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTab('circular')}
              disabled={isAnimating}
            >Circular</button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAuto((a) => !a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${auto ? 'bg-green-100 border-green-400 text-green-700' : 'bg-white border-gray-300 text-gray-700'}`}
            disabled={isAnimating}
          >
            {auto ? 'หยุดออโต้' : 'ร่ายออโต้'}
          </button>
          <button
            onClick={() => setIsAnimating(true)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors flex items-center ${isAnimating ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            disabled={isAnimating}
          >
            <img src="/casting-icon.svg" alt="cast" className={`w-4 h-4 mr-2 ${isAnimating ? "animate-spin" : ""}`} />
            {isAnimating ? "กำลังร่าย..." : "เริ่มร่าย"}
          </button>
        </div>
      </div>
      {/* Animation Type */}
      {tab === 'bar' ? (
        <div className="relative">
          {/* Progress Bar */}
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            {/* VCT Progress */}
            <div
              className="absolute h-full bg-blue-500 transition-all duration-100"
              style={{
                width: `${Math.min(progress, vctPercent)}%`,
                opacity: isAnimating ? 1 : 0.7,
              }}
            >
              {progress <= vctPercent && isAnimating && (
                <div className="absolute top-0 right-0 h-full w-2 bg-white animate-pulse" />
              )}
            </div>
            {/* FCT Progress */}
            <div
              className="absolute h-full bg-purple-500 transition-all duration-100"
              style={{
                left: `${vctPercent}%`,
                width: `${progress > vctPercent ? Math.min(progress - vctPercent, fctPercent) : 0}%`,
                opacity: isAnimating ? 1 : 0.7,
              }}
            >
              {progress > vctPercent && progress < vctPercent + fctPercent && isAnimating && (
                <div className="absolute top-0 right-0 h-full w-2 bg-white animate-pulse" />
              )}
            </div>
            {/* Delay/Cooldown Progress */}
            {delayPercent > 0 && (
              <div
                className="absolute h-full bg-orange-400 transition-all duration-100"
                style={{
                  left: `${vctPercent + fctPercent}%`,
                  width: `${progress > vctPercent + fctPercent ? Math.min(progress - vctPercent - fctPercent, delayPercent) : 0}%`,
                  opacity: isAnimating ? 1 : 0.7,
                }}
              >
                {progress > vctPercent + fctPercent && progress < 100 && isAnimating && (
                  <div className="absolute top-0 right-0 h-full w-2 bg-white animate-pulse" />
                )}
              </div>
            )}
            {/* Countdown Timer */}
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              {isAnimating ? `${timeLeft.toFixed(1)}s` : `${resultTime.toFixed(1)}s`}
            </div>
          </div>
          {/* Legend */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />VCT</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />FCT</div>
            {delayPercent > 0 && <div className="flex items-center"><div className="w-3 h-3 bg-orange-400 rounded-full mr-2" />Delay/Cooldown</div>}
          </div>
        </div>
      ) : (
        <CircularCasting
          progress={progress}
          isAnimating={isAnimating}
          timeLeft={timeLeft}
          totalTime={totalTime}
          vctPercent={vctPercent}
          fctPercent={fctPercent}
          delayPercent={delayPercent}
          resultTime={resultTime}
          totalCast={totalTime}
        />
      )}
      {/* Legend for circular is below the SVG */}
      {tab === 'circular' && (
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />VCT</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />FCT</div>
          {delayPercent > 0 && <div className="flex items-center"><div className="w-3 h-3 bg-orange-400 rounded-full mr-2" />Delay/Cooldown</div>}
        </div>
      )}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
          <span>VCT: {vctTime.toFixed(2)}s</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
          <span>FCT: {fctTime.toFixed(2)}s</span>
        </div>
        {delayPercent > 0 && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-2" />
            <span>Delay/Cooldown: {(resultTime - totalTime).toFixed(2)}s</span>
          </div>
        )}
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2" />
          <span>รวม: {resultTime.toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
};

export default CastingAnimation; 