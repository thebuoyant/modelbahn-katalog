"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

import data from "@/../data/rollingStock.json";
import type { RollingStock } from "@/types";
import { useCatalogStore } from "@/store/useCatalogStore";

function matches(item: RollingStock, search: string) {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    (item.description ?? "").toLowerCase().includes(q) ||
    (item.brand ?? "").toLowerCase().includes(q) ||
    (item.roadNumber ?? "").toLowerCase().includes(q)
  );
}

export default function Gallery() {
  const scaleFilter = useCatalogStore((s) => s.scaleFilter);
  const categoryFilter = useCatalogStore((s) => s.categoryFilter);
  const aspect = useCatalogStore((s) => s.aspect);
  const search = useCatalogStore((s) => s.search);

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<RollingStock | null>(null);

  const items = (data as RollingStock[]).filter((item) => {
    const scaleOK = scaleFilter === "Alle" || item.scale === scaleFilter;
    const catOK = categoryFilter === "Alle" || item.category === categoryFilter;
    const searchOK = matches(item, search);
    return scaleOK && catOK && searchOK;
  });

  const handleOpen = (item: RollingStock) => {
    setActive(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <Box className="content">
      <Box className="gallery">
        {items.map((item) => {
          const src = aspect === "4:3" ? item.image43 : item.image169;
          return (
            <Card key={item.id} variant="outlined" sx={{ overflow: "hidden" }}>
              {/* Card-Bild: Klick öffnet Lightbox */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: aspect === "4:3" ? "4 / 3" : "16 / 9",
                  overflow: "hidden",
                  cursor: "zoom-in",
                }}
                role="button"
                aria-label={`Bild vergrößern: ${item.title}`}
                onClick={() => handleOpen(item)}
              >
                <Image
                  src={src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center 60%" }}
                />
              </Box>

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.description ?? "—"}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  <Chip label={item.scale} size="small" />
                  <Chip label={item.category} size="small" />
                  {item.brand && <Chip label={item.brand} size="small" />}
                  {item.year && <Chip label={item.year} size="small" />}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {items.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Keine Ergebnisse.
        </Typography>
      )}

      {/* Lightbox-Dialog ohne Scrollen */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        scroll="body" // falls überhaupt gescrollt werden müsste, scrollt der Body – nicht der Dialog
        PaperProps={{
          sx: {
            overflow: "hidden", // keine eigenen Scrollbars am Paper
            bgcolor: "#000", // schöner Schwarzhintergrund
          },
        }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          {active?.title ?? "Bild"}
          <IconButton
            aria-label="schließen"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 2,
            bgcolor: "#000",
            overflow: "hidden", // kein Scrolling in der Content-Fläche
          }}
        >
          {/* Viewport-fitting Container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // verfügbare Fläche innerhalb des Dialogs begrenzen
              maxWidth: "calc(100vw - 64px)",
              maxHeight: "calc(100vh - 200px)", // Titel + Paddings abziehen
              mx: "auto",
            }}
          >
            {/* Ratio-Box, die niemals die Maximalmaße sprengt */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                // Ratio bleibt erhalten...
                aspectRatio: aspect === "4:3" ? "4 / 3" : "16 / 9",
                // ...aber wird durch die Maximalhöhe/-breite gekappt:
                maxWidth: "calc(100vw - 64px)",
                maxHeight: "calc(100vh - 200px)",
              }}
            >
              {active && (
                <Image
                  src={aspect === "4:3" ? active.image43 : active.image169}
                  alt={active.title}
                  fill
                  // Im Dialog: "contain", damit das Bild komplett sichtbar ist (ohne Scroll)
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  priority
                />
              )}
            </Box>
          </Box>

          {/* Optional: Metadaten unter dem Bild (kein Overflow durch flex-wrap) */}
          {active && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2, flexWrap: "wrap", color: "#eee" }}
            >
              <Chip label={active.scale} size="small" color="default" />
              <Chip label={active.category} size="small" color="default" />
              {active.brand && (
                <Chip label={active.brand} size="small" color="default" />
              )}
              {active.year && (
                <Chip label={active.year} size="small" color="default" />
              )}
              {active.roadNumber && (
                <Chip label={active.roadNumber} size="small" color="default" />
              )}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
