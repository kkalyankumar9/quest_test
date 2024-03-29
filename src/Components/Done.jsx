import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { AddIcon, HamburgerIcon,DeleteIcon } from "@chakra-ui/icons";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";

const Done = () => {
  const [donetask, setdonetask] = useState("");
  const [comment, setComment] = useState("");
  const [doneData, setDoneData] = useState([]);
  const [commentCounts, setCommentCounts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchTodoData();
  }, []);

  const fetchTodoData = () => {
    axios
      .get("https://jsonserver-quest.onrender.com/done")
      .then((res) => {
        setDoneData(res.data);
     
        setCommentCounts(Array(res.data.length).fill(0));
      })
      .catch((error) => {
        console.log("Error fetching todo data:", error);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = {
      donetask: donetask,
      comment: comment,
    };

    axios
      .post("https://jsonserver-quest.onrender.com/done", data)
      .then((res) => {
        console.log(res);
        setdonetask("");
        setComment("");
        fetchTodoData();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://jsonserver-quest.onrender.com/done/${id}`)
      .then(() => {
        fetchTodoData();
        console.log("Task removed")
      })
      .catch((error) => {
        console.log("Error fetching todo data:", error);
      });
  };

  return (
    
    <Box w={"24.5%"} m={"1%"} >
      <Card bgColor={"#f2f3f8"} p={3}>
        <Flex spacing="4" p={"2%"}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="sm">Done</Heading>
            </Box>
          </Flex>
          <BsThreeDots />
        </Flex>
        <Box p={"1%"} justifyContent={"left"} alignItems={"left"}>
          {doneData.map((e, i) => (
            <Box
              m={"2%"}
              key={i}
              p={"3%"}
              bgColor={"white"}
              textAlign={"left"}
              borderRadius={"5px"}
              boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            >
              <Box
                bgColor={getRandomColor()}
                w={"40px"}
                h={"10px"}
                borderRadius={"5px"}
                p={"5px"}
              ></Box>
              <Heading size="sm" p={"5px"}>
                {e.donetask}
              </Heading>
              <Flex justifyContent={"space-between"} alignItems={"center"} gap={"15px"} p={"5px"}>
               <HStack>
                <HamburgerIcon color={"gray"} />
                {e.comment ? (
                  <Text
                    onClick={() => {
                      const newCommentCounts = [...commentCounts];
                      newCommentCounts[i]++;
                      setCommentCounts(newCommentCounts);
                    }}
                    color={"gray"}
                  >
                    <ChatIcon /> {commentCounts[i] + 1}
                  </Text>
                ) : (
                  ""
                )}
                </HStack>
                <Button color={"grey"} bgColor={"white"} onClick={() => handleDelete(e.id)}><DeleteIcon/></Button>

              </Flex>
            </Box>
          ))}
        </Box>

        <Button
          onClick={toggleForm}
          w="50%"
          bgColor="#f2f3f8"
          p={5}
          leftIcon={<AddIcon />}
          color={"gray"}
        >
          Add a Card
        </Button>
        {isFormOpen && (
          <Box mt={3} bgColor={"white"} p={5}>
            <form onSubmit={handleAdd}>
              <FormControl>
                <FormLabel>Done Task</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter task"
                  value={donetask}
                  onChange={(e) => setdonetask(e.target.value)}
                />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Comment</FormLabel>
                <Input
                  type="text"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
              <Button type="submit" mt={3} colorScheme="blue">
                Submit
              </Button>
            </form>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Done;
