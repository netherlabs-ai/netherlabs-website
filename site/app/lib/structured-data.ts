import { contactEmail, siteName, siteOrigin } from "./site";
import type { Product } from "./products";

// schema.org JSON-LD builders. Only facts that are already public on the page.
const url = (path: string) => new URL(path, siteOrigin).toString();
export const organizationId = `${siteOrigin}/#organization`;
export const websiteId = `${siteOrigin}/#website`;

export function organization() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: url("/"),
    logo: { "@type": "ImageObject", url: url("/logo.png"), width: 512, height: 512 },
    email: contactEmail,
    founder: { "@type": "Person", name: "Yves La Rose" },
    address: { "@type": "PostalAddress", addressLocality: "Ottawa", addressRegion: "ON", addressCountry: "CA" },
  };
}

export function website() {
  return { "@type": "WebSite", "@id": websiteId, name: siteName, url: url("/"), publisher: { "@id": organizationId }, inLanguage: "en" };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: url(item.path) })),
  };
}

export function faqPage(path: string, faqs: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url(path)}#faq`,
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
}

// No offers, prices or ratings: none exist yet. Availability is stated as status text.
export function softwareApplication(product: Product) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${url(product.path)}#software`,
    name: product.name,
    description: product.description,
    url: url(product.path),
    image: url(product.ogImage),
    applicationCategory: product.applicationCategory,
    operatingSystem: product.operatingSystem,
    creativeWorkStatus: `${product.status}; no external release yet. Early-access interest list open.`,
    publisher: { "@id": organizationId },
    author: { "@id": organizationId },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
