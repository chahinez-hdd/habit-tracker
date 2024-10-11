import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHabitStore } from "../store/habit";
import HabitCard from "../components/HabitCard";

const HomePage = () => {
	const { fetchHabits, habits } = useHabitStore();

	useEffect(() => {
		fetchHabits();
	}, [fetchHabits]);
	console.log("habits", habits);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, #7E60BF,#433878)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Habits 🚀
				</Text>

				<SimpleGrid
          columns={{
            base: 1,  // Single column for all screen sizes
          }}
          spacing={10}
          w={"full"}
          alignItems="center"
        >
          {habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </SimpleGrid>


				{habits.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No habits found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a habit
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;