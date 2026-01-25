export interface Config {
  identity: {
    title: string;
    username: string;
    hostname: string;
    greeting: string;
  };
  about: {
    bio: string[];
    currently: {
      prefix: string;
      linkText: string;
      link: string;
      suffix: string;
    };
    interests: string[];
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
      emoji: string;
      name: string;
      description: string;
      inlineLink?: {
        text: string;
        url: string;
      };
      tech: string[];
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
