/**
 * 对比页数据（P3）—— 5 组同族分子的可核实差异。
 * 每条比较性事实在页面 sourceNote 中给出处；价格不在本文件内写死，一律走 src/data/pricing.ts。
 */

export interface Cluster {
  slug: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  columns: string[];
  rows: string[][];
  guidance: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  products: { slug: string; label: string }[];
  sourceNote: string;
}

export const CLUSTERS: Cluster[] = [
  {
    slug: "ghrp-family",
    h1: "GHRP-2 vs GHRP-6 vs Ipamorelin",
    title: "GHRP-2 vs GHRP-6 vs Ipamorelin",
    description:
      "Compare the GHRP family for research use: sequence length, receptor, published GH potency, ACTH/cortisol effects, appetite endpoints and list prices.",
    intro:
      "All three molecules are ghrelin-receptor (GHS-R1a) agonists, but they are not interchangeable tools. The comparison below uses the published comparative characterisation of the family (Raun et al., 1998, European Journal of Endocrinology, in conscious swine; DOI 10.1530/eje.0.1390552) plus the sequences and catalogue data listed for each product on this site.",
    columns: ["Parameter", "GHRP-2", "GHRP-6", "Ipamorelin"],
    rows: [
      ["Structure", "Hexapeptide: D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH₂", "Hexapeptide: His-D-Trp-Ala-Trp-D-Phe-Lys-NH₂", "Pentapeptide: Aib-His-D-2-Nal-D-Phe-Lys-NH₂"],
      ["Receptor", "GHS-R1a (ghrelin receptor)", "GHS-R1a (ghrelin receptor)", "GHS-R1a (ghrelin receptor); reported Ki ≈ 63 nM in transfected cells"],
      ["Published GH release (swine)", "Higher potency, lower efficacy: ED50 0.6 nmol/kg, Emax 56 ng/mL", "Lower potency, higher efficacy: ED50 3.9 nmol/kg, Emax 74 ng/mL", "ED50 2.3 nmol/kg, Emax 65 ng/mL"],
      ["ACTH / cortisol", "Raised in the comparative study", "Raised in the comparative study", "No significant elevation above GHRH-stimulated levels, even at >200× the GH ED50"],
      ["Appetite-related endpoints", "Reported as weaker than GHRP-6", "Most orexigenic member of the family (NPY/AgRP-linked food-intake signalling)", "Reported as minimal in the characterisation data"],
      ["Catalogue kit sizes", "5 mg × 10 vials", "5 mg and 10 mg × 10 vials", "5, 10 and 20 mg × 10 vials"],
    ],
    guidance: [
      {
        title: "Studying appetite or food-intake endpoints",
        text: "GHRP-6 is the family member whose literature centres on orexigenic signalling. If your readout is appetite-driven rather than GH-driven, GHRP-6 is the standard comparator.",
      },
      {
        title: "Designing a GH-selective protocol",
        text: "Ipamorelin is the only member of the family whose published characterisation reports no significant ACTH or cortisol elevation, which is why it is the usual partner peptide in GHRH-plus-secretagogue designs.",
      },
      {
        title: "Comparing potency against efficacy",
        text: "GHRP-2 is the more potent but less efficacious molecule in the published swine data. If your design is a dose-response curve, that distinction matters more than a single ED50 number.",
      },
    ],
    faq: [
      {
        q: "What is the main difference between GHRP-2 and GHRP-6?",
        a: "Both are hexapeptide ghrelin-receptor agonists, but their published profiles differ: GHRP-2 released GH with higher potency and lower maximal efficacy, while GHRP-6 was the more efficacious and more orexigenic molecule in the comparative porcine study (Raun et al., 1998).",
      },
      {
        q: "Which GHRP does not raise cortisol or ACTH?",
        a: "Ipamorelin. In the same comparative design it produced no significant ACTH or cortisol elevation above GHRH-stimulated levels, even at doses more than 200-fold the GH-releasing ED50, whereas GHRP-2 and GHRP-6 both raised them.",
      },
      {
        q: "Can these secretagogues be combined with a GHRH analogue?",
        a: "Yes. Research designs commonly pair a ghrelin-receptor agonist with a GHRH-receptor agonist such as CJC-1295 (with or without DAC) or Sermorelin, because the two act on different upstream receptors. We supply the pre-formulated CJC-1295 + Ipamorelin blend as a separate product for that purpose.",
      },
      {
        q: "Are prices shown per kit?",
        a: "Yes. Every list price on this site is per kit of 10 vials, taken from our published wholesale price list. Volume discounts apply from 5 kits (10%), 20 kits (20%) and 50 kits (30%).",
      },
    ],
    products: [
      { slug: "ghrp-2", label: "GHRP-2" },
      { slug: "ghrp-6", label: "GHRP-6" },
      { slug: "ipamorelin", label: "Ipamorelin" },
      { slug: "cjc-1295-no-dac", label: "CJC-1295 (no DAC)" },
      { slug: "sermorelin", label: "Sermorelin" },
    ],
    sourceNote:
      "Published comparative data: Raun K. et al., Ipamorelin, the first selective growth hormone secretagogue, Eur J Endocrinol 139(5):552-561 (1998). DOI: 10.1530/eje.0.1390552 Catalogue sequences and kit sizes are as listed on each product page.",
  },
  {
    slug: "cjc-1295-dac-vs-no-dac",
    h1: "CJC-1295 with DAC vs without DAC",
    title: "CJC-1295 with DAC vs without DAC",
    description:
      "The two CJC-1295 forms share a tetrasubstituted GHRH(1-29) backbone but differ by the DAC linker: albumin binding, half-life, GH pattern and price compared.",
    intro:
      "CJC-1295 is sold in two distinct forms that differ by roughly three orders of magnitude in circulating half-life. The difference is a single C-terminal linker: the Drug Affinity Complex (DAC), a maleimidopropionic acid moiety that forms a covalent bond with serum albumin. Choosing between them is a research-design decision about the duration of GHRH-receptor stimulation.",
    columns: ["Parameter", "CJC-1295 with DAC", "CJC-1295 without DAC (Mod GRF 1-29)"],
    rows: [
      ["Backbone", "Tetrasubstituted GHRH(1-29): D-Ala², Gln⁸, Ala¹⁵, Leu²⁷", "Same tetrasubstituted GHRH(1-29) backbone"],
      ["Linker", "C-terminal maleimidopropionic acid (DAC) linker on a Lys residue", "None"],
      ["Albumin binding", "Covalent thioether bond with Cys34 of serum albumin", "No covalent albumin binding"],
      ["Reported half-life", "≈6–8 days", "≈30 minutes"],
      ["GH stimulation pattern", "Sustained elevation", "Discrete pulse"],
      ["Residue count / listed mass", "30 residues including linker; ~3,649.2 Da (catalogue)", "29 residues; ~3,367.1 Da (catalogue)"],
      ["Main research implication", "Long exposure window; the stimulus cannot be withdrawn quickly", "Exposure ends within hours; suited to pulse-oriented designs"],
    ],
    guidance: [
      {
        title: "Choose the DAC form when the design needs a sustained stimulus",
        text: "Because the albumin conjugate circulates for days, it suits protocols where a continuous GHRH-receptor stimulus is the variable under study. Note the corollary: exposure cannot be ended quickly once administered.",
      },
      {
        title: "Choose the no-DAC form when the design needs a discrete pulse",
        text: "Mod GRF(1-29) clears within hours, so a stimulation window can be limited to the observation period. It is also the component used in our pre-formulated CJC-1295 + Ipamorelin blend.",
      },
      {
        title: "Tell them apart analytically before you trust a label",
        text: "The ~282 Da mass difference between the two forms is the routine check. A vendor quoting a multi-day half-life for a product whose mass matches the linker-free analogue is describing the wrong molecule — a documented point of confusion in this compound class.",
      },
    ],
    faq: [
      {
        q: "What exactly is the DAC in CJC-1295?",
        a: "The Drug Affinity Complex is a maleimidopropionic acid linker attached at the C-terminus. After administration it reacts with the free thiol of Cys34 on serum albumin, forming a covalent thioether bond that converts the peptide into an albumin-bound conjugate (Jetté et al., 2005; DOI 10.1210/en.2004-1286).",
      },
      {
        q: "Why is the half-life difference so large?",
        a: "Native GHRH(1-29) is cleared in about 7 minutes, mostly by DPP-IV cleavage at the Tyr¹-Ala² bond. The four backbone substitutions extend that to roughly 30 minutes; covalent albumin binding then protects the peptide from both proteolysis and renal filtration, giving a reported half-life of about 6–8 days.",
      },
      {
        q: "Is the receptor pharmacology the same for both forms?",
        a: "Reported binding work indicates yes: the linker sits outside the N-terminal receptor-binding domain, so GHRH-receptor affinity is described as unchanged by the DAC modification. The difference is pharmacokinetic, not receptor-level.",
      },
      {
        q: "Which form should a first order be?",
        a: "That depends on your protocol rather than on potency. If you need to compare against published pulse-based GHRH data, the no-DAC form matches that profile; if the study variable is prolonged receptor stimulation, choose the DAC form. Both are on the published price list.",
      },
    ],
    products: [
      { slug: "cjc-1295-dac", label: "CJC-1295 with DAC" },
      { slug: "cjc-1295-no-dac", label: "CJC-1295 without DAC" },
      { slug: "sermorelin", label: "Sermorelin (GHRH 1-29)" },
      { slug: "tesamorelin", label: "Tesamorelin (GHRH 1-44 analogue)" },
      { slug: "cjc-ipamorelin-blend", label: "CJC-1295 + Ipamorelin blend" },
    ],
    sourceNote:
      "DAC bioconjugation chemistry: Jetté L. et al., Endocrinology 146(7):3052-3058 (2005), DOI 10.1210/en.2004-1286, and the published DAC platform literature. Half-life ranges: published pharmacokinetic summaries for the two forms. Catalogue masses are as listed on each product page.",
  },
  {
    slug: "selank-vs-semax",
    h1: "Selank vs Semax",
    title: "Selank vs Semax",
    description:
      "Selank (tuftsin-derived) vs Semax (ACTH(4-7)-derived): sequences, shared Pro-Gly-Pro stabilisation, research streams and what human studies actually measured.",
    intro:
      "Both are synthetic heptapeptides carrying a Pro-Gly-Pro C-terminal extension, and both are widely described as nootropic-adjacent research peptides. Their precursors are unrelated, their literature streams are different, and the shared C-terminal motif is a stabilisation device rather than evidence of interchangeable pharmacology.",
    columns: ["Parameter", "Selank", "Semax"],
    rows: [
      ["Sequence", "Thr-Lys-Pro-Arg-Pro-Gly-Pro", "Met-Glu-His-Phe-Pro-Gly-Pro"],
      ["Precursor", "Tuftsin (Thr-Lys-Pro-Arg), an immunoglobulin G heavy-chain fragment", "ACTH(4-7) (Met-Glu-His-Phe), the CNS-directed fragment of ACTH"],
      ["Shared feature", "C-terminal Pro-Gly-Pro extension", "C-terminal Pro-Gly-Pro extension"],
      ["Why the extension is there", "Introduced to increase resistance to peptidases and extend duration of action", "Attached to protect the ACTH(4-7) core from peptidase hydrolysis"],
      ["Dominant research streams", "GABA-related cell experiments; enkephalin-degradation assays; BDNF expression in rat hippocampus", "Bdnf/Ngf and TrkB expression in cell and rat hippocampus models; neuroprotection endpoints"],
      ["Human data measured", "A 52-participant imaging study reported short-term resting-state connectivity changes (5 and 20 min after administration)", "Same imaging design included Semax; clinical reports concern stroke-rehabilitation populations"],
      ["What the data do not show", "Anxiolytic or cognitive benefit in healthy users", "Focus or cognitive benefit in healthy users"],
    ],
    guidance: [
      {
        title: "Match the peptide to the pathway you are measuring",
        text: "If your readouts are neurotrophin transcription (Bdnf, Ngf, TrkB), Semax is the peptide with that literature. If your readouts are GABA-related gene expression or enkephalin-degrading enzyme activity, use Selank.",
      },
      {
        title: "Do not treat the shared tail as a shared mechanism",
        text: "The Pro-Gly-Pro trio appears in both molecules because it improves metabolic stability. It is a scaffold modification, not a pharmacophore that makes the peptides equivalent.",
      },
      {
        title: "Read human studies by endpoint, not by headline",
        text: "The largest controlled human comparison measured resting-state functional connectivity in 52 healthy participants at 5 and 20 minutes. Connectivity changes are not cognitive or anxiolytic outcomes, and no such benefit should be inferred.",
      },
    ],
    faq: [
      {
        q: "Are Selank and Semax the same molecule with different names?",
        a: "No. Selank is H-Thr-Lys-Pro-Arg-Pro-Gly-Pro-OH, derived from tuftsin; Semax is H-Met-Glu-His-Phe-Pro-Gly-Pro-OH, derived from the ACTH(4-7) fragment. They share only the C-terminal Pro-Gly-Pro stabilisation motif.",
      },
      {
        q: "Why do both molecules end in Pro-Gly-Pro?",
        a: "Because that tripeptide increases resistance to peptidase hydrolysis, extending the useful lifetime of a short peptide. The same stabilisation strategy was applied to two unrelated lead sequences.",
      },
      {
        q: "What neurotrophin effects are reported for Semax?",
        a: "Cell and animal studies report increased transcription of Bdnf and Ngf (approximately 8-fold and 5-fold in glial cell culture) and raised Bdnf/TrkB mRNA in rat hippocampus. These are model-system findings, not clinical outcomes.",
      },
      {
        q: "Are human-use or dosing instructions available?",
        a: "No. Both products are supplied FOR LABORATORY RESEARCH USE ONLY. We provide no dosing, administration or application information of any kind, and no human or veterinary application is claimed or implied.",
      },
    ],
    products: [
      { slug: "selank", label: "Selank" },
      { slug: "semax", label: "Semax" },
      { slug: "epithalon", label: "Epithalon" },
      { slug: "dsip", label: "DSIP" },
      { slug: "pinealon", label: "Pinealon" },
    ],
    sourceNote:
      "Sequences and stabilisation rationale: published reviews of Semax and Selank (Russian regulatory-peptide literature). Human imaging endpoints: Panikratova et al., Doklady Biological Sciences 490:9-11 (2020), DOI 10.1134/s001249662001007x, 52 healthy participants. Rates and potencies are not compared because none are published as head-to-head human outcomes.",
  },
  {
    slug: "argireline-vs-snap-8",
    h1: "Argireline vs SNAP-8",
    title: "Argireline vs SNAP-8",
    description:
      "Argireline (acetyl hexapeptide-8) vs SNAP-8 (acetyl octapeptide-3): sequence, chain length, mass and SNARE-assembly assay positioning compared for research use.",
    intro:
      "Argireline and SNAP-8 are the two most-cited members of the SNAP-25 N-terminal mimetic family used in vesicle-docking research. They carry the same N-terminal hexapeptide motif; SNAP-8 extends it by two residues. The practical difference in an assay is chain length and its physicochemical consequences — not a different mechanism class.",
    columns: ["Parameter", "Argireline", "SNAP-8"],
    rows: [
      ["INCI-style description", "Acetyl hexapeptide-8", "Acetyl octapeptide-3"],
      ["Sequence", "Ac-Glu-Glu-Met-Gln-Arg-Arg-NH₂", "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH₂"],
      ["Residues", "6", "8"],
      ["Listed molecular weight (catalogue)", "~889.0 Da", "~1,073.2 Da"],
      ["Terminal modifications", "N-acetyl, C-amide", "N-acetyl, C-amide"],
      ["Mechanism class", "Structural interference with SNARE ternary-complex assembly (SNAP-25 N-terminal mimicry)", "Same mechanism class, longer chain"],
      ["Typical assay role", "Reference hexapeptide in SNARE-assembly and vesicle-docking readouts", "Length variant used to probe how chain extension changes the readout"],
    ],
    guidance: [
      {
        title: "Use the pair as a structure–activity series, not as substitutes",
        text: "Running both peptides in the same SNARE-assembly assay isolates the effect of the two-residue extension. If you only need one, match the chain length to the published series your protocol cites.",
      },
      {
        title: "Expect different solution behaviour",
        text: "The additional Ala-Asp residues change net charge and size, so solubility, filtration behaviour and analytical retention differ. Neither peptide has protease activity: competition, not cleavage, is the mechanism under study.",
      },
      {
        title: "Check the terminal protecting groups on the COA",
        text: "Both molecules are N-acetylated and C-amidated. An unmodified fragment is a different material with different stability, so the terminal groups belong in your identity confirmation.",
      },
    ],
    faq: [
      {
        q: "How do Argireline and SNAP-8 differ structurally?",
        a: "Argireline is the six-residue N-terminal motif Ac-Glu-Glu-Met-Gln-Arg-Arg-NH₂. SNAP-8 carries the same motif extended by Ala-Asp, for eight residues and roughly 184 Da more mass.",
      },
      {
        q: "Do they act through the same mechanism?",
        a: "They are studied as structural competitors in the same SNARE-complex-assembly assay system. The difference is chain length, not mechanism class — which is exactly why they are useful as a comparative pair.",
      },
      {
        q: "Are these cosmetic ingredients?",
        a: "No claim of cosmetic or human application is made for these listings. They are supplied as laboratory research peptides with a batch-specific COA, for in vitro research use only.",
      },
      {
        q: "Is Argireline on the published price list?",
        a: "Argireline is one of a small number of catalogue peptides not listed on the current wholesale price list, so its kit price is quoted on request within the published catalogue band. SNAP-8 has a fixed list price on the price list.",
      },
    ],
    products: [
      { slug: "argireline", label: "Argireline" },
      { slug: "snap-8", label: "SNAP-8" },
      { slug: "leuphasyl", label: "Leuphasyl" },
      { slug: "matrixyl", label: "Matrixyl" },
      { slug: "ahk-cu", label: "AHK-Cu" },
    ],
    sourceNote:
      "Sequences and terminal modifications as listed in the catalogue. Mechanism class described from the published SNAP-25 N-terminal mimetic literature. No efficacy or cosmetic claim is made.",
  },
  {
    slug: "bpc-157-vs-tb-500",
    h1: "BPC-157 vs TB-500",
    title: "BPC-157 vs TB-500",
    description:
      "BPC-157 vs TB-500 compared for research: precursor, sequence length, catalogue identity data, mechanism class, research areas, kit sizes and list prices.",
    intro:
      "These are the two most-bought repair-research peptides in the catalogue, and they are frequently confused because both are studied in tissue-repair models. Their molecular origins are unrelated: BPC-157 is a gastric-juice-derived pentadecapeptide, while TB-500 is derived from thymosin β4, an actin-binding protein.",
    columns: ["Parameter", "BPC-157", "TB-500"],
    rows: [
      ["Origin", "Partial sequence of BPC (Body Protection Compound) from human gastric juice", "Derived from thymosin β4, the actin-sequestering protein"],
      ["Length", "15 amino acids (pentadecapeptide)", "Thymosin β4-derived fragment"],
      ["Catalogue CAS / MW", "137525-51-0 · ~1,419.5 Da", "77591-33-4 · ~4,963.5 Da (as listed in our catalogue — see note below)"],
      ["Catalogue sequence", "H-Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val-OH", "Listed on the product page and in the downloadable dataset"],
      ["Mechanism class in the literature", "VEGF-linked angiogenesis signalling, focal-adhesion-kinase pathway, nitric-oxide system modulation; studied in GI-protection and tendon/ligament repair models", "Actin sequestration and cell-migration research; studied in wound-healing and angiogenesis models"],
      ["Catalogue kit sizes", "5, 10 and 20 mg × 10 vials", "5 and 10 mg × 10 vials"],
      ["Pre-formulated combination", "Available with TB-500 in one vial (BB10 / BB20 / BB30)", "Available with BPC-157 in one vial, and with GHK-Cu in the GLOW blend"],
    ],
    guidance: [
      {
        title: "Pick by mechanism, not by popularity",
        text: "If the readout is angiogenesis, VEGF expression or focal-adhesion signalling, BPC-157's literature is the match. If the readout is cell migration or actin cytoskeleton behaviour, use TB-500.",
      },
      {
        title: "Beware the mass check on thymosin-β4-derived products",
        text: "Catalogue CAS 77591-33-4 corresponds to full-length thymosin β4 (~4,963 Da), whereas short actin-binding fragments of the same protein appear at ~889 Da. Confirm which material a vendor is actually supplying with the COA mass spectrum before relying on a published protocol.",
      },
      {
        title: "Consider the blended presentation for combined protocols",
        text: "If a design calls for both peptides, the co-lyophilized BPC-157 + TB-500 kit removes a handling step and ships with component-level analytical documentation.",
      },
    ],
    faq: [
      {
        q: "Are BPC-157 and TB-500 the same kind of molecule?",
        a: "No. BPC-157 is a 15-amino-acid peptide derived from a gastric protein; TB-500 is derived from thymosin β4, an intracellular actin-binding protein. They are studied in overlapping repair models but through different mechanism classes.",
      },
      {
        q: "Can they be supplied in one vial?",
        a: "Yes. Our BB10, BB20 and BB30 kits contain BPC-157 and TB-500 co-lyophilized at matched ratios, with analytical documentation for each component batch.",
      },
      {
        q: "Why does the catalogue list TB-500 at ~4,963 Da?",
        a: "Because the CAS number 77591-33-4 listed for this product corresponds to full-length thymosin β4. Shorter actin-binding fragments of the same protein appear at around 889 Da. We publish the catalogue figure unchanged and flag the discrepancy here so buyers confirm the material against the batch COA mass spectrum.",
      },
      {
        q: "What documentation is included?",
        a: "A batch-specific COA with HPLC purity and ESI-MS identity for each kit, plus commercial invoice and packing list. Full chromatograms and spectra are available on request.",
      },
    ],
    products: [
      { slug: "bpc-157", label: "BPC-157" },
      { slug: "tb-500", label: "TB-500" },
      { slug: "thymosin-beta-4", label: "Thymosin Beta-4" },
      { slug: "bpc-tb-blend", label: "BPC-157 + TB-500 blend" },
      { slug: "glow-blend", label: "GLOW blend (with GHK-Cu)" },
    ],
    sourceNote:
      "Identity data and sequences as published on each product page and in the downloadable reference dataset. Mechanism descriptions follow published research on each peptide. Catalogue CAS/MW values are reproduced unchanged — including the flag on the thymosin β4 mass — so nothing is silently altered.",
  },
];
