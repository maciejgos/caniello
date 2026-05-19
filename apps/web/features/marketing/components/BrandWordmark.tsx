import darkWordmark from "../assets/caniello-dark-wordmark.png";

type BrandWordmarkProps = {
  small?: boolean;
};

export function BrandWordmark({ small = false }: BrandWordmarkProps) {
  return (
    <span
      className={`block bg-left bg-no-repeat ${small ? "h-10 w-[160px] [background-size:190px_auto]" : "h-14 w-[190px] [background-size:220px_auto]"}`}
      style={{ backgroundImage: `url(${darkWordmark.src})` }}
      role="img"
      aria-label="Caniello"
    />
  );
}
