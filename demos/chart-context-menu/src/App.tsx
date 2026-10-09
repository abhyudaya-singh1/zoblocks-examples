import { ContextMenuStage } from "./context-menu-stage";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <ContextMenuStage density="standard" />
      </div>
    </main>
  );
}
