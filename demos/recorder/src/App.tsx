import { Recorder } from "./components/zoblocks/recorder";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Recorder
        variant="bars"
        phase="recording"
        device={{ deviceId: "jabra", label: "Jabra Link 380" }}
        expectedDevice={{ deviceId: "jabra", label: "Jabra Link 380" }}
      />
    </div>
  );
}
