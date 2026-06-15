import whiteLogo from "@/assets/sibiso-white.svg";
import blackLogo from "@/assets/sibiso-black.svg";

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
