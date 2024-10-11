import { Box, Button, Center, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
// import { IoMoon } from "react-icons/io5";
//  import { LuSun } from "react-icons/lu";

const Navbar = () => {

	return (
		<Container maxW="container.lg" px={4}  mt={4} >
			<Flex
			flexDirection="column"  // This aligns items vertically
			alignItems="center"     // This centers the items horizontally
			>
				<Flex
					h={"flex.xl"}
					maxW="flex.lg"
					
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDir={{
						base: "column",
						sm: "row",
					}}
					backgroundColor='purple.100'
					borderRadius={20}
					boxShadow="0px 5px 20px rgba(0, 0, 0, 0.2)"
					padding='25px 30px'
					
				>
					<HStack spacing={500}>
						<Text
							fontSize={{ base: "22", sm: "30" }}
							fontWeight={"bold"}
							textTransform={"uppercase"}
							textAlign={"center"}
							bgGradient={"linear(to-r, #433878,#7E60BF)"}
							bgClip={"text"}

							
						>
							<Link to={"/"}>Habit Tracker</Link>
						</Text>

						<HStack spacing={2} alignItems={"center"} 
									>
							<Link to={"/create"}>
								<Button>
									<PlusSquareIcon fontSize={40} bgGradient={"linear(to-r, #7E60BF, #433878)"}
									
								/>
								</Button>
							</Link>

						</HStack>
					</HStack>
				</Flex>
			</Flex>
		</Container>
	);
};
export default Navbar;
