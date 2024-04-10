export const backendUrlDev = "http://localhost:8080";
export const backendUrlProd = "https://muckgymma.kro.kr";
export const backendUrl =
    process.env.NODE_ENV === "development" ? backendUrlDev : backendUrlProd;

export const frontUrlDev = "https://localhost:3000";
export const frontUrlProd = "https://muckgymma.kro.kr";
export const frontUrl =
    process.env.NODE_ENV === "development" ? frontUrlDev : frontUrlProd;
