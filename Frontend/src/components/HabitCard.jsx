import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
	VStack,
	Checkbox,
} from "@chakra-ui/react";
import { useHabitStore } from "../store/habit";
import { useState } from "react";

const HabitCard = ({ habit }) => {
	const [updatedHabit, setupdatedHabit] = useState(habit);

	const [isChecked, setIsChecked] = useState(false);

	const textColor = "grey";
	const bg = "#E4B1F0";

	const { deleteHabit, updateHabit} = useHabitStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteHabit = async (pid) => {
		const { success, message } = await deleteHabit(pid);
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
	};

	const handleUpdateHabit = async (pid, updatedHabit) => {
		const { success, message } = await updateHabit(pid, updatedHabit);
		onClose();
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
				description: "Habit updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
		boxShadow="0px 5px 20px rgba(0, 0, 0, 0.3)"
	
		rounded='lg'
		overflow='hidden'
		transition='all 0.3s'
		_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		bg={bg}
		>
		<Box p={4}>
			<HStack justifyContent="space-between" alignItems="center">
			<VStack align="start">
				<Heading as='h3' size='md' mb={1} color='black'>
				{habit.name}
				</Heading>

				<Text fontSize='xl' color={textColor} mb={5}>
				{habit.description}
				</Text>
			</VStack>

			<HStack spacing={4}>
			<Checkbox colorScheme='green' iconSize="2rem" bgColor='#FFE1FF' borderRadius={50} sx={{
				// Custom styles for increasing the size with numbers
				"& > span:first-of-type": {
				  width: "50px",  // Set the checkbox width
				  height: "50px", // Set the checkbox height
				  borderRadius: "45px", 
				  border:'none',
					transition: "border-color 0.2s,background 0.2s",
				},
				"&[data-checked] > span": {
					background: "#green", // Background color when checked
				},
				
			  }}/>
				
				<IconButton padding='25px 5px'  icon={<EditIcon fontSize={40}/>} onClick={onOpen} colorScheme='blue' />
				<IconButton
				padding='25px 5px' 
				icon={<DeleteIcon fontSize={40} />}
				onClick={() => handleDeleteHabit(habit._id)}
				colorScheme='red'
				/>
			</HStack>
			</HStack>
		</Box>

		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<ModalContent  bg={'#433878'}>
			<ModalHeader >Update Habit</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<VStack spacing={4}>
				<Input
					placeholder='Habit Name'
					name='name'
					value={updatedHabit.name}
					onChange={(e) => setupdatedHabit({ ...updatedHabit, name: e.target.value })}
				/>
				<Input
					placeholder='description'
					name='description'
					value={updatedHabit.description}
					onChange={(e) => setupdatedHabit({ ...updatedHabit, description: e.target.value })}
				/>
				</VStack>
			</ModalBody>

			<ModalFooter>
				<Button
				colorScheme='blue'
				mr={3}
				onClick={() => handleUpdateHabit(habit._id, updatedHabit)}
				>
				Update
				</Button>
				<Button variant='ghost' onClick={onClose} bg={'#FFE1FF'} color={"black"}> 
				Cancel
				</Button>
			</ModalFooter>
			</ModalContent>
		</Modal>
		</Box>

	);
};
export default HabitCard;