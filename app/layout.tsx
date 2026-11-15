import type { Metadata } from "next";
import { Bricolage_Grotesque, Shrikhand } from "next/font/google";
import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { BottomBar } from "@/components/BottomBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fillTemplate } from "@/lib/format";
import "./tokens.css";
import "./globals.css";

const textFont = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-text", display: "swap" });
const scriptFont = Shrikhand({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  title: { default: ui.meta.title, template: `%s · ${ui.meta.title}` },
  description: fillTemplate(ui.meta.description, {
    name: ui.meta.title,
    ...infos.address,
    phone: infos.phone_display,
  }),
  robots: { index: false, follow: false },
};

const MAIN_CONTENT_ID = "contenu";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${textFont.variable} ${scriptFont.variable}`}>
      <body>
        <div className="page">
          <a className="skip-link" href={`#${MAIN_CONTENT_ID}`}>
            {ui.navigation.skip_to_content}
          </a>
          <SiteHeader />
          <main id={MAIN_CONTENT_ID}>{children}</main>
          <SiteFooter />
          <BottomBar />
        </div>
      </body>
    </html>
  );
}
