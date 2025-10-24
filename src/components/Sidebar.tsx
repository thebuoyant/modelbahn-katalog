"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useCatalogStore } from "@/store/useCatalogStore";
import type { Category } from "@/types";

type CategoryFilter = Category | "Alle";

// Type Guard verhindert any/unsichere Casts
const isCategoryFilter = (v: string): v is CategoryFilter =>
  v === "Alle" ||
  v === "Loks" ||
  v === "Güterwagen" ||
  v === "Personenwagen" ||
  v === "Sonstiges";

export default function Sidebar() {
  const categoryFilter = useCatalogStore((s) => s.categoryFilter);
  const setCategoryFilter = useCatalogStore((s) => s.setCategoryFilter);
  const reset = useCatalogStore((s) => s.reset);

  const categories: CategoryFilter[] = [
    "Alle",
    "Loks",
    "Güterwagen",
    "Personenwagen",
    "Sonstiges",
  ];

  return (
    <Box
      className="sidebar"
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Filter</Typography>
      <Divider />

      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Kategorien</FormLabel>
        <RadioGroup
          name="cat"
          value={categoryFilter}
          onChange={(_, value) => {
            if (isCategoryFilter(value)) setCategoryFilter(value);
          }}
        >
          {categories.map((c) => (
            <FormControlLabel key={c} value={c} control={<Radio />} label={c} />
          ))}
        </RadioGroup>
      </FormControl>

      <Divider />

      <Button variant="outlined" onClick={() => reset()}>
        Filter zurücksetzen
      </Button>
    </Box>
  );
}
