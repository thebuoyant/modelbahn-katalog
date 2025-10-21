
'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import data from '@/../data/rollingStock.json';
import type { RollingStock } from '@/types';
import { useCatalogStore } from '@/store/useCatalogStore';

function matches(item: RollingStock, search: string) {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    (item.description ?? '').toLowerCase().includes(q) ||
    (item.brand ?? '').toLowerCase().includes(q) ||
    (item.roadNumber ?? '').toLowerCase().includes(q)
  );
}

export default function Gallery() {
  const scaleFilter = useCatalogStore((s) => s.scaleFilter);
  const categoryFilter = useCatalogStore((s) => s.categoryFilter);
  const search = useCatalogStore((s) => s.search);

  const items = (data as RollingStock[]).filter((item) => {
    const scaleOK = scaleFilter === 'Alle' || item.scale === scaleFilter;
    const catOK = categoryFilter === 'Alle' || item.category === categoryFilter;
    const searchOK = matches(item, search);
    return scaleOK && catOK && searchOK;
  });

  return (
    <Box className="content">
      <Box className="gallery">
        {items.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardMedia
              component="img"
              height="160"
              image={item.image}
              alt={item.title}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.description ?? '—'}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={item.scale} size="small" />
                <Chip label={item.category} size="small" />
                {item.brand && <Chip label={item.brand} size="small" />}
                {item.year && <Chip label={item.year} size="small" />}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      {items.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>Keine Ergebnisse.</Typography>
      )}
    </Box>
  );
}
