import whiteAsset from "@/assets/sibiso-white.svg.asset.json";
import blackAsset from "@/assets/sibiso-black.svg.asset.json";

const whiteLogo = whiteAsset.url;
const blackLogo = blackAsset.url;

export function Logo({ className = "", forceVariant }: { className?: string; forceVariant?: "light" | "dark" }) {
  if (forceVariant === "light") {
    return <img src={whiteLogo} alt="Sibiso Marketing" width={200} height="auto" className={className} />;
  }
  if (forceVariant === "dark") {
    return <img src={blackLogo} alt="Sibiso Marketing" width={200} height="auto" className={className} />;
  }
  return (
    <>
      <img src={blackLogo} alt="Sibiso Marketing" width={200} height="auto" className={`block dark:hidden ${className}`} />
      <img src={whiteLogo} alt="Sibiso Marketing" width={200} height="auto" className={`hidden dark:block ${className}`} />
    </>
  );
}
