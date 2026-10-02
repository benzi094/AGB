import Image from "next/image";

// Logo officiel AGB (public/logo_agb_trim.png : version recadrée au contenu, sans marges).
// À placer sur un fond clair. Ratio ~2.4:1, à respecter pour la taille.
export default function Logo({ className = "h-10 w-[96px]" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo_agb_trim.png"
        alt="African Global Business"
        fill
        sizes="240px"
        priority
        className="object-contain"
      />
    </div>
  );
}
