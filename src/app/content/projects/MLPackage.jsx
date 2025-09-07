import Link from 'next/link';

export default function MLPackage() {
	return (
		<div className='max-w-full text-black pb-20'>
			<div className='mb-10'>
				<h1 className='text-4xl font-bold mb-4 color-secondary'>
					ML QoL, a Python Package for Machine Learning
				</h1>

				<p className='text-lg mb-4'>
					ML QoL is a Python package that provides helper functions and
					quality-of-life features for machine learning tasks. It offers simple,
					easy-to-use functions for quick model creation and testing. It
					improves overall workflow by removing tedious, repetitive code
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Purpose</h2>

				<p className='text-lg mb-4'>
					Through my time working on personal projects or ML competitions on
					platforms like Kaggle and Zindi, I found myself writing a lot of
					similar and repetitive code. It included things like data
					preprocessing, configuring hyperparameters for models, comparing
					performance of different models, etc. Having to rewrite these over and
					over was monotonous and time-consuming. It also made me less willing
					to try out different ideas since the excess time spent on it may not
					be worthwhile. Initially, I made this package for my own personal use,
					but later decided to publish it on{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://pypi.org/project/ml-qol'
					>
						PyPI
					</Link>{' '}
					as well
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Features</h2>

				<ul className='list-disc list-inside'>
					<li className='text-lg mb-1'>
						Automated hyperparameter mapping for different models such as
						CatBoost and LightGBM
					</li>

					<li className='text-lg mb-1'>
						Data handling functions for managing dates, NaN values, and more
					</li>

					<li className='text-lg mb-1'>
						Feature engineering functions such as combining features together or
						adding target encoded features
					</li>

					<li className='text-lg mb-1'>
						Fast and easy way to train and compare different models and their
						performance, e.g., feature importance, confusion matrix
					</li>

					<li className='text-lg mb-1'>
						Perform folded training and gathering averaged predictions
					</li>

					<li className='text-lg mb-1'>
						Perform weighted ensembling with different types of models
					</li>
				</ul>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Installation
				</h2>

				<p className='text-lg mb-4'>This package can be installed using pip:</p>

				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-5'>
					<code>{`pip install ml-qol`}</code>
				</pre>

				<p className='text-lg mb-4'>Quick Start</p>

				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-5'>
					<code>{`from ml_qol import train_model

# Train a model
model = train_model('lightgbm', 'regression', train_data=train_df, target_col='price')

# Show feature importance
model.plot_importance()

# Use for inference
predictions = model.predict(test_df)
print(predictions)`}</code>
				</pre>

				<p className='text-lg mb-2'>
					Detailed examples can be found{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/mashrursakif/ml-qol/tree/main/examples'
					>
						here
					</Link>
				</p>

				<p className='text-lg mb-4'>
					Full source code can be found on my{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/mashrursakif/ml-qol'
					>
						GitHub
					</Link>
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Closing Notes
				</h2>

				<p className='text-lg mb-4'>
					This is the first Python package I have made, and overall I'm happy
					with how it turned out. Of course it's far from finished, a lot more
					work needs to be done, such as adding model support for XGBoost, Ridge
					(currently it only supports CatBoost and LightGBM); bug fixes for GPU
					training; adding more feature engineering options; and more.
					Nonetheless I've learnt a lot of new things such as Python packaging,
					using type systems, scalability and modularity etc. while working on
					this project
				</p>
			</div>
		</div>
	);
}
