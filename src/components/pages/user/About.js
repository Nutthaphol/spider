import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import themplates from "../shared/theme";
import { Container, Paper, Typography } from "@mui/material";

const theme = createTheme(themplates);

const About = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: "700", color: "primary.dark" }}
            >
              About
            </Typography>
            {/* Detail */}
            <Paper elevation={1} sx={{ p: 4, mt: 5 }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 600 }}
              >
                ยินดีต้อนรับสู่เว็บไซต์แมงมุมในประเทศไทย Spiders in Thailand
              </Typography>

              {/* English paraghrap */}
              <Typography variant="body1" sx={{ mt: 3 }}>
                The website of Spiders in Thailand compiles all taxonomically
                and ecologically published works of spiders in Thailand. The
                compilation of reviewed data is demonstrated species lists and
                species biogeography recognized in Thailand. A picture of each
                species is demonstrated in terms of reproductive organs and
                external morphological appearances for facilitating
                identification of spiders inhabiting in Thailand. As the
                structure of reproductive organs is a key characteristic for
                identifying species, at least one picture of the reproductive
                structure for each spider is shown. Apart from that, a picture
                of external morphological appearance is included to support as
                long as being accessible.
              </Typography>
              {/* Thai paraghrap */}
              <Typography variant="body1" sx={{ mt: 3 }}>
                เว็บไซต์นี้ได้รวบรวมข้อมูลแมงมุมในประเทศไทยจากการรีวิวเอกสารเชิงวิชาการและนำมาแสดงในรูปแบบรายชื่อและการกระจายเชิงภูมิศาสตร์{" "}
                มีภาพประกอบของแมงมุมแต่ละชนิดในรูปแบบภาพวาดและ/หรือภาพถ่ายของโครงสร้างอวัยวะสืบพันธุ์และลักษณะสัณฐานภายนอก
                เพื่ออำนวยความสะดวกให้กับผู้ที่ต้องการจำแนกและระบุชนิดแมงมุมไทยได้เข้ามาเปรียบเทียบภาพได้สะดวก
                เนื่องจากลักษณะโครงสร้างของอวัยวะสืบพันธุ์เป็นลักษณะสำคัญที่ใช้ในการจำแนกและระบุชนิด
                แมงมุมแต่ละชนิดในเว็บไซต์นี้จึงมีภาพประกอบชนิดเป็นภาพโครงสร้างอวัยวะสืบพันธุ์เป็นอย่างน้อยหนึ่งภาพ
                นอกจากนี้อาจมีภาพประกอบลักษณะสัณฐานภายนอก
              </Typography>
            </Paper>
            {/* Creater */}
            <Paper elevation={1} sx={{ p: 4, mt: 5 }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 600 }}
              >
                คณะผู้จัดทำ
              </Typography>

              <Typography variant="body1" sx={{ mt: 3 }}>
                <b>Booppa Petcharad (บุปผา เพชรรัตน์)</b>, Thammasat University{" "}
                <br />
                <b>Thanakorn Ainto (ฐนกร อินทร์โต)</b>, Thammasat University{" "}
                <br />
                <b>SasipornTongman (ศศิพร ทองแม้น)</b>, Thammasat University{" "}
                <br />
                <b>Khanittha Kumnung (ขนิษฐา คำนึง)</b>, Thammasat University{" "}
                <br />
                <b>Venus Saksongmuang (วีนัส ศักดิ์สองเมือง)</b>, Prince of
                Songkla University <br />
                <b>Nutthaphol Dechpramualphol (ณัฐพล เดชประมวลพล)</b>, Prince of
                Songkla University <br />
                <b>Niwan Wattanakitrungroj (นิวรรณ วัฒนกิจรุ่งโรจน์)</b>, Prince
                of Songkla University
                <br />
              </Typography>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default About;
