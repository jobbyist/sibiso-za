import whiteAsset from "@/assets/sibiso-white.png.asset.json";
import blackAsset from "@/assets/sibiso-black.png.asset.json";

const whiteLogo = whiteAsset.url;
const blackLogo = blackAsset.url;

export function Logo({ className = "", forceVariant }: { className?: string; forceVariant?: "light" | "dark" }) {
  if (forceVariant === "light") {
    return <img src={whiteLogo} alt="Sibiso Marketing" className={className} draggable={false} />;
  }
  if (forceVariant === "dark") {
    return <img src={blackLogo} alt="Sibiso Marketing" className={className} draggable={false} />;
  }
  return (
    <>
      <img src={blackLogo} alt="Sibiso Marketing" className={`block dark:hidden ${className}`} draggable={false} />
      <img src={whiteLogo} alt="Sibiso Marketing" className={`hidden dark:block ${className}`} draggable={false} />
    </>
  );
}
