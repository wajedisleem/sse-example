import { useEffect, useState } from 'react';

function App() {
  const [progress, setProgress] = useState({ percent: 0 });

  useEffect(() => {
    const evtSource = new EventSource('http://localhost:3000/events');

    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data);
    };

    evtSource.addEventListener('done', () => {
      console.log('Worker complete!');
    });

    return () => evtSource.close();
  }, []);

  return (
    <div>
      <h2>Progress: {progress.percent}%</h2>
      <progress value={progress.percent} max="100" />
    </div>
  );
}

export { App };
