/* NVIDIA Inception membership, worded per NVIDIA's guidance: "member", never
   partner, certified, endorsed or invested. Do not substitute the plain NVIDIA
   logo; only the official Inception member badge belongs here. */

/* BADGE SLOT (footer only). The official full-colour member badge, unmodified,
   from NVIDIA's partner kit; NVIDIA designates this same white-box artwork for
   dark backgrounds. Badge rules: no colour, proportion or text changes; keep
   clear space; at least 30px box height on screen; never larger than the
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
  if (variant === "footer") {
    const badge = inceptionBadge;
    return (
      <div className="shell footer-credential" data-inception-badge={badge ? "image" : "text"}>
        {badge ? (
          <>
            <span className="footer-credential-label" aria-hidden="true">Member of</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the badge file as-is at a fixed size */}
            <img src={badge.src} width={badge.width} height={badge.height} alt={badge.alt} decoding="async" loading="lazy" />
          </>
        ) : (
          <span className="footer-credential-label">{copy.footer}</span>
        )}
      </div>
    );
  }
  return (
    <p className="inception-member inception-member-about">
      <span>{copy.about}</span>
    </p>
  );
}
