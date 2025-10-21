
'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TrainIcon from '@mui/icons-material/Train';
import InventoryIcon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useCatalogStore } from '@/store/useCatalogStore';
import type { Category } from '@/types';

const categoryIcons: Record<Category, React.ReactNode> = {
  'Loks': <TrainIcon />,
  'Güterwagen': <InventoryIcon />,
  'Personenwagen': <PeopleIcon />,
  'Sonstiges': <CategoryIcon />
};

export default function Sidebar() {
  const scaleFilter = useCatalogStore((s) => s.scaleFilter);
  const setScaleFilter = useCatalogStore((s) => s.setScaleFilter);
  const categoryFilter = useCatalogStore((s) => s.categoryFilter);
  const setCategoryFilter = useCatalogStore((s) => s.setCategoryFilter);
  const reset = useCatalogStore((s) => s.reset);

  const scales: Array<'Alle'|'H0'|'N'> = ['Alle','H0','N'];
  const categories: Array<'Alle'|Category> = ['Alle','Loks','Güterwagen','Personenwagen','Sonstiges'];

  return (
    <Box className="sidebar" sx={{ p: 1 }}>
      <List
        subheader={<ListSubheader component="div">Spurweite</ListSubheader>}
      >
        {scales.map((s) => (
          <ListItemButton key={s} selected={scaleFilter === s} onClick={() => setScaleFilter(s)}>
            <ListItemIcon><RadioButtonCheckedIcon /></ListItemIcon>
            <ListItemText primary={s} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List
        subheader={<ListSubheader component="div">Kategorien</ListSubheader>}
      >
        {categories.map((c) => (
          <ListItemButton key={c} selected={categoryFilter === c} onClick={() => setCategoryFilter(c as any)}>
            <ListItemIcon>{c === 'Alle' ? <AllInboxIcon/> : categoryIcons[c as Category]}</ListItemIcon>
            <ListItemText primary={c} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={() => reset()}>
          <ListItemText primary="Filter zurücksetzen" />
        </ListItemButton>
      </List>
    </Box>
  );
}
