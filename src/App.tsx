import { Global, css } from "@emotion/react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import reset from "./style/reset";
import datePicker from "./style/datepicker";
import googleTranslate from "./style/googleTranslate";
import { Home } from "./page/Home";
import { Splash } from "./page/Splash";
import { KakaoRedirection } from "./page/KakaoRedirection";
import { GoogleRedirection } from "./page/GoogleRedirection";
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
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { loadGoogleTranslate, refreshTranslateElement } from "./utils/googleTranslate";

function App() {
  const translateElementRef = useRef<HTMLDivElement>(null);
  const [translateWidgetLoaded, setTranslateWidgetLoaded] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["googtrans"]);

  useEffect(() => {
    if (translateElementRef.current) {
      loadGoogleTranslate(setTranslateWidgetLoaded, setCookie, refreshTranslateElement, translateElementRef.current.id);
    }
  }, [setCookie]);

  useEffect(() => {
    const targetLanguage = "en";
    const initialCookie = "/ko/en";

    if (!cookies.googtrans) {
      setCookie("googtrans", initialCookie, { path: "/" });
    }

    if (cookies.googtrans !== initialCookie && translateWidgetLoaded) {
      refreshTranslateElement(targetLanguage);
      setCookie("googtrans", initialCookie, { path: "/" });
    }
  }, [cookies.googtrans, translateWidgetLoaded, setCookie]);

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
          <div ref={translateElementRef} id="google_translate_element" style={{ display: "none" }}></div>
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
            <Route path="/google/callback" element={<GoogleRedirection />} />
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
