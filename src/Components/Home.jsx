import React from "react";
import { Box } from "@chakra-ui/react";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Review from "./Review";
import Done from "./Done";

const Home = () => {
  return (
    <>
      <Box
        display={{ base: "block", md: "flex" }}
        bgColor={"#7b8bdb"}
        p={4}
        justifyContent="space-around"
   
      >
        <Todo />
        <InProgress />
        <Review />
        <Done />
      </Box>
    </>
  );
};

export default Home;
