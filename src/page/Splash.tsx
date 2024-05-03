import { useState } from "react";
import styled from "@emotion/styled";
import { Header, HelmetMetaTags, SplashCarousel } from "../components";
import KakaoImg from "../assets/kakao_logo.svg";
import googleImg from "../assets/googleLogo.svg";
import { metaData } from "../meta/metaData.ts";
import { useEventTracker, useWindowSize } from "../hook";

export const Splash = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundColors = ["#F5D3D3", "#D3E7F5", "#F5E9D3", "#D9F5D3"];
  const currentBgColor = backgroundColors[currentSlide];

  const { width } = useWindowSize();
  const isMobile = (width ?? 0) <= 480;

  const handleKakaoLogin = () => {
    const kakaoRestApi = import.meta.env.VITE_KAKAO_REST_API;
    const rediretUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${rediretUri}&response_type=code`;

    const trackEvent = useEventTracker();
    trackEvent({
      category: "Auth",
      action: "login",
      label: "Kakao",
    });

    window.location.href = link;
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;

    window.location.href = authUrl;
  };

  return (
    <>
      <HelmetMetaTags meta={metaData.splash} />
      <Header />
      <StyledMain>
        <StyledSection style={{ backgroundColor: currentBgColor }}>
          <div>
            <SplashCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            {!isMobile && (
              <LoginContain>
                <StyledButton onClick={handleKakaoLogin}>
                  <img src={KakaoImg} alt="카카오 소셜 로고" />
                  카카오 로그인
                </StyledButton>
                <StyledButton onClick={handleGoogleLogin}>
                  <img src={googleImg} alt="구글 소셜 로고" />
                  구글 로그인
                </StyledButton>
              </LoginContain>
            )}
          </div>
        </StyledSection>
        {isMobile && (
          <LoginContain>
            <StyledButton onClick={handleKakaoLogin}>
              <img src={KakaoImg} alt="카카오 소셜 로고" />
              카카오 로그인
            </StyledButton>
            <StyledButton onClick={handleGoogleLogin}>
              <img src={googleImg} alt="구글 소셜 로고" />
              구글 로그인
            </StyledButton>
          </LoginContain>
        )}
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  height: calc(100vh - 6.25rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 880px) {
    height: auto;
    overflow-x: hidden;
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const StyledSection = styled.section`
  width: 100%;
  padding: 2rem 0;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 480px) {
    overflow-x: hidden;
    height: 515px;
    padding: 1.25rem 0;
  }

  & > div {
    position: relative;
    width: 100%;
    max-width: 74.0625rem;
    overflow: hidden;
    margin: 0 0.625rem;

    @media (max-width: 880px) {
      height: auto;
      /* overflow: visible; */
      max-height: unset;
      overflow-x: hidden;
    }
  }
`;

const LoginContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  bottom: 123px;
  & > button:last-of-type {
    background-color: #fff;
  }
  @media only screen and (max-width: 880px) {
    position: initial;
    align-items: center;
  }
  @media only screen and (max-width: 480px) {
    & > button:last-of-type {
      border: 1px solid #eee;
    }
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border: none;
  background-color: #fee500;
  color: #000000;
  font-size: 1rem;
  width: 10.875rem;
  height: 3.125rem;
  border-radius: 6px;
  cursor: pointer;
  & > img {
    width: 23px;
    margin-right: 2.375rem;
  }
  /* 
  @media (min-width: 768px) and (max-width: 880px) {
    bottom: 6.25rem;
  }

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  } */

  /* @media only screen and (max-width: 480px) {
    top: 37.0625rem;
    bottom: unset;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    padding: 0 7.0625rem;
    white-space: nowrap;
    & > img {
      margin-right: 0.625rem;
    }
  } */
`;
