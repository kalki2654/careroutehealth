"use client";

import { motion } from "framer-motion";
import { comparisonRows } from "@/lib/constants";

function ComparisonCard({ row, index }: { row: typeof comparisonRows[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.52, delay: index * 0.06 }}
      className="rounded-xl border border-brand-border bg-white/62 p-3 shadow-soft"
    >
      <p className="mb-2 text-xs font-extrabold uppercase text-brand-coral">{row.factor}</p>
      <div className="grid gap-1.5">
        <div className="rounded-lg bg-white px-3 py-1.5">
          <span className="text-[0.65rem] font-bold uppercase text-brand-dark/50">India</span>
          <p className="text-sm font-bold text-brand-dark">{row.india}</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-brand-cream/60 px-3 py-1.5">
            <span className="text-[0.6rem] font-bold uppercase text-brand-dark/45">Most Countries</span>
            <p className="text-xs text-brand-dark/80">{row.most}</p>
          </div>
          <div className="rounded-lg bg-brand-cream/60 px-3 py-1.5">
            <span className="text-[0.6rem] font-bold uppercase text-brand-dark/45">UK / USA</span>
            <p className="text-xs text-brand-dark/80">{row.ukusa}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ComparisonTable() {
  return (
    <section className="site-grid bg-brand-cream py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
      <div>
        <div className="mb-6 max-w-4xl md:mb-12">
          <p className="mb-4 text-sm font-extrabold uppercase text-brand-coral">Why India</p>
          <h2 className="font-serif text-[2.05rem] font-semibold leading-[0.95] text-brand-dark text-balance md:text-[clamp(2.2rem,5vw,5.8rem)] md:leading-[0.9]">
            Why patients worldwide choose India for treatment.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-brand-dark/85 md:mt-7 md:text-lg md:leading-8">
            India has advanced hospitals, experienced specialists, and international patient departments at a fraction
            of the cost in many countries.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="grid gap-2 md:hidden">
          {comparisonRows.map((row, index) => (
            <ComparisonCard key={row.factor} row={row} index={index} />
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-xs font-extrabold uppercase text-brand-dark/55">
                <th className="border-y border-l border-brand-border rounded-l-xl bg-white/45 px-4 py-3 text-sm">Factor</th>
                <th className="border-y border-brand-border bg-white px-4 py-3 text-sm shadow-soft">India</th>
                <th className="border-y border-brand-border bg-white/45 px-4 py-3 text-sm">Most Countries</th>
                <th className="border-y border-r border-brand-border rounded-r-xl bg-white/45 px-4 py-3 text-sm">UK / USA</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <motion.tr
                  key={row.factor}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.52, delay: index * 0.055 }}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#F7F6F2]"}
                >
                  <td className="border-b border-gray-200 px-4 py-3 text-sm font-bold text-brand-dark">{row.factor}</td>
                  <td className="border-b border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-dark shadow-[12px_0_30px_rgba(16,48,46,0.04),-12px_0_30px_rgba(16,48,46,0.04)]">
                    {row.india}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 text-sm text-brand-dark/75">{row.most}</td>
                  <td className="border-b border-gray-200 px-4 py-3 text-sm text-brand-dark/75">{row.ukusa}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-2.5 md:mt-8 md:grid-cols-3 md:gap-4">
          {[
            "Over 700,000 international patients travel to India annually for treatment.",
            "Major cities including Mumbai, Delhi, Chennai, and Hyderabad have departments designed for international patients.",
            "English is widely spoken in medical settings at major hospitals across India."
          ].map((fact) => (
            <p key={fact} className="rounded-xl border border-brand-border bg-white/62 p-3.5 text-sm font-bold leading-6 text-brand-dark/85 md:p-6 md:leading-7">
              {fact}
            </p>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-brand-dark/65 md:mt-7 md:leading-7">
          These comparisons are general estimates based on reported patient experiences. Individual costs and outcomes
          vary by hospital, doctor, treatment type, and patient condition.
        </p>
      </div>
      </motion.div>
    </section>
  );
}
