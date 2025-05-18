import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";

interface EditorAreaProps {
  onContentChange?: (content: string) => void;
  value?: string;
}

const EditorArea: React.FC<EditorAreaProps> = ({ onContentChange, value }) => {
  const [markdown, setMarkdown] = useState(value ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing && value !== undefined && value !== markdown) {
      setMarkdown(value);
    }
  }, [value, isEditing, markdown]);

  const handleBlur = () => {
    setIsEditing(false);
    if (onContentChange) {
      onContentChange(markdown);
    }
  };

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
          onBlur={handleBlur}
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
