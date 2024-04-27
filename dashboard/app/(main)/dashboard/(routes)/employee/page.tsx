'use client';

import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/global/heading';
import { Separator } from '@/components/ui/separator';
import { Plus, User2 } from 'lucide-react';
import { columns } from '@/components/tables/employee-tables/column';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogClose,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Loader } from '@/components/global/loader';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { MultiFileDropzone } from '@/components/global/multi-file-dropzone';
import { parseCSV } from '@/lib/utils';
import {
	createUserAccount,
	getAllAccounts,
} from '@/server/actions/users/queries';
import { toast } from 'sonner';
import { Employee } from '@/types/user';

export default function EmployeePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [employee, setEmployee] = useState<Employee[]>([]);
	const totalUsers = employee ? employee.length : 0;
	const fetchEmployeeData = async () => {
		try {
			setIsLoading(true);
			const data = await getAllAccounts();
			setEmployee(data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching employee data:', error);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchEmployeeData();
	}, []);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const handleCSVUpload = async (csvContent: string) => {
		const usersData = parseCSV(csvContent);

		setIsLoading(true);
		for (const userData of usersData) {
			try {
				createUserAccount(userData).then((data) => {
					if (data?.error) {
						toast.error(data?.error);
						setIsLoading(false);
						return;
					}
				});
				setIsLoading(false);
				toast.success('Create all accounts successfully');
			} catch (error) {
				console.error('Error creating accounts:', error);
				setIsLoading(false);
			}
		}
	};
	const createAccounts = async () => {
		if (!uploadedFile) {
			console.error('No file uploaded');
			return;
		}

		const reader = new FileReader();
		reader.onload = async function (event) {
			if (event.target) {
				const fileContent = event.target.result as string;
				await handleCSVUpload(fileContent);
			}
		};
		reader.readAsText(uploadedFile);
	};

	return (
		<Dialog>
			<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
				<div className='flex items-start justify-between'>
					<Heading
						title={`Employee (${totalUsers})`}
						description='Manage all employees account in your company.'
						icon={User2}
					/>
					<DialogTrigger asChild>
						<Button>
							<Plus className='mr-2 h-4 w-4' /> Add New
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[680px]'>
						<DialogHeader>
							<DialogTitle>Create new accounts</DialogTitle>
							<DialogDescription>
								Put your csv here to start creating new accounts
							</DialogDescription>
						</DialogHeader>
						<div className='grid w-full gap-3'>
							<Label htmlFor='idea'>Your CSV file</Label>
							<MultiFileDropzone
								multiple={false}
								dropzoneOptions={{
									maxFiles: 1,
									accept: {
										'text/csv': ['.csv'],
									},
								}}
								className='w-full p-6'
								onFilesAdded={(files) =>
									setUploadedFile(files[0])
								}
							/>
						</div>
						<DialogFooter className='sm:justify-end gap-3 md:gap-0'>
							<Button
								disabled={isLoading}
								onClick={createAccounts}
							>
								{isLoading && (
									<Loader className='h-4 w-4 mr-2' />
								)}
								Create
							</Button>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</div>
				<Separator />

				<EmployeeTable columns={columns} data={employee} />
			</div>
		</Dialog>
	);
}
