import React, { useState } from "react";
import "./markdown.css";
import ClipboardCode from "./components/ClipboardCode";
import EditorArea from "./components/EditorArea";
import SidePanel from "./components/SidePanel";

const App: React.FC = () => {
  const [texto, setTexto] = useState("");
  const [codigo, setCodigo] = useState("Ad21e7");

  const [options, setOptions] = useState<{
    singleView: boolean;
    expirationTime: string | null;
  } | null>(null);

  const handleCreate = (opts: {
    singleView: boolean;
    expirationTime: string | null;
  }) => {
    setOptions(opts);

    const payload = {
      code: codigo,
      content: texto,
      options: opts,
    };

    console.log("Payload para envio:", payload);
    // Fazer aqui a chamada para a API para criar o link
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className="relative w-[1680px] bg-[#a87c4f] rounded-3xl border-8 border-[#3b2e1d] shadow-xl pt-16 pb-6 m-12 flex flex-col"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        <ClipboardCode
          initialCode={codigo}
          onSelect={(code) => setCodigo(code)}
        />
        <div className="flex flex-1 px-6 gap-4">
          <EditorArea onContentChange={(content) => setTexto(content)} />
          <SidePanel onCreate={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default App;
