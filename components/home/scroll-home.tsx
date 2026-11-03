"use client";

import { TrustSection } from "@/components/proof/trust";
import { hasTrustContent } from "@/content/proof";
import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useModal } from "@/components/modals/modal-context";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { STILLS } from "@/lib/frames";
import { site } from "@/lib/site";
import { initScrollHome, SHORT_LANDSCAPE } from "./scroll-engine";
import "./scroll-home.css";

/**
 * Home page, 2026-10-30 redesign: two scroll-scrubbed Blender animations
 * (invoices → ledger, cartons → tracked rack) with the copy from
 * home_page_content.md around them. Everything the owner has not confirmed
 * (support hours, step durations, founder card, Tally on Cloud, facts strip)
 * is left out entirely rather than printed as a placeholder.
 *
 * The markup is static; components/home/scroll-engine.ts animates it and
 * cleans up on unmount. Styles are scoped under `.fq3d` in scroll-home.css.
 */

const PRODUCTS = [
  ["/tally-erp-9-products/tallyprime", "TallyPrime Silver", "For one user on one computer."],
  ["/tally-erp-9-products/tallyprime", "TallyPrime Gold", "For teams: many users on your office network."],
  ["/tally-erp-9-products/tallyprime-server", "TallyPrime Server", "For larger teams with many people working in Tally at once."],
  ["/tally-erp-9-products/tally-software-services", "Tally Software Services (TSS)", "The yearly renewal that keeps TallyPrime up to date with new releases and statutory changes."],
  ["/tally-erp-9-products/tally-virtual-user", "Tally Virtual User", "Tally's own cloud-hosted TallyPrime, rented per user."],
  ["/tally-erp-9-products/auditors-edition", "TallyPrime Auditor's Edition", "For chartered accountants who audit client books in Tally."],
  ["/tally-erp-9-products/tally-erp-9", "Tally.ERP 9", "Still on Tally.ERP 9? We'll move you to TallyPrime when you're ready."],
] as const;

const SERVICES = [
  ["/tallyprime-pricing", "Licences & renewals", "Buy, activate and renew TallyPrime and TSS through us."],
  ["/tally-services", "Setup & data migration", "We install TallyPrime, set up your company, and move your data over from Tally.ERP 9, an older version or spreadsheets."],
  ["/tally-services/training", "Training", "Hands-on sessions for your accounts team, on your own data."],
  ["/tally-services/amc-annual-support", "Support & AMC", "Help by phone, remote session or on-site visit, as one-off fixes or a yearly contract."],
  ["/tally-customization", "Customisation (TDL)", "Invoice formats, reports and vouchers changed to match how you work."],
  ["/tally-integration", "Integrations", "Connect Tally to the other software you run."],
  ["/tally-gst", "GST, e-invoice & e-way bill", "Set up correctly in TallyPrime so filing doesn't become a monthly scramble."],
] as const;

/**
 * The six steps of "How we work". Every line comes from home_page_content.md
 * §3–§5; durations are shown only once confirmed (site.facts.stepTimes).
 */
const STEPS = [
  {
    title: "Call",
    lead: "Tell us how you work today and what's slowing you down.",
    points: [
      "We tell you honestly whether TallyPrime fits.",
      "You see which licence suits you: Silver (one user) or Gold (multi-user).",
      "Then a written scope and quote. Nothing starts until you agree.",
    ],
  },
  {
    title: "Written scope & quote",
    lead: "You get a written scope and a quote in writing.",
    points: [
      "Licence prices are set by Tally Solutions.",
      "Our fees for setup, training and support are quoted separately, in writing.",
      "Nothing starts until you agree.",
    ],
  },
  {
    title: "Licence & setup",
    lead: "We activate your licence and install TallyPrime.",
    points: [
      "Silver ₹22,500 or Gold ₹67,500, lifetime licence (+18% GST), or rent monthly.",
      "Your company, ledgers and GST details set up.",
      "Invoice formats, reports and vouchers changed to match how you work, if you need it.",
    ],
  },
  {
    title: "Data migration",
    lead: "We bring over your existing data.",
    points: [
      "From Tally.ERP 9, an older version of Tally or spreadsheets.",
      "Opening balances checked with you before you go live.",
      "Tally connected to the other software you run, if you need it.",
    ],
  },
  {
    title: "Training",
    lead: "Practical sessions for the people who'll use Tally every day.",
    points: [
      "Hands-on, for your accounts team.",
      "On your own data, not a demo company.",
    ],
  },
  {
    title: "Handover & support",
    lead: "You get included support after go-live.",
    points: [
      "Help by phone, remote session or on-site visit.",
      "One-off fixes, or a yearly contract (AMC).",
      "An AMC only if you want one.",
    ],
  },
] as const;

/** The three beats around the hero animation. */
const HERO_BEATS = [
  {
    tag: "Your data today",
    title: "Setup & data migration",
    lead: "We install TallyPrime, set up your company, and move your data over.",
    points: [
      "From Tally.ERP 9, an older version or spreadsheets.",
      "Company, ledgers and GST details set up for you.",
      "Opening balances checked with you.",
    ],
    link: { href: "/tally-services", label: "About setup & migration" },
  },
  {
    tag: "Filing",
    title: "GST, e-invoice & e-way bill",
    lead: "Set up correctly in TallyPrime so filing doesn't become a monthly scramble.",
    points: [
      "GST details set up in your company from day one.",
      "Invoice formats, reports and vouchers changed to match how you work.",
      "Tally connected to the other software you run.",
    ],
    link: { href: "/tally-gst", label: "About GST setup" },
  },
  {
    tag: "After go-live",
    title: "Training, then support when you need it",
    lead: "Your team learns on your own data, and help is a call away.",
    points: [
      "Hands-on sessions for your accounts team.",
      "Help by phone, remote session or on-site visit.",
      "One-off fixes or a yearly contract (AMC), only if you want one.",
    ],
    link: null,
  },
] as const;

const VALUES = [
  { title: "Trust", short: "Trust", body: "Hard-earned, never assumed. Confidentiality and reliability come first.", quote: "Nothing starts until you agree. You get a written scope and a quote in writing first.", src: "From how we work, step 02" },
  { title: "Honesty & Integrity", short: "Honesty and Integrity", body: "Straight talk on scope, timelines, and pricing — even when it costs us a deal.", quote: "On the first call, we'll tell you honestly whether TallyPrime fits.", src: "From how we work, step 01" },
  { title: "Transparency", short: "Transparency", body: "Clear quotes, open communication, no hidden fees, no last-minute surprises.", quote: "Licence prices are set by Tally Solutions. Our fees for setup, training and support are quoted separately, in writing.", src: "From our pricing" },
  { title: "Ethical Framework", short: "Ethical Framework", body: "Decisions guided by what is right for the customer's business, not the quickest sale.", quote: "You get included support after go-live, then an AMC only if you want one.", src: "From how we work, step 06" },
  { title: "Customer Satisfaction", short: "Customer Satisfaction", body: "Measured per project. We do not consider work done until the customer says it is.", quote: "We bring over your existing data and check the opening balances with you.", src: "From how we work, step 04" },
  { title: "Quality", short: "Quality", body: "Code review, testing, documentation — the boring fundamentals that prevent fire-fights.", quote: "Training is hands-on, for your accounts team, on your own data.", src: "From our services" },
] as const;

/** First-screen shortcuts: the four things most visitors come for. */
const INTENTS = [
  { href: "#pricing", title: "Buy TallyPrime", line: <>from <b className="from">₹22,500</b> + GST</> },
  { href: "/tally-services", title: "Setup & migration", line: <>from Tally.ERP 9 or Excel</> },
  { href: "/tally-gst", title: "GST & e-invoice", line: <>set up properly, once</> },
  { href: "/tally-services/amc-annual-support", title: "Support & AMC", line: <>phone, remote or on-site</> },
] as const;

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Verification links for the facts strip. */
const MCA_URL = "https://www.mca.gov.in/content/mca/global/en/mca/master-data/MDS.html";
const GST_URL = "https://services.gst.gov.in/services/searchtp";

export function ScrollHome() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { open } = useModal();
  const call = () => open("talk");
  const uid = React.useId();
  const id = (s: string) => `${uid}-${s}`;

  // Re-run the engine when the phone is rotated into or out of the short
  // landscape layout, so it switches between the scroll story and the still grid.
  const [layoutKey, setLayoutKey] = React.useState(0);
  React.useEffect(() => {
    const mq = matchMedia(SHORT_LANDSCAPE);
    const onChange = () => setLayoutKey((k) => k + 1);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  React.useEffect(() => {
    if (!rootRef.current) return;
    return initScrollHome(rootRef.current);
  }, [layoutKey]);

  return (
    <div className="fq3d" ref={rootRef}>
      {/* ============ STORY 1: from loose invoices to a balanced ledger ============ */}
      <section className="story hero" data-frames="ledger" data-start=".1" data-end=".92" aria-label="Introduction">
        <div className="pin">
          <div className="vid">
            <canvas aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element -- fallback still for reduced motion, sized by CSS */}
            <img src={STILLS.ledger} alt="" hidden />
          </div>
          <div className="beat hero-top" data-beat="0" data-side="hero" data-anchor="">
            <h1 className="mega">Tally, set up right <span className="hl-grad">the first time.</span></h1>
          </div>
          <div className="beat hero-meta" data-beat="0" data-side="hero" data-anchor="">
            <p className="lead">TallyPrime licences, setup and support from one Mumbai team you can call.</p>
            <div className="actions">
              <button type="button" className="fq-btn" onClick={call}>Book a 20-minute call</button>
              {site.confirmed.phone ? (
                <a className="tlink" href={site.whatsapp.url} target="_blank" rel="noopener noreferrer">
                  WhatsApp us<span className="sr"> (opens WhatsApp)</span>
                </a>
              ) : (
                <a className="tlink" href="#pricing">See TallyPrime prices</a>
              )}
            </div>
            {site.facts.callIsFree ? <p className="small">Free · No obligation</p> : null}
            <nav className="intents" aria-label="What do you need?">
              {INTENTS.map((it) =>
                it.href.startsWith("#") ? (
                  <a key={it.title} className="intent" href={it.href}><strong>{it.title}</strong><span>{it.line}</span></a>
                ) : (
                  <Link key={it.title} className="intent" href={it.href}><strong>{it.title}</strong><span>{it.line}</span></Link>
                ),
              )}
            </nav>
            <FactsStrip />
          </div>

          {HERO_BEATS.map((bt, i) => (
            <div key={bt.title} className={`beat info ${i % 2 ? "l" : "r"}`} data-beat={i + 1} data-side={i % 2 ? "left" : "right"}>
              <h3><span className="num">{pad2(i + 1)}</span>{bt.title}</h3>
              <p className="lead">{bt.lead}</p>
              <ul>{bt.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <div className="actions">
                {bt.link ? (
                  <Link className="tlink" href={bt.link.href}>{bt.link.label}</Link>
                ) : (
                  <button type="button" className="fq-btn" onClick={call}>Book a 20-minute call</button>
                )}
              </div>
            </div>
          ))}

          <div className="progress" aria-hidden="true"><span /><span /><span /><span /></div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="sec" id="what-we-do" aria-labelledby={id("sell")}>
        <div className="fq-wrap">
          <div className="sec-head">
            <h2 id={id("sell")}>Tally&apos;s software, and the work that makes it fit your business.</h2>
            <p className="lead">We sell Tally licences and look after everything around them: setup, training, changes and support.</p>
          </div>
          <div className="sell">
            {[
              ["Tally software", "Made by Tally Solutions", PRODUCTS],
              ["Our services", "Done by Finquanta", SERVICES],
            ].map(([title, by, rows]) => (
              <div className="panel" key={title as string}>
                <div className="col-head"><h3>{title as string}</h3><span>{by as string}</span></div>
                <ul className="rows">
                  {(rows as typeof PRODUCTS | typeof SERVICES).map(([href, name, line]) => (
                    <li key={name}>
                      <Link href={href}>
                        <strong>{name}</strong>
                        <p>{line}</p>
                        <span className="arr" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.25} /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORY 2: how we work, on the inventory rack ============ */}
      <section className="story" id="how" data-frames="stock" data-start=".08" data-end=".9" aria-labelledby={id("how")}>
        <div className="pin">
          <p className="bigword" aria-hidden="true">How we work</p>
          <div className="vid">
            <canvas aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element -- fallback still for reduced motion */}
            <img src={STILLS.stock} alt="" hidden />
          </div>
          <div className="beat split l" data-beat="0" data-side="split">
            <h2 id={id("how")}>From first call to handover, one team.</h2>
          </div>
          <div className="beat split r" data-beat="0" data-side="split">
            <p className="lead">Here&apos;s what happens at each step. You get a written quote before any work starts.</p>
          </div>
          {STEPS.map((st, i) => {
            const time = site.facts.stepTimes[i];
            const next = STEPS[i + 1];
            return (
              <div key={st.title} className={`beat info ${i % 2 ? "l" : "r"}`} data-beat={i + 1} data-side={i % 2 ? "left" : "right"}>
                <h3><span className="num">{pad2(i + 1)}</span>{st.title}</h3>
                {time ? <span className="time">{time}</span> : null}
                <p className="lead">{st.lead}</p>
                <ul>{st.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                {next ? (
                  <p className="next">Next: {next.title}</p>
                ) : (
                  <div className="actions"><button type="button" className="fq-btn" onClick={call}>Talk to Sandip</button></div>
                )}
              </div>
            );
          })}
          <div className="progress" aria-hidden="true">
            {Array.from({ length: STEPS.length + 1 }, (_, i) => <span key={i} />)}
          </div>
        </div>
      </section>

      {/* ============ PRICES ============ */}
      <section className="sec" id="pricing" aria-labelledby={id("price")}>
        <div className="fq-wrap">
          <div className="sec-head">
            <h2 id={id("price")}>TallyPrime prices</h2>
            <p className="lead">Licence prices are set by Tally Solutions. Our fees for setup, training and support are quoted separately, in writing.</p>
          </div>
          <div className="price-box">
            <div className="tscroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Edition</th>
                    <th scope="col" className="num">Buy · lifetime licence</th>
                    <th scope="col" className="num">Rent · monthly</th>
                    <th scope="col" className="num">Rent · 12 months</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Silver", "Single user", "₹22,500", "₹750", "₹8,100"],
                    ["Gold", "Multi-user", "₹67,500", "₹2,250", "₹24,300"],
                  ].map(([ed, kind, buy, month, year]) => (
                    <tr key={ed}>
                      <td className="ed">{ed}<small>{kind}</small></td>
                      <td className="num" data-label="Buy · lifetime licence"><span className="amt">{buy}</span></td>
                      <td className="num" data-label="Rent · monthly"><span className="amtw"><span className="amt">{month}</span> <span className="per">/ month</span></span></td>
                      <td className="num" data-label="Rent · 12 months"><span className="amt">{year}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="price-notes">
            <p className="gst">All prices + 18% GST.</p>
            <p>Source: Tally Solutions&apos; published prices.</p>
            <a className="buyrent" href="/tallyprime-buy-vs-rent">Buy or rent? Compare 6 years of cost</a>
          </div>
          <div className="fees">
            <p>Setup, migration and training: quoted after a free scoping call.</p>
            <div className="actions">
              <button type="button" className="fq-btn" onClick={call}>Get a quote</button>
              <a className="tlink" href="https://tallysolutions.com/buy-tally/" target="_blank" rel="noopener noreferrer">
                Check prices on Tally&apos;s site<ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" /><span className="sr"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      {hasTrustContent() || site.facts.partnerCategory || process.env.NODE_ENV === "development" ? (
        <section className="sec" id="proof" aria-label="Businesses that work with us">
          <div className="fq-wrap">
            <TrustSection />
          </div>
        </section>
      ) : null}

      <section className="sec" id="values" aria-labelledby={id("val")} style={{ paddingTop: 0 }}>
        <div className="fq-wrap">
          <div className="sec-head">
            <h2 id={id("val")}>Six commitments, and what each one costs us.</h2>
          </div>
          <div className="vals">
            {VALUES.map((v, i) => (
              <article key={v.title} className={`val v${i + 1}`}>
                <div className="val-in">
                  <div className="face front">
                    <span className="vnum" aria-hidden="true">{pad2(i + 1)}</span>
                    {i === 0 ? (
                      <div className="vbook">
                        {/* eslint-disable-next-line @next/next/no-img-element -- poster under the canvas */}
                        <img className="vstill" src={STILLS.ledgerClosed} alt="" />
                        <canvas aria-hidden="true" />
                        <span className="vpages" id={id("pages")} aria-hidden="true">
                          <span className="pg pl">
                            <span className="pk">Trust, in writing</span>
                            <span className="ph">Before any work starts</span>
                            <span className="pr-row ok"><i />Written scope</span>
                            <span className="pr-row ok"><i />Quote in writing</span>
                            <span className="pr-row wait"><i />Your go-ahead</span>
                            <span className="pt"><span>Total surprises</span><b>₹0</b></span>
                          </span>
                          <span className="pg prt">
                            <span className="pq">Nothing starts until you agree.</span>
                            <span className="pn">Confidentiality and reliability come first.</span>
                            <span className="ptick" aria-hidden="true" />
                          </span>
                        </span>
                        <button className="vbook-hit" type="button" aria-expanded="false" aria-controls={id("pages")} aria-label="Open the ledger to see what trust means here" />
                        <span className="vhint" aria-hidden="true">Open the ledger</span>
                      </div>
                    ) : null}
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                    <button className="flip-btn" type="button" aria-expanded="false" aria-controls={id(`vb${i}`)}>
                      See it in practice <span aria-hidden="true">↻</span>
                    </button>
                  </div>
                  <div className="face back" id={id(`vb${i}`)} aria-hidden="true" inert>
                    <span className="vlabel">{v.title} in practice</span>
                    <p className="vquote">{v.quote}</p>
                    <span className="vsrc">{v.src}</span>
                    <button className="flip-btn" type="button" aria-label={`Back to ${v.short}`}>
                      Back <span aria-hidden="true">↺</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="sec" aria-labelledby={id("news")} style={{ paddingTop: 0 }}>
        <div className="fq-wrap">
          <div className="news">
            <div>
              <h2 id={id("news")}>Subscribe for Tally updates &amp; release notes</h2>
              <p className="lead">
                Short emails, sent when there is something to send: a TallyPrime release, or a GST or e-way bill change that alters what you file. No spam, and one click unsubscribes.
              </p>
            </div>
            <div className="news-form">
              <NewsletterForm />
              <p className="small">
                We use your email only to send these updates. See our <Link href="/privacy-policy">Privacy policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSE: the page ends on what visitors came to do ============ */}
      <section className="sec close" aria-labelledby={id("close")}>
        <div className="fq-wrap">
          <div className="close-box">
            <h2 id={id("close")}>Tally, set up right the first time.</h2>
            <p className="lead">TallyPrime licences, setup and support from one Mumbai team you can call.</p>
            <div className="actions">
              <button type="button" className="fq-btn" onClick={call}>Book a 20-minute call</button>
              <a className="tlink" href="#pricing">See TallyPrime prices</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * One line of facts anyone can check, each linking to where it can be
 * verified. Renders nothing until at least one fact is confirmed in lib/site.ts.
 */
function FactsStrip() {
  const f = site.facts;
  const items: React.ReactNode[] = [];
  if (f.partnerCategory)
    items.push(
      f.partnerUrl ? (
        <a key="p" href={f.partnerUrl} target="_blank" rel="noopener noreferrer">Tally Partner: {f.partnerCategory}</a>
      ) : (
        <span key="p">Tally Partner: {f.partnerCategory}</span>
      ),
    );
  // CIN and GSTIN are long; on phones they live only in the footer's legal block.
  if (f.cin) items.push(<a key="c" className="f-id" href={MCA_URL} target="_blank" rel="noopener noreferrer">CIN {f.cin}</a>);
  if (f.gstin) items.push(<a key="g" className="f-id" href={GST_URL} target="_blank" rel="noopener noreferrer">GSTIN {f.gstin}</a>);
  if (f.incorporated) items.push(<span key="i">Incorporated {f.incorporated}</span>);
  if (f.supportHours) items.push(<span key="h">Support {f.supportHours}</span>);
  if (!items.length) return null;
  return <p className="facts">{items}</p>;
}
