import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapView from "../shared/MapView";

import { Search } from "@material-ui/icons";
import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const position_ = [
  {
    position_id: 1,
    location_id: 1,
    position_name: "Doi Inthaonon",
    lat_: 18.588,
    long_: 98.4871,
  },
];

const Family = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: allFamily } = useSelector((state) => state.family);
  const { result: allGenus } = useSelector((state) => state.genus);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    if (currentUser) {
      console.log(`id = ${currentUser.username}`);
    }
  }, []);

  const counterGenus = (id) => {
    if (allGenus) {
      const number = allGenus.filter((item) => item.fa_id === id).length;
      return number;
    }
  };

  return (
    <Box className={`page`}>
      <Container sx={{ maxWidth: "lg" }}>
        <Paper
          sx={{
            padding: "10",
          }}
        >
          <MapView listPosition={position_} />
        </Paper>
        <Divider className={classes.divider} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Family</TableCell>
                <TableCell>Author</TableCell>
                <TableCell align="right"># genera</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFamily &&
                allFamily
                  .filter((val) => counterGenus(val.fa_id) > 0)
                  .map((val) => (
                    <TableRow key={val.fa_id}>
                      <TableCell>{val.fa_name}</TableCell>
                      <TableCell>name author</TableCell>
                      <TableCell align="right">
                        {counterGenus(val.fa_id)}
                      </TableCell>
                      <TableCell align="right">
                        <Link href="#">genera</Link>&nbsp;|&nbsp;
                        <Link href="#">Search</Link>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Family;
