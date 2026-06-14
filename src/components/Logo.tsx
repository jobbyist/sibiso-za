import whiteLogo from "@/assets/sibiso-white.svg.asset.json";
import blackLogo from "@/assets/sibiso-black.svg.asset.json";

export function Logo({ className = "", forceVariant }: { className?: string; forceVariant?: "light" | "dark" }) {
  if (forceVariant === "light") {
    return <img src={whiteLogo.url} alt="Sibiso Marketing" width={150} height="auto" className={className} />;
  }
  if (forceVariant === "dark") {
    return <img src={blackLogo.url} alt="Sibiso Marketing" width={150} height="auto" className={className} />;
  }
  return (
    <>
      <img src={blackLogo.url} alt="Sibiso Marketing" width={150} height="auto" className={`block dark:hidden ${className}`} />
      <img src={whiteLogo.url} alt="Sibiso Marketing" width={150} height="auto" className={`hidden dark:block ${className}`} />
    </>
  );
}
