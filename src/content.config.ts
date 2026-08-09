import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    nameShort: z.string(),
    category: z.string(),
    categoryLabel: z.string(),
    cas: z.string(),
    molecularWeight: z.string(),
    sequence: z.string(),
    purity: z.string(),
    appearance: z.string(),
    molecularFormula: z.string(),
    solubility: z.string(),
    storage: z.string(),
    aminoAcids: z.string().optional(),
    aminoAcidsLabel: z.string().optional(),

    metaDescription: z.string(),
    heroSubtitle: z.string(),
    heroTitle: z.string(),
    description: z.string(),
    productImage: z.string().optional(),
    sku: z.string(),

    specifications: z.array(
      z.object({ label: z.string(), value: z.string() }),
    ),
    configurations: z.array(
      z.object({ name: z.string(), content: z.string(), bestFor: z.string() }),
    ),
    researchAreas: z.array(
      z.object({ area: z.string(), description: z.string() }),
    ),
    qualitySpecs: z.array(
      z.object({
        parameter: z.string(),
        method: z.string(),
        criterion: z.string(),
      }),
    ),
    pricingTiers: z.array(
      z.object({ volume: z.string(), discount: z.string(), audience: z.string() }),
    ),
    faq: z.array(
      z.object({ question: z.string(), answer: z.string() }),
    ),
    relatedProducts: z.array(
      z.object({ name: z.string(), subtitle: z.string(), url: z.string() }),
    ),

    mechanisms: z
      .array(z.object({ name: z.string(), description: z.string() }))
      .optional(),
    structural: z
      .array(
        z.object({
          modification: z.string(),
          what: z.string(),
          purpose: z.string(),
          effect: z.string(),
        }),
      )
      .optional(),
    pharmaco: z
      .array(z.object({ parameter: z.string(), value: z.string() }))
      .optional(),
    comparison: z
      .array(
        z.object({
          parameter: z.string(),
          semaglutide: z.string(),
          tirzepatide: z.string(),
          retatrutide: z.string(),
        }),
      )
      .optional(),
    applications: z
      .array(
        z.object({
          field: z.string(),
          application: z.string(),
          concentration: z.string(),
        }),
      )
      .optional(),

    qualityNote: z.string().optional(),
    comparisonNote: z.string().optional(),
    complianceText: z.string(),
    ctaText: z.string(),
    ctaSubtitle: z.string(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { products: productsCollection };
