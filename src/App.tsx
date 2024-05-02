import { Global, css } from "@emotion/react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import reset from "./style/reset";
import datePicker from "./style/datepicker";
import googleTranslate from "./style/googleTranslate";
import { Home } from "./page/Home";
import { Splash } from "./page/Splash";
import { KakaoRedirection } from "./page/KakaoRedirection";
import { CodingTest } from "./page/CodingTest";
import { CodeCompare } from "./page/CodeCompare";
import { NotFound } from "./page/NotFound";
import { QuestionSelect } from "./page/QuestionSelect";
import { MyPage } from "./page/MyPage";
import { MobilePopup, RouteChangeTracker } from "./components";
import { Bookmark } from "./page/Bookmark";
import { BookmarkList } from "./page/BookmarkList";
import { LastQuestionList } from "./page/LastQuestionList";
import { metaData } from "./meta/metaData";
import { HelmetRootMetaTags } from "./components";
import { getLoginCookie } from "./utils/loginCookie";
import { useWindowSize } from "./hook";

function App() {
  const PrivateRoutes = () => {
    return getLoginCookie() ? <Outlet /> : <Navigate to="/splash" replace />;
  };
  const MobileSensitiveRoutes = () => {
    const { width } = useWindowSize();
    if (width <= 480) {
      return <MobilePopup />;
    }
    return <Outlet />;
  };
  return (
    <>
      <HelmetProvider>
        <HelmetRootMetaTags meta={metaData.app} />
        <BrowserRouter>
          <RouteChangeTracker />
          <Global
            styles={css`
              ${reset}
              ${datePicker} 
              ${googleTranslate}
            `}
          />
          <Routes>
            <Route path="/splash" element={<Splash />} />
            <Route path="/kakao/callback" element={<KakaoRedirection />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/bookmark/:id" element={<Bookmark />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/bookmarkList" element={<BookmarkList />} />
              <Route path="/lastQuestionList" element={<LastQuestionList />} />
              <Route element={<MobileSensitiveRoutes />}>
                <Route path="/codingTest/:id" element={<CodingTest />} />
                <Route path="/codeCompare/:id" element={<CodeCompare />} />
                <Route path="/question/select" element={<QuestionSelect />} />
              </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path={"*"} element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
