import type { Metadata, Viewport } from "next";
import "@/_styles/globals.css";
import NavBar from "@/_components/NavBar";
import DarkMode from "@/_components/DarkMode";
import StoreProvider from "@/_components/StoreProvider";
import InitialLoad from "./_components/InitialLoad";

const APP_NAME = "먹짐마";
const APP_DEFAULT_TITLE = "먹짐마";
const APP_TITLE_TEMPLATE = "%s - 다이어트&식단관리";
const APP_DESCRIPTION = "최고의 피트니스 앱";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    icons: {
        apple: [
            {
                rel: "apple-touch-icon",
                url: "/apple-touch-icon.png",
                href: "/apple-touch-icon.png",
                sizes: "180x180",
            },
        ],
        icon: [
            {
                rel: "icon",
                url: "/favicon-32x32.png",
                href: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                rel: "icon",
                url: "/favicon-16x16.png",
                href: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
                href: "/safari-pinned-tab.svg",
                color: "#5bbad5",
            },

            //  splash screens
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphone5_splash.png",
                media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphone6_splash.png",
                media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphoneplus_splash.png",
                media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphonex_splash.png",
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphonexr_splash.png",
                media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/iphonexsmax_splash.png",
                media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/ipad_splash.png",
                media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/ipadpro1_splash.png",
                media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/ipadpro3_splash.png",
                media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
            },
            {
                rel: "apple-touch-startup-image",
                url: "/splashscreens/ipadpro2_splash.png",
                media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
            },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: "#0B1416",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`max-h-[100dvh] bg-app-bg`}>
                <StoreProvider>
                    <InitialLoad>
                        <div className="overflow-hidden">{children}</div>
                        <NavBar />
                        <DarkMode />
                    </InitialLoad>
                </StoreProvider>
            </body>
        </html>
    );
}
