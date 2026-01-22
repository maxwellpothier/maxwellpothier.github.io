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
        <div className="flex flex-col gap-2 max-w-2xl">
          <p className="text-lg font-bold">{config.identity.greeting}</p>
          <div className="mt-2">
            Type <span className="text-brand-link">projects</span> to see what I'm working on, 
            or <span className="text-brand-link">contact</span> to get in touch.
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="font-bold mb-1">Connect with me:</div>
            <div className="flex gap-4 items-center">
              <span className="w-6 text-center">📧</span>
              <span className="w-24 font-bold">Email:</span>
              <a href={`mailto:${config.content.social.email}`} className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{config.content.social.email}</a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-6 text-center">🔗</span>
              <span className="w-24 font-bold">Github:</span>
              <a href={`https://github.com/${config.content.social.github}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{config.content.social.github}</a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-6 text-center">💼</span>
              <span className="w-24 font-bold">Linkedin:</span>
              <a href={`https://linkedin.com/in/${config.content.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{config.content.social.linkedin}</a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-6 text-center">𝕏</span>
              <span className="w-24 font-bold">Twitter:</span>
              <a href={`https://x.com/${config.content.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{config.content.social.twitter}</a>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-6 text-center">📝</span>
              <span className="w-24 font-bold">Substack:</span>
              <a href={`https://${config.content.social.substack}`} target="_blank" rel="noopener noreferrer" className="text-brand-link underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:outline-none focus:bg-brand-link focus:text-brand-highlightText transition-colors">{config.content.social.substack}</a>
            </div>
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="flex flex-col gap-4">
          {config.content.projects.map((project, i) => (
            <div key={i} className="flex flex-col gap-1">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-link font-bold underline decoration-dotted underline-offset-4 hover:no-underline hover:bg-brand-link hover:text-brand-highlightText focus:bg-brand-link focus:text-brand-highlightText focus:outline-none w-fit px-1 -ml-1 transition-colors"
              >
                {project.name}
              </a>
              <div className="text-brand-foreground">{project.description}</div>
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
