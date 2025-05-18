import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";

interface EditorAreaProps {
  onContentChange?: (content: string) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({ onContentChange }) => {
  const [markdown, setMarkdown] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (onContentChange) {
      onContentChange(markdown);
    }
  }, [markdown, onContentChange]);

  const getMarkdownText = () => {
    const rawMarkup = marked.parse(markdown);
    return { __html: rawMarkup };
  };

  return (
    <div className="flex flex-col flex-1 bg-[#F1E5CF] rounded-xl border-4 border-[#3b2e1d] p-4 text-gray-600">
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="flex-1 p-2 rounded-md border border-gray-300 resize-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <div
          className="flex-1 overflow-auto cursor-text markdown-preview break-words break-all whitespace-pre-wrap"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      )}
    </div>
  );
};

export default EditorArea;
