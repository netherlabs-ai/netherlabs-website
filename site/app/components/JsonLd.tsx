// The only sanctioned raw-HTML sink: build-time schema.org data from our own
// typed constants, with "<" escaped so the payload cannot close the script tag.
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
