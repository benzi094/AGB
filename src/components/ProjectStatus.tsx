import { STATUS_LABELS, type ProjectStatus } from "@/data/projects";

// Statut discret : même présentation pour « En cours » et « Terminé », seul le point change de couleur.
export default function ProjectStatusLabel({
  status,
  onDark = false,
}: {
  status?: ProjectStatus;
  onDark?: boolean;
}) {
  if (!status) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold font-oswald uppercase tracking-widest ${
        onDark ? "text-white/80" : "text-slate-500"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === "completed" ? "bg-brand-green" : "bg-accent"}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
