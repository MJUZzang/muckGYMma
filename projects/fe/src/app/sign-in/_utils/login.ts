const kakaoClientId = "0221112a190a270857db8f30a55b3145";
const kakaoRedirectUri = "http://localhost:8080/oauth";
const googleClientId = "17323196341-4nme1rs6chphmp86r9lgfnlp1inbj4cp.apps.googleusercontent.com";
const googleRedirectUri = "http://localhost:8080/oauth";

export const kakaoLoginUrl =
    process.env.NODE_ENV === "development"
        ? `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}`
        : "";
export const googleLoginUrl =
    process.env.NODE_ENV === "development"
        ? `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${googleRedirectUri}&client_id=${googleClientId}`
        : "";
