import React from "react";

interface ClipboardCodeProps {
  onSelect: (code: string) => void;
  code: string;
  setCode: (code: string) => void;
}

const ClipboardCode: React.FC<ClipboardCodeProps> = ({
  onSelect,
  code,
  setCode,
}) => {
  const handleSelect = () => {
    if (code.trim()) {
      onSelect(code.trim());
    }
  };

  return (
    <div className="absolute top-[-3rem] left-1/2 -translate-x-1/2 bg-gray-500 rounded-t-xl border-4 border-gray-800 px-6 py-3 shadow-md flex flex-col items-center">
      <div className="text-2xl text-gray-300 mb-1">Clipboard code</div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código"
        maxLength={6}
        className="text-xl font-bold text-gray-900 bg-white border border-gray-400 rounded px-2 py-1 w-32 text-center"
      />
      {code.trim() !== "" && (
        <button
          onClick={handleSelect}
          className="mt-2 text-sm font-semibold bg-[#3b2e1d] text-white px-4 py-1.5 rounded hover:bg-[#2c2217] transition"
        >
          Selecionar
        </button>
      )}
    </div>
  );
};

export default ClipboardCode;
