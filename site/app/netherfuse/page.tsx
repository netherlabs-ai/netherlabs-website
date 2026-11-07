import type { Metadata } from "next";
import ProductPage from "../components/ProductPage";
import { getProduct } from "../lib/products";
import { buildMetadata } from "../lib/site";

const product = getProduct("netherfuse");

export const metadata: Metadata = buildMetadata({
  title: product.title,
  description: product.description,
  path: product.path,
  image: { url: product.ogImage, alt: product.ogAlt },
});

export default function NetherfusePage() {
  return <ProductPage product={product} />;
}
