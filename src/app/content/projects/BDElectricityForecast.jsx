import Link from 'next/link';

export default function BDElectricityForecast() {
	return (
		<div className='max-w-full text-black pb-20'>
			<div className='mb-10'>
				<h1 className='text-4xl font-bold mb-4 color-secondary'>
					Bangladesh Electricity Forecast
				</h1>

				<p className='text-lg mb-4'>
					Check out the model predictions live:{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://bangladesh-electricity-forecast.vercel.app'
					>
						https://bangladesh-electricity-forecast.vercel.app
					</Link>
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Project Overview
				</h2>

				<p className='text-lg mb-4'>
					Using a machine learning model trained on Bangladesh's electricity and
					weather data to forecast power generation and predict outages
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Features</h2>

				<ul className='list-disc list-inside'>
					<li className='text-lg mb-1'>
						Forecast 7 days of electricity generation
					</li>

					<li className='text-lg mb-1'>
						Forecast 7 days of loadshed and outages
					</li>

					<li className='text-lg mb-1'>
						View predictions and compare with real-world data from{' '}
						<Link
							className='text-lg underline text-blue-600 hover:text-blue-800'
							target='_blank'
							rel='noopener noreferrer'
							href='https://bangladesh-electricity-forecast.vercel.app'
						>
							PGCB
						</Link>{' '}
						through the{' '}
						<Link
							className='text-lg underline text-blue-600 hover:text-blue-800'
							target='_blank'
							rel='noopener noreferrer'
							href='https://erp.pgcb.gov.bd/w/generations/view_generations?page=1'
						>
							website
						</Link>
					</li>
				</ul>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Process</h2>

				<p className='text-lg mb-2'>
					I've used LightGBM for this task, since it performs quite well even
					when trained on limited amounts of data. Finding publicly available
					data for this task was rather difficult, and using LGBM allowed for
					the model to be properly trained without risking overfitting.
				</p>

				<p className='text-lg mb-4'>All data sources are listed below.</p>

				<p className='text-lg mb-4'>
					The full pipeline code can be found on my{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/mashrursakif/bangladesh-electricity-forecast-pipeline'
					>
						GitHub
					</Link>
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Data Sources
				</h2>

				<ul className='list-disc list-inside'>
					<li>
						<Link
							href='https://erp.pgcb.gov.bd/w/generations/view_generations?page=1'
							className='text-blue-900 text-lg underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							Power Grid Company Bangladesh (PGCB)
						</Link>
					</li>

					<li>
						<Link
							href='https://data.mendeley.com/datasets/tbrhznpwg9/1'
							className='text-blue-900 text-lg underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							Mendeley High Volume Real-World Weather Data of Bangladesh
						</Link>
					</li>

					<li className='text-gray-800 text-lg'>
						<Link
							href='https://open-meteo.com'
							className='text-blue-900 text-lg underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							Open Meteo API
						</Link>
					</li>
				</ul>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Closing Notes
				</h2>
				<p className='text-lg mb-4'></p>
			</div>
		</div>
	);
}
