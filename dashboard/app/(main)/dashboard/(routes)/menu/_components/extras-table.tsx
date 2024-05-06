'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUpdateExtraStock } from '@/server/extra/mutations';
import { Extra, ExtraGroup } from '@/types/product';
import { useState } from 'react';

interface ExtrasTableProps {
	extraGroups: ExtraGroup[];
}

const ExtrasTable = ({ extraGroups }: ExtrasTableProps) => {
	console.log('🚀 ~ ExtrasTable ~ extraGroups:', extraGroups);
	const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
		undefined
	);
	const updateExtraStock = useUpdateExtraStock();
	const handleUpdateExtraStock = (newStatus: string, extra: Extra) => {
		updateExtraStock.mutate({ ...extra, status: newStatus });
	};
	return (
		<div className='flex border rounded-lg h-screen'>
			{/* First column for extra groups */}
			<div className='w-1/3 border-r'>
				<h2 className='text-lg font-bold p-4'>Extra Groups</h2>
				<ul>
					{extraGroups?.map((group: ExtraGroup) => (
						<li
							key={group.id}
							className={`p-4 cursor-pointer border-b flex items-center justify-between ${
								selectedGroup === group.id ? 'bg-gray-200' : ''
							}`}
							onClick={() => setSelectedGroup(group.id)}
						>
							<span
								className={`text-md ${
									selectedGroup === group.id && 'font-bold'
								}`}
							>
								{group.name}
							</span>
							<span className='text-sm text-muted-foreground'>
								{group.extras.length}
							</span>
						</li>
					))}
				</ul>
			</div>
			{/* Second column for extras details */}
			<div className='w-2/3'>
				<h2 className='text-lg font-bold p-4'>Extras Details</h2>
				{selectedGroup !== null && (
					<ul>
						{extraGroups
							?.find((group) => group.id === selectedGroup)
							?.extras.map((extra, index) => (
								<li
									key={index}
									className='p-4 cursor-pointer border-b flex items-center justify-between'
								>
									<div>
										<p>{extra.name}</p>
										<p>{extra.price} $</p>
									</div>
									<Select
										onValueChange={(newStatus) =>
											handleUpdateExtraStock(
												newStatus,
												extra
											)
										}
										value={extra.status}
									>
										<SelectTrigger className='w-[200px]'>
											<SelectValue placeholder='In stock' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='in-stock'>
												In Stock
											</SelectItem>
											<SelectItem value='out-of-stock'>
												Out of stock
											</SelectItem>
										</SelectContent>
									</Select>
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ExtrasTable;
