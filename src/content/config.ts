import { defineCollection, z } from "astro:content";

const productsCollection = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    nameShort: z.string(),
    category: z.string(),
    categoryLabel: z.string(),
    cas: z.string(),
    molecularWeight: z.string(),
    sequence: z.string().optional(),
    purity: z.string(),
    appearance: z.string().optional(),
    molecularFormula: z.string().optional(),
    solubility: z.string().optional(),
    storage: z.string().optional(),
    aminoAcids: z.string().optional(),

    metaDescription: z.string(),
    heroSubtitle: z.string().optional(),
    heroTitle: z.string(),
    description: z.string(),
    productImage: z.string().optional(),
    sku: z.string().optional(),

    specifications: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    configurations: z.array(z.object({ name: z.string(), content: z.string(), bestFor: z.string() })).optional(),
    researchAreas: z.array(z.object({ area: z.string(), description: z.string() })).optional(),
    mechanisms: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
    qualitySpecs: z.array(z.object({ parameter: z.string(), method: z.string(), criterion: z.string() })).optional(),

    pricingTiers: z.array(z.object({ volume: z.string(), discount: z.string(), audience: z.string() })).optional(),

    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),

    relatedProducts: z.array(z.object({ name: z.string(), subtitle: z.string(), url: z.string() })).optional(),

    complianceText: z.string().optional(),
    ctaText: z.string().optional(),
    ctaSubtitle: z.string().optional(),
  }),
});

export const collections = { products: productsCollection };
