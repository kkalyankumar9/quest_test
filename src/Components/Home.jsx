import React from "react";
import { Box } from "@chakra-ui/react";
import Todo from "./Todo";
const Home = () => {
  return (
    <div>
      <Box display={"flex"} bgColor={"#7b8bdb"}>
        <Todo />
      </Box>
    </div>
  );
};

export default Home;
