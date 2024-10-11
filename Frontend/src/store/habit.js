import { create } from "zustand";

export const useHabitStore = create((set) => ({
	habits: [],
	setHabits: (habits) => set({ habits }),
	createHabit: async (newHabit) => {
		if (!newHabit.name || !newHabit.description ) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/habits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newHabit),
		});
		const data = await res.json();
		set((state) => ({ habits: [...state.habits, data.data] }));
		return { success: true, message: "Habit created successfully" };
	},
	fetchHabits: async () => {
		const res = await fetch("/api/habits");
		const data = await res.json();
		set({ habits: data.data });
	},
	deleteHabit: async (pid) => {
		const res = await fetch(`/api/habits/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ habits: state.habits.filter((habit) => habit._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateHabit: async (pid, updatedHabit) => {
		const res = await fetch(`/api/habits/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedHabit),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			habits: state.habits.map((habit) => (habit._id === pid ? data.data : habit)),
		}));

		return { success: true, message: data.message };
	},
}));