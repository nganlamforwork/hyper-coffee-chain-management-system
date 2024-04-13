import { Spinner } from '@/components/global/spinner';

export default function Loading() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='relative'>
				<div className='h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200'></div>
				<div className='absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin'></div>
			</div>
			<div className='absolute bottom-10 left-10 text-xs text-gray-500 flex items-center'>
				<Spinner className='h-4 w-4 mr-2' />
				Loading HyperCoffee
			</div>
		</div>
	);
}
