import React, { useState } from "react";

interface SidePanelProps {
  onCreate: (options: {
    singleView: boolean;
    expirationTime: string | null;
  }) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ onCreate }) => {
  const [singleView, setSingleView] = useState(true);
  const [expirationTime, setExpirationTime] = useState("1h");

  const handleSingleViewToggle = (value: boolean) => {
    setSingleView(value);
  };

  return (
    <div className="w-64 bg-[#F1E5CF] rounded-xl border-4 border-[#3b2e1d] p-4 flex flex-col gap-4 sticky top-5">
      <h2 className="text-lg font-bold text-[#3b2e1d] text-center">Opções</h2>

      <label className="flex items-center justify-between">
        <span className="text-sm text-[#3b2e1d]">Visualização única</span>
        <input
          type="checkbox"
          checked={singleView}
          onChange={(e) => handleSingleViewToggle(e.target.checked)}
          className="w-5 h-5 cursor-pointer accent-[#3b2e1d]"
        />
      </label>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#3b2e1d]">Tempo para expirar</label>
        <select
          value={expirationTime}
          onChange={(e) => setExpirationTime(e.target.value)}
          disabled={singleView}
          className={`w-full p-2 border rounded-md text-sm ${
            singleView
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-gray-700"
          }`}
        >
          <option value="1h">1 hora</option>
          {/* <option value="6h">6 horas</option>
          <option value="12h">12 horas</option>
          <option value="1d">1 dia</option>
          <option value="3d">3 dias</option>
          <option value="7d">1 semana</option> */}
        </select>
      </div>

      <button
        className="mt-4 cursor-pointer bg-[#3b2e1d] text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-[#2c2217] transition"
        onClick={() => {
          onCreate({
            singleView,
            expirationTime: singleView ? null : expirationTime,
          });
        }}
      >
        Criar
      </button>
    </div>
  );
};

export default SidePanel;
