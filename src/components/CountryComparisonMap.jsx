import { useMemo } from "react";

const FSX = {
  bg:       "#0B1120",
  surface:  "#111B2E",
  border:   "rgba(255,255,255,0.06)",
  teal:     "#00BFA5",
  tealDim:  "#00897B",
  tealGlow: "rgba(0,191,165,0.25)",
  coral:    "#FF6B6B",
  amber:    "#FFB74D",
  white:    "#FFFFFF",
  text:     "#E2E8F0",
  muted:    "#94A3B8",
  dim:      "#64748B",
  faint:    "#334155",
};

const COUNTRY_ELECTRICITY_BENCHMARKS = [
  { name: "Kenya", sharePct: 0.1, flag: "\u{1F1F0}\u{1F1EA}" },
  { name: "Colombia", sharePct: 0.3, flag: "\u{1F1E8}\u{1F1F4}" },
  { name: "Chile", sharePct: 0.5, flag: "\u{1F1E8}\u{1F1F1}" },
  { name: "South Africa", sharePct: 0.7, flag: "\u{1F1FF}\u{1F1E6}" },
  { name: "Israel", sharePct: 1.0, flag: "\u{1F1EE}\u{1F1F1}" },
  { name: "Brazil", sharePct: 1.5, flag: "\u{1F1E7}\u{1F1F7}" },
  { name: "Australia", sharePct: 2.0, flag: "\u{1F1E6}\u{1F1FA}" },
  { name: "India", sharePct: 2.5, flag: "\u{1F1EE}\u{1F1F3}" },
  { name: "United Kingdom", sharePct: 3.0, flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "France", sharePct: 3.5, flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "Germany", sharePct: 4.0, flag: "\u{1F1E9}\u{1F1EA}" },
  { name: "Japan", sharePct: 5.0, flag: "\u{1F1EF}\u{1F1F5}" },
  { name: "South Korea", sharePct: 5.5, flag: "\u{1F1F0}\u{1F1F7}" },
  { name: "Canada", sharePct: 7.0, flag: "\u{1F1E8}\u{1F1E6}" },
  { name: "United States", sharePct: 13.0, flag: "\u{1F1FA}\u{1F1F8}" },
  { name: "China", sharePct: 24.0, flag: "\u{1F1E8}\u{1F1F3}" },
];

export default function CountryComparisonMap({ year, globalPct }) {
  const exceeded = useMemo(
    () => COUNTRY_ELECTRICITY_BENCHMARKS.filter((c) => globalPct > c.sharePct),
    [globalPct]
  );

  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid " + FSX.border,
        flex: "1 1 340px",
        maxWidth: 480,
        minWidth: 280,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: FSX.dim,
          marginBottom: 4,
          letterSpacing: 1,
          textTransform: "uppercase",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        Country Comparison
      </div>
      <div
        style={{
          fontSize: 11,
          color: FSX.text,
          marginBottom: 8,
          lineHeight: 1.5,
        }}
      >
        In{" "}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            color: year > 2026 ? FSX.amber : FSX.teal,
          }}
        >
          {year}
        </span>
        , global data centers consume{" "}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            color: FSX.teal,
          }}
        >
          {globalPct.toFixed(1)}%
        </span>{" "}
        of world electricity, exceeding the individual consumption of below countries
      </div>

      {/* Exceeded countries as compact badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          maxHeight: 90,
          overflowY: "auto",
        }}
      >
        {exceeded.length > 0 ? (
          exceeded.map((country) => (
            <div
              key={country.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "2px 7px",
                borderRadius: 4,
                background: "rgba(0,191,165,0.06)",
                border: "1px solid rgba(0,191,165,0.15)",
                fontSize: 10,
                color: FSX.text,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 11 }}>{country.flag}</span>
              <span>{country.name}</span>
            </div>
          ))
        ) : (
          <div style={{ fontSize: 10, color: FSX.faint, fontStyle: "italic" }}>
            No countries exceeded at this level
          </div>
        )}
      </div>
    </div>
  );
}
