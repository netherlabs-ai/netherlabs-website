/* NVIDIA Inception membership, worded per NVIDIA's guidance: "member", never
   partner, certified, endorsed or invested. Do not substitute the plain NVIDIA
   logo; only the official Inception member badge belongs here. */

/* BADGE SLOT. To show the official badge, put its file in public/brand/ and
   set this to { src: "/brand/<file>", width, height } (intrinsic pixels).
   That is the only change needed: the footer shows the badge in place of its
   line (the line becomes the image's alt text), the About page shows it beside
   its sentence. */
export const inceptionBadge: { src: string; width: number; height: number } | null = null;

const copy = {
  footer: "Member of NVIDIA Inception",
  about: "Nether Labs is a member of NVIDIA Inception, NVIDIA’s program for startups.",
} as const;

export default function InceptionMember({ variant }: { variant: keyof typeof copy }) {
  const text = copy[variant];
  const badge = inceptionBadge;
  const replacesText = variant === "footer";
  return (
    <p className={`inception-member inception-member-${variant}`} data-inception-badge={badge ? "image" : "text"}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the badge file as-is at a fixed size */}
      {badge && <img src={badge.src} width={badge.width} height={badge.height} alt={replacesText ? text : ""} decoding="async" loading="lazy" />}
      {!(badge && replacesText) && <span>{text}</span>}
    </p>
  );
}
