import { Box, Button, Grid, Stack, ThemeProvider } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { StrictMode, useCallback, useEffect, useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import * as materialsResource from './resources/materials';

import './App.css';
import useAppTheme from './useAppTheme';
import MaterialsList from './MaterialsList';
import MaterialProperties from './MaterialProperties';

function App() {
  const theme = useAppTheme();
  const [materials, setMaterials] = useState(null);
  const [selected, setSelected] = useState(null);
  const getMaterials = useCallback(async () => {
    const m = await materialsResource.get();
    setMaterials(m);
    return m;
  }, [setMaterials]);

  const updateSelected = useCallback((key, value) => {
    setMaterials((oldM) => {
      const newM = oldM.map((item) => {
        if (item.id !== selected.id) return item;
        const newI = { ...item, [key]: value };
        setSelected(newI);
        return newI;
      });
      console.log(newM);
      return newM;
    });
    materialsResource.update(selected.id, { [key]: value });
  }, [selected]);

  const newMaterial = async () => {
    const newObj = await materialsResource.create({});
    setMaterials((oldM) => [
      ...oldM,
      newObj,
    ]);
    setSelected(newObj);
    const m = await getMaterials();
    setSelected(m.find(({ id }) => id === newObj.id));
  };

  const deleteSelected = async () => {
    setSelected(null);
    setMaterials((oldM) => oldM.filter(({ id }) => id !== selected.id));
    await materialsResource.remove(selected.id);
    return getMaterials();
  };

  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container direction="column" spacing="1rem" className="material-editor">
            <h1 className="material-title">Materials</h1>

            <Stack direction="row" spacing="1rem" className="material-editor__controls">
              <Button variant="contained" startIcon={<Add />} onClick={newMaterial}>Add</Button>
              <Button variant="contained" color="error" startIcon={<Delete />} disabled={!selected} onClick={deleteSelected}>Delete</Button>
            </Stack>

            <Grid container className="material-editor__content">
              <Grid item className="material-editor__list"
                xs={12} md={4}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`
                }}
              >
                <MaterialsList
                  materials={materials}
                  selectedId={selected?.id}
                  onClick={(e, material) => setSelected(material)}
                />
              </Grid>
              <Grid item xs={12} md={8} className="material-editor__properties">
                <MaterialProperties
                  selectedMaterial={selected}
                  disabled={!selected}
                  key={selected?.id}
                  onChange={(e, key, value) => updateSelected(key, value)
                    // TODO: This spawns a request per keystroke; a more formalized implementation would
                    //  journal things while the user is playing, and make the update
                    //  after a timeout completes.
                  }
                />
              </Grid>
            </Grid>

            <Box className="material-editor__cost">
              <div>Total Cost:</div>
              <div>${materials?.reduce((sum, {cost, volume}) => sum + cost * volume, 0).toFixed(2) ?? 0}</div>
            </Box>
          </Grid>
        </LocalizationProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
