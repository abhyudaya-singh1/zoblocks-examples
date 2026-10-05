import { useEffect, useState } from "react";
import { InfusionLoader } from "./components/zoblocks/infusion-loader";

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <InfusionLoader progress={progress} label="Importing records" showLabel />
    </div>
  );
}
