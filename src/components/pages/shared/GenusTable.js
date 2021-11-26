import React, { useState, useEffect } from "react";

import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const theme = createTheme();

const GenusTable = ({ family, genus, detail, species, ToNext, id }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Typography variant="h5">
            Family: {family && family.find((item) => item.id == id).name}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "1px solid #B3B6B7",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Genus</TableCell>
                  <TableCell align="center">Author</TableCell>
                  <TableCell align="center"> # genera</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {genus &&
                  genus
                    .filter(
                      (item) =>
                        detail && detail.find((val) => val.genus_id == item.id)
                    )
                    .filter((item) =>
                      family.find((val) => val.id == item.family_id)
                    )
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>{val.name}</TableCell>
                        <TableCell align="center">
                          {detail &&
                            detail
                              // .slice(0, 1)
                              .find((item) => item.genus_id == val.id).author}
                        </TableCell>
                        <TableCell align="center">
                          {console.log("detail", detail, species)}
                          {
                            species.filter((item) => item.genus_id == val.id)
                              .length
                          }
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            species
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default GenusTable;
