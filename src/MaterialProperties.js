import { Lens } from "@mui/icons-material";
import { Grid, Paper, TextField } from "@mui/material";

export default 
function MaterialProperties({ selectedMaterial, disabled, onChange }) {
  const handleChange = (e, ...args) => {
    onChange(e, e.target.id, e.target.value);
    return true;
  };

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField disabled={disabled} id="name" label="Name" value={selectedMaterial?.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={disabled}
            id="color"
            label="Color"
            value={selectedMaterial?.color}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <Lens sx={{ color: selectedMaterial?.color ?? '#808080' }} fontSize="large" />
              )
            }}
          >
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField disabled={disabled} id="volume" type="number" label="Volume (m³)" value={selectedMaterial?.volume} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField disabled={disabled} id="cost" label="Cost (USD per m³)" value={selectedMaterial?.cost} inputProps={{ step: 0.1 }} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField disabled={disabled} id="deliveryDate" label="Delivery Date" type="date" value={selectedMaterial?.deliveryDate} onChange={handleChange} />
        </Grid>
      </Grid>
    </Paper>
  );
}
