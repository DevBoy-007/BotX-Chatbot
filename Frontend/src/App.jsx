import Approutes from "./routes/approutes";
import { BrowserRouter } from "react-router-dom";
import { VoiceProvider } from "./context/voicecontext.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <VoiceProvider>
          <AuthProvider>
            <Approutes />
          </AuthProvider>
        </VoiceProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
