import { Config } from '../types';

export const COMMANDS = [
  { name: 'help', description: 'List all commands' },
  { name: 'banner', description: 'Display welcome message' },
  { name: 'about', description: 'Learn about me' },
  { name: 'projects', description: 'View my projects' },
  { name: 'contact', description: 'Get in touch' },
  { name: 'dark', description: 'Switch to dark mode' },
  { name: 'light', description: 'Switch to light mode' },
  { name: 'clear', description: 'Clear terminal' },
];

export const processCommand = (input: string, config: Config): React.ReactNode => {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case 'help':
      return (
        <div className="flex flex-col gap-1">
          <div className="mb-2 text-brand-link">Available commands:</div>
          <table className="w-full max-w-md">
            <tbody>
              {COMMANDS.map((c) => (
                <tr key={c.name}>
                  <td className="w-24 text-brand-link font-bold">{c.name}</td>
                  <td className="text-brand-foreground">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-brand-foreground/80">
            <div>Shortcuts:</div>
            <div>[Tab] Auto-complete</div>
            <div>[Esc] Clear line</div>
            <div>[↑/↓] History</div>
          </div>
        </div>
      );

    case 'banner':
      return (
        <div className="whitespace-pre-wrap font-bold text-brand-banner leading-none">
          {config.content.ascii.join('\n')}
        </div>
      );

    case 'about':
      return (
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex flex-col gap-3">
            {config.about.bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="mt-2">
            <span className="font-bold">Currently:</span> {config.about.currently.prefix}
            <a
              href={config.about.currently.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors"
            >{config.about.currently.linkText}</a>
            {config.about.currently.suffix}
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {config.about.interests.map((interest, i) => (
              <span key={i} className="px-2 py-1 border border-current text-sm">{interest}</span>
            ))}
          </div>

          <div className="mt-4 text-brand-foreground/80">
            Type <span className="text-brand-link font-bold">projects</span> to see what I'm building,
            or <span className="text-brand-link font-bold">contact</span> to get in touch.
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="flex flex-col gap-4">
          {config.content.projects.map((project, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>{project.emoji}</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-link font-bold underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:bg-brand-link focus:text-brand-highlightText focus:outline-none transition-colors"
                >
                  {project.name}
                </a>
              </div>
              <div className="text-brand-foreground ml-7">
                {project.description}
                {project.inlineLink && (
                  <a
                    href={project.inlineLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors"
                  >
                    {project.inlineLink.text}
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 ml-7 mt-1">
                {project.tech.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 border border-current opacity-70">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'contact':
      const { social } = config.content;
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <span className="w-20 font-bold">Email:</span>
            <a href={`mailto:${social.email}`} className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{social.email}</a>
          </div>
          <div className="flex gap-4">
            <span className="w-20 font-bold">GitHub:</span>
            <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">github.com/{social.github}</a>
          </div>
          <div className="flex gap-4">
            <span className="w-20 font-bold">LinkedIn:</span>
            <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">linkedin.com/in/{social.linkedin}</a>
          </div>
          <div className="flex gap-4">
            <span className="w-20 font-bold">X:</span>
            <a href={`https://x.com/${social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">x.com/{social.twitter}</a>
          </div>
           <div className="flex gap-4">
            <span className="w-20 font-bold">Substack:</span>
            <a href={`https://${social.substack}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{social.substack}</a>
          </div>
        </div>
      );
      
    case '':
      return null;

    default:
      return (
        <div>
          <span className="text-red-500">Command not found: {cmd}</span>. Type <span className="text-brand-link">help</span> for a list of commands.
        </div>
      );
  }
};
