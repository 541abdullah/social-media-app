import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import { ErrorBoundary } from "react-error-boundary";
import Errorbound from "./components/mainerror";
import { lazy, Suspense } from "react";

const LazyMessenger = lazy(() => import("./components/messenger"))
const LazyWelcome = lazy(() => import("./components/welcomepage"))
const LazyProfile = lazy(() => import("./components/profile"))
const LazyExplore = lazy(() => import("./components/explore"))
const LazyPersonaldets = lazy(() => import("./components/personaldets"))
const LazyNewstory = lazy(() => import("./components/newstory"))


function App() {

  const nav = useNavigate();

  return (

    <ErrorBoundary FallbackComponent={Errorbound} onError={() => { console.log("error occured") }} onReset={(details) => { nav('/welcome', { replace: true }) }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/welcome' element={<Suspense ><LazyWelcome /></Suspense>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/messenger/:type/:data' element={<Suspense><LazyMessenger /></Suspense>} />
        <Route path='/profile/:username' element={<Suspense><LazyProfile /></Suspense>} />
        <Route path='/explore' element={<Suspense ><LazyExplore /></Suspense>} />
        <Route path='/settings/:currentuser' element={<Suspense><LazyPersonaldets /></Suspense>} />
        <Route path='/stories/:usrname/:extra/:self' element={<Suspense><LazyNewstory /></Suspense>} />
      </Routes>
    </ErrorBoundary>

  );
}

export default App;
