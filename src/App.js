import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

// components --------------------------------------------
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e84393;
`;
const GridBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Grid = styled.div`
  display: grid;
  grid-template: repeat(2, 200px) / repeat(2, 400px);
  gap: 10px;
`;
const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const FocusedGround = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BigBox = styled(motion.div)`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
`;
const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Btn = styled(motion.button)`
  margin-top: 50px;
  border-radius: 5px;
  border: none;
  width: 60px;
  height: 30px;
`;

// variants ----------------------------------------------
const boxVar = {
  normal: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};
const btnVar = {
  normal: { scale: 1, color: "rgba(0, 0, 0, 1)" },
  clicked: (btnClicked) => ({
    scale: btnClicked ? 1.2 : 1,
    color: btnClicked ? "rgba(214, 48, 49, 1)" : "rgba(0, 0, 0, 1)",
    transition: {
      duration: 0.2,
      type: "tween",
    },
  }),
};
const backgroundVar = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
};

// function ----------------------------------------------
function App() {
  const [btnClicked, setBtnClicked] = useState(false);
  const onBtnClick = () => setBtnClicked((prev) => !prev);
  const [boxClicked, setBoxClicked] = useState(false);
  const [boxId, setBoxId] = useState("");
  const onBoxClick = (box) => {
    setBoxId(box);
    setBoxClicked((prev) => !prev);
  };
  const onBackClicked = () => setBoxClicked((prev) => !prev);
  return (
    <Wrapper>
      <AnimatePresence>
        <GridBox key="GridBox">
          <Grid key="Grid">
            <Box
              style={{ originX: 1, originY: 1 }}
              onClick={() => onBoxClick("1")}
              variants={boxVar}
              initial="normal"
              whileHover="hover"
              layoutId="1"
              key="1"
            />
            <Box
              style={{ originX: 0, originY: 1 }}
              onClick={() => onBoxClick("2")}
              variants={boxVar}
              initial="normal"
              whileHover="hover"
              layoutId="2"
              key="2"
            >
              {btnClicked ? null : <Circle layoutId="circle" />}
            </Box>
            <Box
              style={{ originX: 1, originY: 0 }}
              onClick={() => onBoxClick("3")}
              variants={boxVar}
              initial="normal"
              whileHover="hover"
              layoutId="3"
              key="3"
            >
              {btnClicked ? <Circle layoutId="circle" /> : null}
            </Box>
            <Box
              style={{ originX: 0, originY: 0 }}
              onClick={() => onBoxClick("4")}
              variants={boxVar}
              initial="normal"
              whileHover="hover"
              layoutId="4"
              key="4"
            />
          </Grid>
          {boxClicked ? (
            <FocusedGround
              key="FocusedGround"
              variants={backgroundVar}
              exit="hidden"
              initial="hidden"
              animate="visible"
              onClick={onBackClicked}
            >
              <BigBox layoutId={boxId} key="5" />
            </FocusedGround>
          ) : null}
        </GridBox>
        <Btn
          key="Btn"
          custom={btnClicked}
          variants={btnVar}
          initial="normal"
          animate="clicked"
          onClick={onBtnClick}
        >
          Switch
        </Btn>
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
