// components/widgets/WidgetTable.tsx

"use client";

import React, { useState, useMemo } from "react";
import Table from "@/components/table";
import MultiSelect, { SelectOption } from "@/components/select/multi-select";
import { Column } from "@/lib/types/table.typers";

interface DataRow {
  year: number;
  gdrp?: number;
  population?: number;
  economicGrowth?: number;
  [key: string]: unknown;
}

interface WidgetTableProps {
  fullData: DataRow[];
  allPossibleColumns: Column<DataRow>[];
  multiSelectOptions: SelectOption[];
}

const WidgetTable = ({
  fullData,
  allPossibleColumns,
  multiSelectOptions,
}: WidgetTableProps) => {
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(() => [
    multiSelectOptions[0]?.value,
  ]);

  const tableColumns = useMemo(() => {
    const yearColumn = allPossibleColumns.find((col) => col.key === "year");
    const selectedColumns = allPossibleColumns.filter((col) =>
      selectedColumnKeys.includes(col.key as string),
    );

    if (yearColumn) {
      return [yearColumn, ...selectedColumns];
    }
    return selectedColumns;
  }, [selectedColumnKeys, allPossibleColumns]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Data
        </label>
        <MultiSelect
          options={multiSelectOptions}
          selectedValues={selectedColumnKeys}
          onChange={setSelectedColumnKeys}
          placeholder="Select Column"
        />
      </div>

      <Table<DataRow> columns={tableColumns} data={fullData} />
    </div>
  );
};

export default WidgetTable;
