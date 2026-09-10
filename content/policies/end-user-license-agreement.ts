import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const endUserLicenseAgreement: PolicyDoc = PolicyDocSchema.parse({
  slug: "end-user-license-agreement",
  title: "End User License Agreement",
  summary:
    "The terms under which Finquanta grants you the right to use TDL add-ons, boosters, and custom code modules developed by Finquanta.",
  lastUpdated: "2026-04-01",
  intro:
    "This End User License Agreement (\"EULA\") governs your use of TDL add-ons, boosters, and custom code developed by Finquanta Solutions India Private Limited (\"Finquanta\"). It does not cover TallyPrime itself, which is governed by Tally Solutions' own EULA.",
  sections: [
    {
      heading: "Licence grant",
      body: [
        "Finquanta grants you a non-exclusive, non-transferable licence to install and use the TDL modules and custom code listed on your invoice, for your own internal business use.",
        "The licence is tied to the Tally serial number(s) listed on your invoice. A separate licence is required for use on additional Tally serial numbers.",
      ],
    },
    {
      heading: "What you may do",
      body: [
        "Install the TDL module on the licensed Tally instances.",
        "Use it for your internal business operations indefinitely (or for the term listed on your invoice, if time-bound).",
        "Take unlimited backups of the TDL module for disaster-recovery purposes.",
      ],
    },
    {
      heading: "What you may not do",
      body: [
        "Redistribute, resell, sub-license, or publicly share the TDL module or any part of its source.",
        "Reverse-engineer, decompile, or derive the source code from any compiled module we deliver.",
        "Modify the TDL module in ways that cause it to misreport, mis-file, or otherwise violate statutory compliance.",
        "Use the module outside the Tally serial number(s) licensed.",
      ],
    },
    {
      heading: "Ownership & intellectual property",
      body: [
        "Finquanta retains full ownership of all intellectual property in the TDL modules, including source code, logic, documentation, and trademarks.",
        "For custom modules built on Statement of Work, IP ownership may be transferred to the customer if, and only if, this is explicitly stated in the SoW — and after full payment is received.",
      ],
    },
    {
      heading: "Updates & maintenance",
      body: [
        "Modules covered by active AMC receive updates at no extra cost, including compatibility updates for new TallyPrime releases.",
        "Standalone module purchases include 12 months of compatibility updates; renewals are available.",
      ],
    },
    {
      heading: "Warranty & disclaimers",
      body: [
        "Finquanta modules are delivered with a 30-day functional warranty from install date. Defects reported within the window are fixed at no charge.",
        "Outside the warranty window, modules are provided \"as-is\"; continuing support requires active AMC.",
        "Finquanta does not warrant that the modules are error-free under all conditions or that they will meet every future statutory change without further updates.",
      ],
    },
    {
      heading: "Termination",
      body: [
        "This licence terminates automatically if you breach any of the above terms. On termination, you must uninstall all copies of the module.",
        "Finquanta may terminate with 30 days' notice in cases of repeated breach or unpaid dues.",
      ],
    },
  ],
});
