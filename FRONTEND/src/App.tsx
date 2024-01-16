import AuthModal from "./components/AuthModal";
import { useGeneralStore } from "./stores/generalStore";

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);
  return <>{isLoginOpen && <AuthModal />}</>;
}

export default App;
