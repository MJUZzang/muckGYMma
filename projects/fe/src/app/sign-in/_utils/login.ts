const kakaoClientId = "0221112a190a270857db8f30a55b3145";
const kakaoRedirectUri =
    process.env.NODE_ENV === "development"
        ? "https://muckgymma.kro.kr/sign-in/oauth/kakao"
        : "https://muckgymma.kro.kr/sign-in/oauth/kakao";

const googleClientId =
    "17323196341-4nme1rs6chphmp86r9lgfnlp1inbj4cp.apps.googleusercontent.com";
const googleRedirectUri =
    process.env.NODE_ENV === "development"
        ? "https://muckgymma.kro.kr/sign-in/oauth/google"
        : "https://muckgymma.kro.kr/sign-in/oauth/google";

const googleScope = "email profile";

export const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}`;
export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=${googleScope}`;