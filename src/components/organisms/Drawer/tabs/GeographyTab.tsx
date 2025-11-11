import React, { useState, useMemo } from "react";

import { Label } from "../../../atoms/Label/Label";
import { Dropdown } from "../../../molecules/Dropdown/Dropdown";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../Table";
import { Switch } from "../../../atoms/Switch/Switch";

export type GeographyRow = {
  id: string;
  country: string;
  region: string;
  accessType: "Read" | "Write" | "Restricted";
  updatedAt: string;
};

export interface GeographyTabProps {
  initialData?: GeographyRow[];
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

const MOCK_GEO: GeographyRow[] = [
  { id: "na-1", country: "United States", region: "North America", accessType: "Read", updatedAt: "2025-10-01" },
  { id: "na-2", country: "Canada", region: "North America", accessType: "Write", updatedAt: "2025-10-02" },
  { id: "eu-1", country: "Portugal", region: "Western Europe", accessType: "Write", updatedAt: "2025-10-03" },
  { id: "eu-2", country: "Germany", region: "Central Europe", accessType: "Read", updatedAt: "2025-10-04" },
  { id: "eu-3", country: "France", region: "Western Europe", accessType: "Restricted", updatedAt: "2025-10-05" },
  { id: "eu-4", country: "United Kingdom", region: "Western Europe", accessType: "Write", updatedAt: "2025-10-06" },
  { id: "apac-1", country: "Japan", region: "East Asia", accessType: "Restricted", updatedAt: "2025-10-05" },
  { id: "apac-2", country: "Australia", region: "Oceania", accessType: "Read", updatedAt: "2025-10-07" },
  { id: "apac-3", country: "Singapore", region: "Southeast Asia", accessType: "Write", updatedAt: "2025-10-08" },
  { id: "sa-1", country: "Brazil", region: "South America", accessType: "Read", updatedAt: "2025-10-09" },
];

export const GeographyTab: React.FC<GeographyTabProps> = ({
  initialData,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
}) => {
  // Use MOCK_GEO if initialData is not provided or is empty
  const data = initialData && initialData.length > 0 ? initialData : MOCK_GEO;
  
  const [internalSelected, setInternalSelected] = useState<Record<string, boolean>>({});
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const isControlled = controlledSelectedRows !== undefined;
  const selectedRows = isControlled
    ? controlledSelectedRows.reduce((acc, id) => ({ ...acc, [id]: true }), {} as Record<string, boolean>)
    : internalSelected;

  const countries = useMemo(() => Array.from(new Set(data.map((r) => r.country))), [data]);
  const filteredRows = useMemo(
    () => data.filter((r) => countryFilter === "all" || r.country === countryFilter),
    [data, countryFilter]
  );

  const allOnPage = filteredRows.length > 0 && filteredRows.every((r) => selectedRows[r.id]);
  const someOnPage = filteredRows.some((r) => selectedRows[r.id]) && !allOnPage;

  const toggleRow = (id: string, checked: boolean) => {
    if (isControlled) {
      const current = controlledSelectedRows || [];
      const updated = checked
        ? [...current, id]
        : current.filter((rowId) => rowId !== id);
      onSelectionChange?.(updated);
    } else {
      setInternalSelected((prev) => ({ ...prev, [id]: checked }));
    }
  };

  const toggleAll = (checked: boolean) => {
    if (isControlled) {
      const current = controlledSelectedRows || [];
      const filteredIds = filteredRows.map((r) => r.id);
      const updated = checked
        ? [...new Set([...current, ...filteredIds])]
        : current.filter((id) => !filteredIds.includes(id));
      onSelectionChange?.(updated);
    } else {
      const next = { ...selectedRows };
      filteredRows.forEach((r) => {
        next[r.id] = checked;
      });
      setInternalSelected(next);
    }
  };

  const countryOptions = [
    { value: "all", label: "All" },
    ...countries.map((c) => ({ value: c, label: c })),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12, 12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-12, 12px)" }}>
        <Label htmlFor="country-filter" style={{ fontSize: "var(--fonts-semantic-md)" }}>
          Country
        </Label>
        <Dropdown
          id="country-filter"
          options={countryOptions}
          value={countryFilter}
          onChange={(v) => setCountryFilter(v)}
          size="md"
          ariaLabel="Filter by country"
        />
      </div>

      <div
        style={{
          borderRadius: "var(--radius-md)",
          border: "var(--border-width-thin, 1px) solid var(--semantic-border-subtle)",
          overflow: "hidden",
        }}
      >
        <Table ariaLabel="Geography access table" size="xs">
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "60px", textAlign: "center" }}>
                <Switch
                  checked={allOnPage && filteredRows.length > 0}
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                  ariaLabel="Select all rows"
                  size="sm"
                />
              </TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow
                key={row.id}
                isEven={index % 2 === 0}
                isSelected={Boolean(selectedRows[row.id])}
              >
                <TableCell style={{ width: "60px", textAlign: "center" }}>
                  <Switch
                    checked={Boolean(selectedRows[row.id])}
                    onCheckedChange={(v) => toggleRow(row.id, Boolean(v))}
                    ariaLabel={`Select ${row.country}`}
                    size="sm"
                  />
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.accessType}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

