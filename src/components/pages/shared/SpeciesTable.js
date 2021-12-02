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

const SpeciesTable = ({ genus, species, detail, id, location }) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
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
                  <TableCell>Species</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail &&
                  detail
                    // .filter(
                    //   (item, index, self) =>
                    //     self
                    //       .map((e) => {
                    //         return e.species_id;
                    //       })
                    //       .indexOf(item.species_id) === index
                    // )
                    .filter((item) => item.genus_id === id)
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <i>{`${val.genus} ${val.species}`}</i>
                        </TableCell>
                        <TableCell align="left">{val.author}</TableCell>
                        <TableCell align="left">
                          <Link
                            href={`detail/${val.id}`}
                            sx={{
                              cursor: "pointer",
                            }}
                            underline="hover"
                          >
                            detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                {/* {species &&
                  species
                    .filter((item) => item.genus_id == id)
                    .map((val, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <i>
                            {genus && genus.find((item) => item.id == id).name}{" "}
                            {val.name}
                          </i>
                        </TableCell>
                        <TableCell align="center">
                          {detail &&
                            detail
                              // .slice(0, 1)
                              .find(
                                (item) =>
                                  item.species_id == val.id &&
                                  item.genus_id == id
                              ).author}
                        </TableCell>

                        <TableCell align="center">
                          <Link
                            href={`detail/${val.id}`}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            detail
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledEngineProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SpeciesTable;
