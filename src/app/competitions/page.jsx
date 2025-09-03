import Link from 'next/link';
import CompList from '../components/CompList';
import { comps } from '../data/dataLists';

export default function Competitions() {
	return (
		<div>
			<div className='w-full max-w-[1200px] mx-auto flex justify-center items-center px-8 py-16 bg-transparent min-h-[360px]'>
				<div className='w-full max-w-[600px] mx-auto px-4'>
					<h1 className='text-4xl text-white-100 text-center mb-4'>
						My Machine Learning Competitions
					</h1>
					<p className='text-center text-xl'>
						These are some of the notable ML competitions I've participated in.
						They include tasks such as making tabular regression and
						classification models, forecasting based on timeseries data, and
						some deep learning solutions as well. I've primarily participated in{' '}
						<Link
							className='underline text-white hover:text-gray-200'
							href='https://www.kaggle.com/mashrursakif'
							target='_blank'
							rel='noopener noreferrer'
						>
							Kaggle
						</Link>{' '}
						and{' '}
						<Link
							className='underline text-white hover:text-gray-200'
							href='https://zindi.africa/users/MashrurSakif'
							target='_blank'
							rel='noopener noreferrer'
						>
							Zindi
						</Link>{' '}
						competitions, and they've been a very useful way for me to learn
						about data science and machine learning. Joining forums and
						discussions in these platforms has also been a great way to learn
						from other participants
					</p>
				</div>
			</div>

			<div className='bg-purple-50 min-h-[800px]'>
				<div className='projects-con w-full max-w-[1200px] mx-auto py-16 border-purple-800'>
					<CompList comps={comps} />

					<p className='text-lg text-center text-gray-900 mt-8'>
						Solutions for these competitions can found on my{' '}
						<Link
							className='text-lg underline text-blue-600 hover:text-blue-800'
							href='https://github.com/mashrursakif/machine-learning-comps'
							target='_blank'
							rel='noopener noreferrer'
						>
							GitHub
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
