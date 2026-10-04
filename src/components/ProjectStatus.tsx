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
      className={`inline-flex items-center gap-1.5 text-xs font-bold font-oswald uppercase tracking-wider ${
        onDark ? "text-white/85" : "text-slate-600"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${status === "completed" ? "bg-brand-green" : "bg-accent"}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
