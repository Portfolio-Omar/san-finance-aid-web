
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const RichTextEditor = ({ value, onChange, placeholder, rows = 10 }: RichTextEditorProps) => {
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd
      });
    }
  };

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = start + before.length + selectedText.length + after.length;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
        textareaRef.current.focus();
      }
    }, 0);
  };

  const insertLineText = (prefix: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const lines = value.split('\n');
    let currentLine = 0;
    let charCount = 0;

    // Find which line the cursor is on
    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLine = i;
        break;
      }
      charCount += lines[i].length + 1; // +1 for newline
    }

    // Add prefix to current line
    lines[currentLine] = prefix + lines[currentLine];
    const newText = lines.join('\n');
    onChange(newText);

    // Set cursor position after the prefix
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = start + prefix.length;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
        textareaRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('**', '**')}
          className="h-8 px-2"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('*', '*')}
          className="h-8 px-2"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertLineText('# ')}
          className="h-8 px-2"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertLineText('## ')}
          className="h-8 px-2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertLineText('### ')}
          className="h-8 px-2"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertLineText('- ')}
          className="h-8 px-2"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertLineText('1. ')}
          className="h-8 px-2"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelectionChange}
        placeholder={placeholder}
        rows={rows}
        className="border-0 resize-none focus-visible:ring-0"
      />
    </div>
  );
};
