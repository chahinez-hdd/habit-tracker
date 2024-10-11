import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useHabitStore } from "../store/habit";

const CreatePage = () => {
	const [newHabit, setNewHabit] = useState({
		name: "",
		description: "",
	});
	const toast = useToast();

	const { createHabit } = useHabitStore();

	const handleAddhabit = async () => {
		const { success, message } = await createHabit(newHabit);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
		setNewHabit({ name: "", description: ""});
	};

	return (
		<Container marginTop='100px' maxW={"container.sm"} >
			<VStack spacing={8} boxShadow="0px 5px 20px rgba(0, 0, 0, 0.2)" borderRadius={20}>

				<Box w={"full"} bg='#E4B1F0' p={6} rounded={"lg"} shadow={"md"}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} color='WHITE'>
					CREATE A NEW HABIT
				</Heading>
					<VStack spacing={4}>
						<Input
							placeholder='Habit name'
							name='name'
							value={newHabit.name}
							onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              bg="#FFE1FF"
              sx={{
                "&::placeholder": {
                  color: "black", // Change this to your desired color
                  opacity: 0.5, // Optional: Make sure the opacity is 1 for better visibility
                },
              }}
              color="black"
						/>
						<Input
							placeholder='Description'
							name='description'
							value={newHabit.description}
							onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
              bg="#FFE1FF"
              sx={{
                "&::placeholder": {
                  color: "black", // Change this to your desired color
                  opacity: 0.5, // Optional: Make sure the opacity is 1 for better visibility
                },
                
              }}
              color="black" // Custom color
						/>

						<Button colorScheme="purple" bg='purple.100' onClick={handleAddhabit} w='full' fontWeight="bold">
							Add habit
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
