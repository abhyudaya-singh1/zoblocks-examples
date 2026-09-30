import { Switch } from "./components/zoblocks/switch";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Switch
        label="Advance directive on file"
        checked="unknown"
        absentReason="not-collected"
        stateLabels="yes-no"
      />
    </div>
  );
}
