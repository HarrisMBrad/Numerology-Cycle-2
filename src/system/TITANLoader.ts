import fs from 'fs';
import yaml from 'yaml';

const file = fs.readFileSync('./src/system/titan-config.yaml', 'utf8');
const config = yaml.parse(file);
console.log(config);

export type TITANConfig = {
  titan: {
    cycle: number;
    title: string;
    numerology: {
      value: number;
      theme: string;
      phaseLabel: string;
      next: number;
      signalDate: string;
    };
  };
  identity: {
    owner: string;
    active_roles: string[];
    alignment_tag: string;
  };
  tasks: {
    id: string;
    name: string;
    focus: string;
  }[];
  phaseCore: {
    current: number;
    map: Record<number, string>;
  };
  context_engine: {
    active: boolean;
    memory_layer: string;
    mindset_recursion: boolean;
    status_log: string;
    lastCheckpoint: string;
  };
  directives: string[];
  export: {
    toMarkdown: boolean;
    toLogbook: boolean;
    triggerOnEOD: boolean;
  };
};

export function loadTITANConfig(): TITANConfig {
  const file = fs.readFileSync(configPath, 'utf8');
  return yaml.parse(file) as TITANConfig;
}

