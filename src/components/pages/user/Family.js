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

import { getAllDetail } from "../../../actions/details";
import { getAllSpider } from "../../../actions/spider";
import { Search } from "@material-ui/icons";

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
  const { result: allDetail } = useSelector((state) => state.details);
  const { result: spiderList } = useSelector((state) => state.spider);

  useEffect(() => {
    dispatch(getAllDetail());
    dispatch(getAllSpider());
  }, []);

  const countGenera = (id_) => {
    let num = 0;
    for (let i = 0; i < allDetail.length; i++) {
      console.log(allDetail[i].spider_id);
      if (allDetail[i].spider_id == id_) {
        num++;
        console.log(`num = ${num}`);
      }
    }
    return num;
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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Family</TableCell>
                <TableCell>Author</TableCell>
                <TableCell align="right"># genera</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spiderList &&
                spiderList.map((val) => {
                  return (
                    allDetail &&
                    allDetail
                      .slice(0, 1)
                      .filter((id) => val.spider_id === id.spider_id)
                      .map((val2) => (
                        <TableRow key={val2.record_id}>
                          <TableCell>{val.family}</TableCell>
                          <TableCell>{val2.author}</TableCell>
                          <TableCell align="right">
                            {countGenera(val.spider_id)}
                          </TableCell>
                          <TableCell align="right">
                            <Link href="#">genera</Link>&nbsp;|&nbsp;
                            <Link href="#">Search</Link>
                          </TableCell>
                        </TableRow>
                      ))
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {console.log("family ", allDetail)}
      </Container>
    </Box>
  );
};

export default Family;
