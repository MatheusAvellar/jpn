import { useEffect, useRef, type Dispatch, type ReactNode, type SetStateAction } from "react";


interface DialogProps {
	children: ReactNode[];
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Dialog({ children, isOpen, setIsOpen }: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog)
			return;
		if (isOpen)
			dialog.showModal(); 
		else
			dialog.close();
	}, [isOpen]);

	// Hook onCancel event to manage open state via React
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog)
			return;
		const handleCancel: (this: HTMLDialogElement, ev: Event) => any = (event) => {
			event.preventDefault();
			setIsOpen(false);
		};

		dialog.addEventListener("cancel", handleCancel);
		return () => dialog.removeEventListener("cancel", handleCancel);
	}, []);

	return (
		<dialog ref={dialogRef}>
			{children}
		</dialog>
	);
};
