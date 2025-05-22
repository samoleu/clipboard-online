import React, { useState } from "react";
import "./markdown.css";
import ClipboardCode from "./components/ClipboardCode";
import EditorArea from "./components/EditorArea";
import SidePanel from "./components/SidePanel";
import axios from "axios";

const App: React.FC = () => {
  const [texto, setTexto] = useState("");
  const [codigo, setCodigo] = useState("");

  const [, setOptions] = useState<{
    singleView: boolean;
    expirationTime: string | null;
  } | null>(null);

  const recoverContent = async () => {
    if (codigo.trim() === "") return;

    const response = await axios.get(
      `http://localhost:3000/clipboard/${codigo}`
    );
    if (response.status === 200) {
      setTexto(response.data.content);
    }
  };

  const handleCreate = async (opts: {
    singleView: boolean;
    expirationTime: string | null;
  }) => {
    setOptions(opts);

    const payload = {
      content: texto,
      singleVisualization: opts.singleView,
    };

    console.log("Payload para envio:", payload);
    const response = await axios.post(
      "http://localhost:3000/clipboard",
      payload
    );
    if (response.status === 201) {
      setCodigo(response.data.code);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className="relative w-[1680px] bg-[#a87c4f] rounded-3xl border-8 border-[#3b2e1d] shadow-xl pt-16 pb-6 m-12 flex flex-col"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        <ClipboardCode
          code={codigo}
          setCode={setCodigo}
          onSelect={(code) => {
            setCodigo(code);
            recoverContent();
          }}
        />
        <div className="flex flex-1 px-6 gap-4">
          <EditorArea
            value={texto}
            onContentChange={(content) => setTexto(content)}
          />
          <SidePanel onCreate={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default App;
