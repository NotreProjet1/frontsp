import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Créez un tableau d'exemples de données
const rows = [
  { id: 1, name: 'Formation A', participant: 'Participant 1', prenom: 'John', email: 'john@example.com', certificates: 4 },
  { id: 2, name: 'Formation B', participant: 'Participant 2', prenom: 'Jane', email: 'jane@example.com', certificates: 5 },
  // Ajoutez d'autres lignes avec des données fictives
];

function MyCustomToolbar(props) {
  return (
    <React.Fragment>
      <GridToolbar {...props} />
    </React.Fragment>
  );
}

export default function CertificatesTable() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Formation', width: 130 },
    { field: 'participant', headerName: 'Participant', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'certificates',
      headerName: 'Certificats',
      width: 150,
      renderCell: (params) => (
        <Rating
          name={`certificates-${params.row.id}`}
          value={params.value}
          precision={0.5}
          readOnly
        />
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}  // Utilisez le tableau d'exemples de données
          columns={columns}
          components={{
            Toolbar: MyCustomToolbar,
          }}
        />
      </Grid>
    </Grid>
  );
}
