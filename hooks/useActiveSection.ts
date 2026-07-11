"use client";

import { useMemo, useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]) {
  const ids = useMemo(() => sectionIds, [sectionIds.join(",")]);
  const [activeSection, setActiveSection] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}
