"use client";

import { useState } from "react";

import { DataGrid, type DataGridColumn } from "@/components/zoblocks/data-grid";

import { CASELOAD, type CaseloadRow } from "./caseload";

import { isGridAbsent, type GridDerivation, type GridSort } from "@/lib/zoblocks-grid";

const DISENGAGEMENT: GridDerivation = {
  model: "disengagement",
  version: "v1.8",
  validatedOn: "9,140 outpatient episodes",
  population: "adults, English-language intake only",
};

const COVERAGE = {
  shown: CASELOAD.length,
  total: 312,
  noun: "clients on this team's caseload",
  predicate: "PHQ-9 of 10 or more, or a risk screen in the last 14 days.",
};

function phq9Band(value: number) {
  if (value >= 20) return "severe";
  if (value >= 15) return "mod-severe";
  if (value >= 10) return "moderate";
  if (value >= 5) return "mild";
  return "minimal";
}

function initials(name: string) {
  return name
    .split(",")[0]
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function riskColor(risk: number) {
  if (risk >= 0.75) return "var(--zb-status-critical)";
  if (risk >= 0.6) return "var(--zb-status-high)";
  return "var(--zb-accent)";
}

function riskScreenStyle(value: string) {
  if (value === "Ideation with plan") {
    return {
      color: "var(--zb-status-critical)",
      background: "var(--zb-status-critical-bg)",
      border: "1px solid var(--zb-status-critical-border)",
    };
  }

  if (value === "Ideation, no plan") {
    return {
      color: "var(--zb-swatch-1)",
      background: "var(--zb-swatch-1-bg)",
      border: "1px solid var(--zb-swatch-1-border)",
    };
  }

  if (value === "Passive ideation") {
    return {
      color: "var(--zb-swatch-2)",
      background: "var(--zb-swatch-2-bg)",
      border: "1px solid var(--zb-swatch-2-border)",
    };
  }

  return {
    color: "var(--zb-text-muted)",
    background: "var(--zb-bg-muted)",
    border: "1px solid var(--zb-border)",
  };
}

const COLUMNS: DataGridColumn<CaseloadRow>[] = [
  {
    key: "name",
    header: "Client",
    kind: "text",
    value: (row) => row.name,
    cell: (row) => (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.65rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-grid",
            placeItems: "center",
            inlineSize: "2.25rem",
            blockSize: "2.25rem",
            flex: "0 0 auto",
            borderRadius: "var(--zb-radius-full)",
            background: "var(--zb-accent-subtle)",
            border: "1px solid var(--zb-accent-border)",
            color: "var(--zb-accent)",
            fontFamily: "var(--zb-font-mono)",
            fontSize: "var(--zb-text-2xs)",
            fontWeight: 700,
          }}
        >
          {initials(row.name)}
        </span>

        <span
          style={{
            display: "grid",
            gap: "0.05rem",
            minInlineSize: 0,
          }}
        >
          <strong
            style={{
              color: "var(--zb-text)",
              fontWeight: 600,
            }}
          >
            {row.name}
          </strong>

          <span
            style={{
              color: "var(--zb-text-muted)",
              fontFamily: "var(--zb-font-mono)",
              fontSize: "var(--zb-text-2xs)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.mrn}
          </span>
        </span>
      </span>
    ),
  },
  {
    key: "phq9",
    header: "PHQ-9",
    kind: "measure",
    value: (row) => row.phq9,
    cell: (row) => {
      if (isGridAbsent(row.phq9)) {
        return <span>{row.phq9.absent}</span>;
      }

      if (typeof row.phq9 !== "number") {
        return null;
      }

      const change = row.previousPhq9 === undefined ? null : row.phq9 - row.previousPhq9;

      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "0.4rem",
            flexWrap: "wrap",
          }}
        >
          <strong
            style={{
              fontSize: "var(--zb-text-md)",
              fontWeight: 700,
              color: row.phq9 >= 20 ? "var(--zb-status-critical)" : "var(--zb-text)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.phq9}
          </strong>

          <span
            style={{
              color: "var(--zb-text-muted)",
              fontSize: "var(--zb-text-xs)",
            }}
          >
            {phq9Band(row.phq9)}
          </span>

          {change !== null && change !== 0 ? (
            <span
              aria-label={`${Math.abs(change)} point ${change > 0 ? "increase" : "decrease"}`}
              style={{
                color: change > 0 ? "var(--zb-status-critical)" : "var(--zb-text-muted)",
                fontFamily: "var(--zb-font-mono)",
                fontSize: "var(--zb-text-xs)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {change > 0 ? "▲" : "▼"} {Math.abs(change)}
            </span>
          ) : null}
        </span>
      );
    },
  },
  {
    key: "cssrs",
    header: "Risk screen",
    kind: "status",
    value: (row) => row.cssrs,
    cell: (row) => {
      if (isGridAbsent(row.cssrs)) {
        return <span>{row.cssrs.absent}</span>;
      }

      if (typeof row.cssrs !== "string") {
        return null;
      }

      const style = riskScreenStyle(row.cssrs);

      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            minBlockSize: "1.625rem",
            paddingInline: "0.55rem",
            borderRadius: "var(--zb-radius-sm)",
            ...style,
            fontSize: "var(--zb-text-xs)",
            fontWeight: 600,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {row.cssrs}
        </span>
      );
    },
  },
  {
    key: "risk",
    header: "Disengagement",
    kind: "number",
    value: (row) => row.risk,
    derived: DISENGAGEMENT,
    cell: (row) => (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.6rem",
          inlineSize: "100%",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            inlineSize: "3.5rem",
            blockSize: "0.3rem",
            overflow: "hidden",
            borderRadius: "var(--zb-radius-full)",
            background: "var(--zb-bg-muted)",
          }}
        >
          <span
            style={{
              display: "block",
              inlineSize: `${Math.round(row.risk * 100)}%`,
              blockSize: "100%",
              borderRadius: "inherit",
              background: riskColor(row.risk),
            }}
          />
        </span>

        <span
          style={{
            minInlineSize: "2.25rem",
            fontFamily: "var(--zb-font-mono)",
            fontVariantNumeric: "tabular-nums",
            textAlign: "end",
          }}
        >
          {row.risk.toFixed(2)}
        </span>
      </span>
    ),
  },
  {
    key: "due",
    header: "Next contact",
    kind: "instant",
    value: (row) => row.due,
    cell: (row) => {
      const urgent = row.due.startsWith("Today");

      return (
        <span
          style={{
            color: urgent ? "var(--zb-status-critical)" : "var(--zb-text)",
            fontWeight: urgent ? 700 : 500,
            whiteSpace: "nowrap",
          }}
        >
          {row.due}
        </span>
      );
    },
  },
];

export default function DataGridDemo() {
  const [sort, setSort] = useState<GridSort | null>(null);

  return (
    <main
      style={{
        minBlockSize: "100vh",
        paddingBlock: "3rem",
        paddingInline: "1.5rem",
        background: "var(--zb-bg-subtle)",
        fontFamily: "var(--zb-font-sans)",
      }}
    >
      <DataGrid
        caption="Clients on this team's caseload with a raised PHQ-9 or a recent risk screen"
        title="Caseload · PHQ-9 raised or risk screened"
        note="14-day window"
        columns={COLUMNS}
        rows={CASELOAD}
        rowKey={(row) => row.mrn}
        coverage={COVERAGE}
        density="comfortable"
        sort={sort}
        onSortChange={setSort}
      />
    </main>
  );
}
