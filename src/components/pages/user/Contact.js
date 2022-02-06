import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import themplates from "../shared/theme";
import { Container, Link, Paper, Typography } from "@mui/material";

const theme = createTheme(themplates);

const Contact = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: "700", color: "primary.dark" }}
            >
              Contact
            </Typography>
            {/* Detail */}
            <Paper elevation={1} sx={{ p: 4, mt: 5 }}>
              <Typography variant="body1" sx={{}}>
                สำหรับผู้ใช้ที่ใช้แล้วพบข้อผิดพลาดเกี่ยวกับเนื้อหา
                หรือผู้ใช้ที่มีข้อแนะนำในเชิงสร้างสรรค์เพื่อการพัฒนาเว็บไซต์
                หรือผู้ใช้ที่มีข้อคิดเห็นแล้วต้องการติดต่อสื่อสารกับทางทีมคณะผู้จัดทำ
                สามารถติดต่อมาได้ที่{" "}
                <Link sx={{ color: "info.main", cursor: "pointer" }}>
                  argiope2@tu.ac.th
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 3 }}>
                ทางคณะผู้จัดทำยินดีรับมาพิจารณา
                เราเชื่อว่าทุกการสื่อสารจะเป็นประโยชน์ต่อการพัฒนาเว็บไซต์
                จึงขอขอบคุณทุกท่านที่สื่อสารมายังเรา
              </Typography>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Contact;
