import { Lens } from "@mui/icons-material";
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";

function MaterialsListItem({ material, divider, selected, onClick }) {
  return (
    <>
      {divider && <Divider />}
      <ListItemButton key={material.id} selected={selected} onClick={onClick}>
        <ListItemIcon>
          <Lens sx={{ color: material.color ?? '#808080' }} fontSize="large" />
        </ListItemIcon>
        <ListItemText 
          primary={material.name ?? "No name"}
          secondary={`${material.volume ?? 0} m³`}
        />
      </ListItemButton>
    </>
  );
}


export default function MaterialsList({ materials, onClick, selectedId }) {
  return (
    <Paper>
      <List>
        {materials?.map((material, index) => (
          <MaterialsListItem
            key={material.id}
            material={material}
            divider={index !== 0}
            onClick={(e) => onClick(e, material)}
            selected={material.id === selectedId}
          />
        ))}
      </List>
    </Paper>
  );
}