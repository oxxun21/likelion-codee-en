import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore.ts";
import { getKakaoLoginAPI } from "../api";
import { Loading } from "../components";

export const KakaoRedirection = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  useEffect(() => {
    if (code) {
      getKakaoLoginAPI(code, navigate, setUserInfo).catch(console.error);
    }
  }, [code, navigate, setUserInfo]);

  return <Loading />;
};
