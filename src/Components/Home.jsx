import React from "react";
import { Box } from "@chakra-ui/react";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Review from "./Review";
import Done from "./Done";

const Home = () => {
  return (
    <>
      <Box display={"flex"} bgColor={"#7b8bdb"} p={4}>
        <Todo />
        <InProgress />
        <Review />
        <Done />
      </Box>
    </>
  );
};

export default Home;
