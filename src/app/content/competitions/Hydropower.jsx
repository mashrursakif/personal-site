import Image from 'next/image';
import Link from 'next/link';

export default function Hydropower() {
  return (
    <div className='max-w-full text-black pb-20'>
      <div className='mb-10'>
        <h1 className='text-4xl font-bold mb-4 color-secondary'>
          Forecasting Power Generation from Micro-Hydropower Plants
        </h1>

        <p className='text-lg mb-4'>
          Forecasting power generation and consumption from micro-hydropower
          plants (MHPs) through machine learning and deep learning methods,
          using climate data from these regions.
        </p>

        {/* <div className='flex items-center justify-center mb-4'>
          <Image
            src='/images/hydropower_climate_optimization.webp'
            alt='Hydropower'
            width={600}
            height={400}
            className='w-[600px] h-[400px] object-cover'
          />
        </div> */}

        <div className='mb-4'>
          <b className='text-lg'>Link to competition:</b>
          <br />
          <Link
            className='text-lg underline text-blue-600 hover:text-blue-800'
            href='https://zindi.africa/competitions/ibm-skillsbuild-hydropower-climate-optimisation-challenge'
          >
            https://zindi.africa/competitions/ibm-skillsbuild-hydropower-climate-optimisation-challenge
          </Link>
        </div>

        <p className='text-lg mb-4'>
          <b>Placement: 32nd out of 444</b>
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>Dataset</h2>

        <p className='text-lg mb-4'>
          This was a time series dataset which included recordings of voltage,
          current, and energy consumption at 5-minute intervals. The data was
          grouped by power poles and individual users. The training data ranged
          from February 2024 to September 2024. The task was to forecast each
          user's daily total power consumption for one month into the future. We
          were also provided with climate data of the entire time period,
          recorded at 1 hour intervals. These included metrics such as
          temperature, dew point, wind speed, precipitation etc. The evaluation
          metric for this competition was Root Mean Squared Error.
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>My Approach</h2>

        <h3 className='text-xl font-semibold mb-2'>Data Preprocessing</h3>
        <p className='text-lg mb-4'>
          The dataset needed to be aggregated together first before it could be
          used. For power data, I calculated the total power consumed each day
          by each user:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>{`all_data_df = pd.read_csv('Data.csv')
agg_df = all_data_df.groupby(['Source', 'Date', 'consumer_device'], as_index=False).agg({
    'kwh': 'sum'
})`}</code>
        </pre>

        <p className='text-lg mb-4'>
          For climate data, I calculated mean for all columns in dataset:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>{`climate_df = pd.read_excel('Climate Data/Kalam Climate Data.xlsx')
climate_df = climate_df.groupby(climate_df['Date']).mean().reset_index()`}</code>
        </pre>

        <p className='text-lg mb-4'>
          Then I merged the two datasets together row by row:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>{`combined_columns = list(set(agg_df.columns) | set(climate_df.columns))
full_df = pd.DataFrame(columns=combined_columns)

for _, row1 in agg_df.iterrows():
    row2 = climate_df[climate_df['Date'] == row1['Date']].drop(columns=['Date']).iloc[0]
    comb_row = pd.concat([row1, row2], axis=0)
    full_df.loc[len(full_df)] = comb_row`}</code>
        </pre>

        <p className='text-lg mb-4'>
          Though this same thing could be achieved using pandas'{' '}
          <code className='bg-gray-300 p-1'>merge</code> method, the memory
          usage when using it was too high, and I'd run out of RAM on my
          computer. Using a loop takes more time since we're only handling one
          row at a time, but it is much more memory efficient.
        </p>

        <h3 className='text-xl font-semibold mb-2'>CatBoost</h3>

        <p className='text-lg mb-4'>
          Then I used this data to train a{' '}
          <code className='bg-gray-300 p-1'>CatBoostRegressor</code> model.
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>{`from catboost import CatBoostRegressor, Pool

cb_params = {
    'iterations': 5000,
    'learning_rate': 1e-2,
    'loss_function': 'RMSE',
    'verbose': 100,
    'early_stopping_rounds': 1000,
    'task_type': 'CPU',
}

cat_features = ['Source']

train_pool = Pool(x_train, y_train, cat_features=cat_features)
valid_pool = Pool(x_valid, y_valid, cat_features=cat_features)

cb_model = CatBoostRegressor(**cb_params)
cb_model.fit(train_pool, eval_set=[train_pool, valid_pool], use_best_model=True)`}</code>
        </pre>

        <p className='text-lg mb-4'>
          Which scored 10.21 on public leaderboard. This was quite a bad score
          and I was quite surprised at it performing so poorly.
        </p>

        <h3 className='text-xl font-semibold mb-2'>ARIMA</h3>

        <p className='text-lg mb-4'>
          Later I tried using an ARIMA model, and this performed quite a bit
          better, scoring 8.41.
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>{`from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(group["kwh"], order=(7, 1, 2))
fitted_model = model.fit()

forecast_dates = pd.date_range(start=group.index[-1] + pd.Timedelta(days=1),
                               periods=forecast_horizon, freq='D')
forecast_values = fitted_model.forecast(steps=forecast_horizon)`}</code>
        </pre>

        <p className='text-lg mb-4'>
          I had never used ARIMA models before. Since you cannot incorporate
          external features into them, such as climate data, I didn't expect it
          to perform well. So later, I tried ARIMAX, which allowed for external
          variables to be used, but this model performed even worse than the
          CatBoost.
        </p>

        <h3 className='text-xl font-semibold mb-2'>Temporal Awareness</h3>

        <p className='text-lg mb-4'>
          I tried a bunch of other models, such as LGBM and Ridge, but they all
          performed similarly to CatBoost. After discussing with some other
          participants about why gradient boosting models performed so bad, I
          came to realize that it was primarily due to lack of time-based
          awareness.
          <br />
          <b>Link to discussion: </b>
          <Link
            className='text-blue-600 underline hover:text-blue-800'
            href='https://zindi.africa/competitions/ibm-skillsbuild-hydropower-climate-optimisation-challenge/discussions/25608'
          >
            https://zindi.africa/competitions/ibm-skillsbuild-hydropower-climate-optimisation-challenge/discussions/25608
          </Link>
        </p>

        <p className='text-lg mb-4'>
          One of the participants shared the idea of adding{' '}
          <code className='bg-gray-300 p-1'>year_of_week</code> as a new
          feature, this made the model understand temporal relationships much
          better than just using <code className='bg-gray-300 p-1'>month</code>{' '}
          or <code className='bg-gray-300 p-1'>day</code>. After doing some more
          feature engineering, I retrained the CatBoost model and it gave a
          score of 8.36. This was a huge improvement from the previous
          CatBoost's 10.21.
        </p>

        <p className='text-lg mb-4'>
          Looking through plots of energy usage, it seemed throughout entirety
          of winter the power usage was zero.
        </p>

        <div className='flex items-center justify-center mb-4'>
          <Image
            src='/images/hydropower_energy_time_graph.webp'
            alt='Energy Time Graph'
            width={600}
            height={212}
            className='w-[800px] h-auto'
          />
        </div>

        <p className='text-lg mb-4'>
          This was likely due to rivers and water bodies freezing and the
          hydropower plants not producing any energy. Using this data made the
          model biased towards zero values. Removing this time period from the
          training data improved score to 7.83!
        </p>

        <h3 className='text-xl font-semibold mb-2'>Final Model</h3>

        <p className='text-lg mb-4'>
          I took this same model and tried to optimize the hyperparameters. This
          eventually got me 7.17 score on public leaderboard, I chose this as
          the final submission. After competition ended, on the final
          leaderboard, the model scored 4.96!
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>Conclusion</h2>

        <p className='text-lg mb-4'>
          It appears the public leaderboard and private leaderboard sets were
          quite different in this competition and the shake up worked out in my
          favor. I placed 32nd out of 444 total participants. I was very
          surprised at getting this placement, since this competition was quite
          difficult. I also really appreciate the community in{' '}
          <Link
            href='https://zindi.africa/'
            className='text-lg underline text-blue-600 hover:text-blue-800'
          >
            Zindi
          </Link>{' '}
          to be helpful and willing to share their ideas and solutions, which is
          a great way for beginners like me to learn!
        </p>
      </div>
    </div>
  );
}
