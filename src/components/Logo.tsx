import Image from "next/image";

// Logo officiel AGB (public/logo_agb.png, fond transparent, texte bleu marine).
// À placer sur un fond clair. Le zoom recadre les marges transparentes du PNG.
export default function Logo({ className = "h-9 w-[110px]" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/logo_agb.png"
        alt="African Global Business"
        fill
        sizes="240px"
        priority
        className="object-contain scale-[1.25]"
        style={{ transformOrigin: "21% 35%" }}
      />
    </div>
  );
}
