/* NVIDIA Inception membership, worded per NVIDIA's guidance: "member", never
   partner, certified, endorsed or invested. Do not substitute the plain NVIDIA
   logo; only the official Inception member badge belongs here. */

/* BADGE SLOT (footer only). The official full-colour member badge, unmodified,
   from NVIDIA's partner kit. Badge rules: no colour, proportion or text changes;
   keep clear space; at least 30px box height on screen; never larger than the
   Nether Labs logo; no link implying endorsement. Set to null for the text line. */
export const inceptionBadge: { src: string; width: number; height: number; alt: string } | null = {
  src: "/brand/nvidia-inception-program-badge.svg",
  width: 500,
  height: 216,
  alt: "NVIDIA Inception Program member",
};

const copy = {
  footer: "Member of NVIDIA Inception",
  about: "Nether Labs is a member of NVIDIA Inception, NVIDIA’s program for startups.",
} as const;

export default function InceptionMember({ variant }: { variant: keyof typeof copy }) {
  const badge = variant === "footer" ? inceptionBadge : null;
  return (
    <p className={`inception-member inception-member-${variant}`} data-inception-badge={badge ? "image" : "text"}>
      {badge ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export serves the badge file as-is at a fixed size
        <img src={badge.src} width={badge.width} height={badge.height} alt={badge.alt} decoding="async" loading="lazy" />
      ) : (
        <span>{copy[variant]}</span>
      )}
    </p>
  );
}
