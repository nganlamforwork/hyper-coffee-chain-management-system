import { create } from 'zustand';

const defaultValues = { id: '', newName: '', renameType: '' };

interface IRenameModal {
	isOpen: boolean;
	initialValues: typeof defaultValues;
	onOpen: (id: string, newName: string, renameType: string) => void;
	onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
	isOpen: false,
	onOpen: (id, newName, renameType) =>
		set((state) => ({
			...state,
			isOpen: true,
			initialValues: { id, newName, renameType },
		})),
	onClose: () =>
		set((state) => ({
			...state,
			isOpen: false,
			initialValues: defaultValues,
		})),
	initialValues: defaultValues,
}));
