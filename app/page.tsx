import Terminal from './components/Terminal';
import config from './config.json';

export default function Home() {
  return (
    <main>
      <Terminal config={config} />
    </main>
  );
}
