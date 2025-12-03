// import Image from 'next/image';
import Link from 'next/link';

export default function CompResults({ comps }) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto max-w-fit'>
			{/* <div className='flex items-center flex-wrap gap-8'> */}
			{comps.length === 0 ? (
				<p>Nothing found</p>
			) : (
				comps.map((comp, index) => (
					<Link
						key={index}
						href={comp.webLink}
						target='_blank'
						rel='noopener noreferrer'
					>
						<div className='bg-white shadow-md w-full max-w-[360px] h-[200px] rounded-xl overflow-hidden flex flex-col'>
							<div className='p-4 flex flex-1 flex-col justify-between'>
								<div>
									<h2 className='text-xl color-secondary mb-4'>{comp.title}</h2>
									<p className='text-md text-gray-800 mb-4'>
										{comp.description}
									</p>
								</div>

								<div className='flex justify-between'>
									<p className='text-lg text-black'>
										<b>Placement: </b>
										{comp.placement}
									</p>

									<button className='bg-secondary text-white-100 px-4 py-1 rounded-md cursor-pointer'>
										View Details
									</button>
								</div>
							</div>
						</div>
					</Link>
				))
			)}
		</div>
	);
}
