import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/global/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/components/tables/employee-tables/data';
import { cn } from '@/lib/utils';
import { Plus, User2 } from 'lucide-react';
import Link from 'next/link';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { columns } from '@/components/tables/employee-tables/column';

const breadcrumbItems = [
	{ title: 'Dashboard', link: '/dashboard' },
	{ title: 'Employee', link: '/dashboard/employee' },
];

type paramsProps = {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
};

export default async function EmployeePage({ searchParams }: paramsProps) {
	const page = Number(searchParams.page) || 1;
	const pageLimit = Number(searchParams.limit) || 10;
	const country = searchParams.search || null;
	const offset = (page - 1) * pageLimit;

	const res = await fetch(
		`https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
			(country ? `&search=${country}` : '')
	);
	const employeeRes = await res.json();
	const totalUsers = employeeRes.total_users; //1000
	const pageCount = Math.ceil(totalUsers / pageLimit);
	const employee: Employee[] = employeeRes.users;
	return (
		<>
			<div className='flex-1 space-y-4  p-4 md:p-8 pt-6'>
				{/* <BreadCrumb items={breadcrumbItems} /> */}
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbItems.map((item, index) => (
							<>
								<BreadcrumbItem key={item.link}>
									<BreadcrumbLink href={item.link}>
										{item.title}
									</BreadcrumbLink>
								</BreadcrumbItem>
								{index !== breadcrumbItems.length - 1 && (
									<BreadcrumbSeparator />
								)}
							</>
						))}
					</BreadcrumbList>
				</Breadcrumb>

				<div className='flex items-start justify-between'>
					<Heading
						title={`Employee (${totalUsers})`}
						description='Manage employees (Server side table functionalities.)'
						icon={User2}
					/>

					<Link
						href={'/dashboard/employee/new'}
						className={cn(buttonVariants({ variant: 'default' }))}
					>
						<Plus className='mr-2 h-4 w-4' /> Add New
					</Link>
				</div>
				<Separator />

				<EmployeeTable
					searchKey='country'
					pageNo={page}
					columns={columns}
					totalUsers={totalUsers}
					data={employee}
					pageCount={pageCount}
				/>
			</div>
		</>
	);
}
