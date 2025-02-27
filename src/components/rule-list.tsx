"use client";

import { RuleCard } from "@/components/rule-card";
import { RuleCardSmall } from "@/components/rule-card-small";
import type { Section } from "@/data";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export function RuleList({
  sections,
  small,
}: {
  sections: Section[];
  small?: boolean;
}) {
  const [search] = useQueryState("q");

  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const filteredSections = sections
    .map((section) => ({
      ...section,
      rules: section.rules.filter(
        (rule) =>
          !search ||
          rule.title.toLowerCase().includes(search.toLowerCase()) ||
          rule.content.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) => section.rules.length > 0);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom && visibleItems < filteredSections.length) {
      setVisibleItems((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, filteredSections.length),
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {filteredSections.slice(0, visibleItems).map((section, idx) => (
        <section key={section.tag} id={section.tag}>
          <h3 className="text-lg font-regular mb-4">{section.tag}</h3>
          <div
            className={`grid grid-cols-1 gap-6 mb-8 ${
              small ? "lg:grid-cols-4" : "lg:grid-cols-2 xl:grid-cols-3"
            }`}
          >
            {section.rules.map((rule, idx2) =>
              small ? (
                <RuleCardSmall
                  key={`${idx}-${idx2.toString()}`}
                  rule={rule}
                  small
                />
              ) : (
                <RuleCard key={`${idx}-${idx2.toString()}`} rule={rule} />
              ),
            )}
          </div>
        </section>
      ))}

      {visibleItems < filteredSections.length && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() =>
              setVisibleItems((prev) =>
                Math.min(prev + ITEMS_PER_PAGE, filteredSections.length),
              )
            }
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Load more...
          </button>
        </div>
      )}
    </>
  );
}
