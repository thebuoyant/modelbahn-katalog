'use client';import * as React from 'react';import Box from '@mui/material/Box';import Divider from '@mui/material/Divider';import Typography from '@mui/material/Typography';import Button from '@mui/material/Button';import FormControl from '@mui/material/FormControl';import FormLabel from '@mui/material/FormLabel';import RadioGroup from '@mui/material/RadioGroup';import FormControlLabel from '@mui/material/FormControlLabel';import Radio from '@mui/material/Radio';import {useCatalogStore} from '@/store/useCatalogStore';import type {Category} from '@/types';
export default function Sidebar(){const scaleFilter=useCatalogStore(s=>s.scaleFilter);const setScaleFilter=useCatalogStore(s=>s.setScaleFilter);const categoryFilter=useCatalogStore(s=>s.categoryFilter);const setCategoryFilter=useCatalogStore(s=>s.setCategoryFilter);const aspect=useCatalogStore(s=>s.aspect);const setAspect=useCatalogStore(s=>s.setAspect);const reset=useCatalogStore(s=>s.reset);
const scales:(('Alle'|'H0'|'N'))[]=['Alle','H0','N'];const categories:(('Alle'|Category))[]=['Alle','Loks','Güterwagen','Personenwagen','Sonstiges'];
return(<Box className='sidebar' sx={{p:2,display:'flex',flexDirection:'column',gap:2}}>
<Typography variant='h6' sx={{px:.5}}>Filter</Typography>
<FormControl><FormLabel sx={{mb:1}}>Spurweite</FormLabel><RadioGroup name='scale' value={scaleFilter} onChange={(e)=>setScaleFilter(e.target.value as any)}>
{scales.map(s=> <FormControlLabel key={s} value={s} control={<Radio/>} label={s}/>)}
</RadioGroup></FormControl>
<Divider/>
<FormControl><FormLabel sx={{mb:1}}>Kategorien</FormLabel><RadioGroup name='cat' value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value as any)}>
{categories.map(c=> <FormControlLabel key={c} value={c} control={<Radio/>} label={c}/>)}
</RadioGroup></FormControl>
<Divider/>
<FormControl><FormLabel sx={{mb:1}}>Bildformat</FormLabel><RadioGroup row name='aspect' value={aspect} onChange={(e)=>setAspect(e.target.value as any)}>
<FormControlLabel value='4:3' control={<Radio/>} label='4:3'/>
<FormControlLabel value='16:9' control={<Radio/>} label='16:9'/>
</RadioGroup></FormControl>
<Divider/>
<Button variant='outlined' onClick={()=>reset()}>Filter zurücksetzen</Button>
</Box>);}