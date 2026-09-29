import { Switch } from "./components/zoblocks/switch";

export default function App() {
  return (
    <div>
      <Switch
        label="Advance directive on file"
        checked="unknown"
        absentReason="not-collected"
        stateLabels="yes-no"
      />
    </div>
  );
}
