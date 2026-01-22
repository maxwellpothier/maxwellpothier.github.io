'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Config, CommandOutput } from '../types';
import { processCommand, COMMANDS } from '../utils/commands';

type ThemeMode = 'light' | 'dark';

const themes = {
  light: {
    background: '#FFFFFF',
    foreground: '#000000',
    banner: '#DA291C',
    promptUser: '#DA291C',
    promptHost: '#000000',
    promptInput: '#000000',
    linkText: '#DA291C',
    linkHighlight: '#000000',
    linkHighlightText: '#FFFFFF',
    headerBg: 'bg-white',
    outerBg: 'bg-white',
    borderColor: 'border-black',
    shadow: 'shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]',
    badge: 'bg-red-600',
  },
  dark: {
    background: '#0D1117',
    foreground: '#E6EDF3',
    banner: '#58A6FF',
    promptUser: '#58A6FF',
    promptHost: '#8B949E',
    promptInput: '#E6EDF3',
    linkText: '#58A6FF',
    linkHighlight: '#58A6FF',
    linkHighlightText: '#0D1117',
    headerBg: 'bg-[#161B22]',
    outerBg: 'bg-[#010409]',
    borderColor: 'border-[#30363D]',
    shadow: 'shadow-[10px_10px_0px_0px_rgba(88,166,255,0.3)]',
    badge: 'bg-[#238636]',
  },
};

interface TerminalProps {
  config: Config;
}

export default function Terminal({ config }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial banner
  useEffect(() => {
    const bannerOutput = processCommand('banner', config);
    const bootOutput = (
      <div className="mt-2 text-brand-foreground/80 space-y-1">
        <div>Boot sequence complete.</div>
        <div>Loading custom prompt and command registry...</div>
        <div className="mt-4">Type <span className="text-brand-link font-bold">help</span> to explore available commands.</div>
      </div>
    );

    setHistory([
      { type: 'banner', input: 'banner', output: bannerOutput },
      { type: 'system', input: 'system', output: bootOutput }
    ]);
    // Focus input on load
    inputRef.current?.focus();
  }, [config]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus
  const handleContainerClick = () => {
    // Only focus if user isn't selecting text
    if (!window.getSelection()?.toString()) {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    if (cmd.trim() === '') {
      setHistory(prev => [...prev, { type: 'error', input: '', output: null }]);
      return;
    }

    if (cmd.trim().toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd.trim().toLowerCase() === 'dark') {
      setTheme('dark');
      setHistory(prev => [...prev, {
        type: 'success' as any,
        input: cmd,
        output: <div className="text-[var(--fg-color)]">Switched to dark mode.</div>
      }]);
      return;
    }

    if (cmd.trim().toLowerCase() === 'light') {
      setTheme('light');
      setHistory(prev => [...prev, {
        type: 'success' as any,
        input: cmd,
        output: <div className="text-[var(--fg-color)]">Switched to light mode.</div>
      }]);
      return;
    }

    const output = processCommand(cmd, config);
    setHistory(prev => [...prev, { type: 'success' as any, input: cmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
      setDraftInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find(c => c.name.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match.name);
      }
    } else if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex === -1) {
        // Save current draft before moving up
        setDraftInput(input);
        // Find last real command input from history
        const lastCmdIndex = history.length - 1;
        if (lastCmdIndex >= 0) {
          setHistoryIndex(lastCmdIndex);
          setInput(history[lastCmdIndex].input);
        }
      } else {
        const nextIndex = historyIndex - 1;
        if (nextIndex >= 0) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex].input);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex].input);
        } else {
          // Restore draft
          setHistoryIndex(-1);
          setInput(draftInput);
        }
      }
    }
  };

  // Get current theme colors
  const currentTheme = themes[theme];

  // Inject CSS variables
  const style = {
    '--bg-color': currentTheme.background,
    '--fg-color': currentTheme.foreground,
    '--banner-color': currentTheme.banner,
    '--link-color': currentTheme.linkText,
    '--link-highlight': currentTheme.linkHighlight,
    '--link-highlight-text': currentTheme.linkHighlightText,
    '--prompt-user': currentTheme.promptUser,
    '--prompt-host': currentTheme.promptHost,
    '--prompt-input': currentTheme.promptInput,
    '--font-stack': config.theme.font.family,
  } as React.CSSProperties;

  return (
    <div
      className={`min-h-screen p-4 md:p-8 flex items-center justify-center font-mono transition-colors duration-300 ${currentTheme.outerBg}`}
      style={style}
      onClick={handleContainerClick}
    >
      <div className={`w-full max-w-4xl h-[80vh] md:h-[600px] border-2 flex flex-col bg-[var(--bg-color)] text-[var(--fg-color)] relative overflow-hidden transition-all duration-300 ${currentTheme.borderColor} ${currentTheme.shadow}`}>

        {/* Header Bar */}
        <div className={`h-8 border-b-2 flex items-center px-4 gap-2 shrink-0 transition-colors duration-300 ${currentTheme.headerBg} ${currentTheme.borderColor}`}>
          <div className="flex gap-2 group">
            <div className={`w-3 h-3 rounded-full bg-red-500 border group-hover:bg-red-600 ${currentTheme.borderColor}`}></div>
            <div className={`w-3 h-3 rounded-full bg-yellow-400 border group-hover:bg-yellow-500 ${currentTheme.borderColor}`}></div>
            <div className={`w-3 h-3 rounded-full bg-green-500 border group-hover:bg-green-600 ${currentTheme.borderColor}`}></div>
          </div>
          <div className="flex-1 text-center text-sm font-bold uppercase tracking-widest hidden sm:block text-[var(--fg-color)]">
            {config.identity.username}@{config.identity.hostname}
          </div>
          <div className={`text-xs font-bold border px-2 py-0.5 rounded-sm text-white ${currentTheme.badge} ${currentTheme.borderColor}`}>
            BASH
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide" ref={containerRef}>
          {history.map((entry, i) => (
            <div key={i} className="animate-fade-in">
              {entry.type !== 'banner' && entry.type !== 'system' && (
                <div className="flex gap-2 items-center mb-1 text-sm md:text-base">
                  <span className="text-[var(--prompt-user)] font-bold">{config.identity.username}</span>
                  <span className="text-[var(--prompt-host)]">@</span>
                  <span className="text-[var(--prompt-host)] font-bold">{config.identity.hostname}</span>
                  <span className="text-[var(--prompt-host)]">$</span>
                  <span className="text-[var(--prompt-input)] ml-1">{entry.input}</span>
                </div>
              )}
              <div className="ml-0 md:ml-4 leading-relaxed overflow-x-hidden">
                {entry.output}
              </div>
            </div>
          ))}
          
          {/* Current Input */}
          <div className="flex gap-2 items-center text-sm md:text-base">
            <span className="text-[var(--prompt-user)] font-bold">{config.identity.username}</span>
            <span className="text-[var(--prompt-host)]">@</span>
            <span className="text-[var(--prompt-host)] font-bold">{config.identity.hostname}</span>
            <span className="text-[var(--prompt-host)]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[var(--prompt-input)] ml-1 caret-[var(--banner-color)]"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal Input"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
