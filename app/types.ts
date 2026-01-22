export interface Config {
  identity: {
    title: string;
    username: string;
    hostname: string;
    greeting: string;
  };
  content: {
    ascii: string[];
    social: {
      email: string;
      github: string;
      linkedin: string;
      twitter: string;
      substack: string;
    };
    projects: Array<{
      name: string;
      description: string;
      link: string;
    }>;
  };
  theme: {
    colors: {
      background: string;
      foreground: string;
      banner: string;
      border: {
        visible: boolean;
        color: string;
      };
      prompt: {
        default: string;
        user: string;
        host: string;
        input: string;
      };
      link: {
        text: string;
        highlightColor: string;
        highlightText: string;
      };
      commands: {
        textColor: string;
      };
    };
    font: {
      family: string;
      fallback: string;
    };
  };
}

export type CommandType = 'help' | 'banner' | 'about' | 'projects' | 'contact' | 'clear' | 'error' | 'system';

export interface CommandOutput {
  type: CommandType;
  input: string;
  output: React.ReactNode;
}
