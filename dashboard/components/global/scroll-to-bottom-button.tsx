import { useScrollBottom } from '@/hooks/use-scroll-bottom';

export const ScrollToBottomButton = () => {
	const goToBottom = useScrollBottom();
	const scrollToBottom = () => {
		console.log(window.scrollY);
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	};
	return (
		<div className='fixed bottom-28 left-0 right-0 flex justify-center md:pl-72'>
			{goToBottom && (
				<button
					className='bg-slate-900 text-white w-10 h-10 rounded-full drop-shadow-md z-90'
					onClick={scrollToBottom}
				>
					&darr;
				</button>
			)}
		</div>
	);
};
