import Link from 'next/link';

export default function DiseaseOutbreaks() {
  return (
    <div className='max-w-full text-black pb-20'>
      <div className='mb-10'>
        <h1 className='text-4xl font-bold mb-4 color-secondary'>
          Predicting Disease Outbreaks with Climate Data
        </h1>

        <p className='text-lg mb-4'>
          Using a machine learning model to make predict outbreaks of
          water-borne diseases using climate information and regional data
        </p>

        <div className='mb-4'>
          <b className='text-lg'>Link to competition:</b>
          <br />
          <Link
            className='text-lg underline text-blue-600 hover:text-blue-800'
            href='https://zindi.africa/competitions/outsmarting-outbreaks-challenge'
          >
            https://zindi.africa/competitions/outsmarting-outbreaks-challenge
          </Link>
        </div>

        <p className='text-lg mb-4'>
          <b>Placement: 20th out of 369</b>
        </p>

        <p className='text-lg mb-4'>
          This was the very first Zindi competition I had participated in. I had
          only found out about it a week before the submission deadline, but
          thankfully I had enough time to work on a decent model, which got me
          20th place. While there are aspects about the model that could've been
          improved, I am still very happy with my placement
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>Dataset</h2>

        <p className='text-lg mb-4'>
          In this competition we were provided with regional data on different
          types of diseases and number of outbreaks that had occurred each
          month. The data ranged from 2019 to 2022. And the model had to make
          predictions on outbreaks that could occur in 2023. The dataset also
          included information on water sources, waste management and health
          facilities in the area, all of which were quite useful for creating a
          good model. This was a regression task and the models were evaluated
          using Mean Absolute Error
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>My Approach</h2>

        <p className='text-lg mb-4'>
          I had tried a bunch of different models for this task, then settled on
          CatBoost. Though after the end of the competition, discussing with
          other participants it seems many found LightGBM to perform better.
          Nonetheless CatBoost's Regressor performed quite well for me
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>
            {`from catboost import CatBoostRegressor, Pool

reg_params = {
    'iterations': 12000,
    'early_stopping_rounds': 1000,
    'learning_rate': 0.075,
    'loss_function': 'MAE',
    'depth': 3,
    'l2_leaf_reg': 4,
    'bagging_temperature': 2,
    'random_strength': 1,
    'border_count': 63,
    'verbose': 100,
    'task_type': 'CPU',
}

reg_train_pool = Pool(reg_x_train, reg_y_train, cat_features=cat_cols)
reg_valid_pool = Pool(reg_x_valid, reg_y_valid, cat_features=cat_cols)

reg_model = CatBoostRegressor(**reg_params, cat_features=cat_cols)
reg_model.fit(reg_train_pool, eval_set=reg_valid_pool)`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          Before the model could be trained properly, the dataset required a lot
          of cleaning. There were many duplicate columns of data, which caused
          severe performance drops and overfitting on training set, which had to
          be removed.
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>
            {`dup_subset = train_df.drop(columns=['Total']).columns.tolist()
filtered = train_df.drop_duplicates(subset=dup_subset, keep='first')`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          This improved the Mean Absolute Error from 7.49 to 6.51. After
          dropping the duplicate rows of data, I had done quite a bit of feature
          engineering. The most important one being adding target encodings for
          number of outbreaks based on location and type of disease
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
          <code>
            {`def target_encode_df(train_df, te_columns, target_column='target', test_df=None):
    te_df = train_df.copy()

    test_te_df = None
    if test_df is not None: test_te_df = test_df.copy()
    
    for col in te_columns:
        col_min = train_df.groupby(col)[target_column].min()
        col_max = train_df.groupby(col)[target_column].max()
        col_mean = train_df.groupby(col)[target_column].mean()
        col_median = train_df.groupby(col)[target_column].median()
        col_nunique = train_df.groupby(col)[target_column].nunique()
        
        te_min = train_df[col].map(col_min)
        te_max = train_df[col].map(col_max)
        te_mean = train_df[col].map(col_mean)
        te_median = train_df[col].map(col_median)
        te_nunique = train_df[col].map(col_nunique)
    
        te_df = pd.concat([te_df,
                        te_min.rename(f'{col}_te_min'),
                        te_max.rename(f'{col}_te_max'),
                        te_mean.rename(f'{col}_te_mean'),
                        te_median.rename(f'{col}_te_median'),
                        te_nunique.rename(f'{col}_te_nunique')], axis=1)
    
        if test_df is not None:
            test_te_min = test_df[col].map(col_min)
            test_te_max = test_df[col].map(col_max)
            test_te_mean = test_df[col].map(col_mean)
            test_te_median = test_df[col].map(col_median)
            test_te_nunique = test_df[col].map(col_nunique)
        
            test_te_df = pd.concat([test_te_df,
                            test_te_min.rename(f'{col}_te_min'),
                            test_te_max.rename(f'{col}_te_max'),
                            test_te_mean.rename(f'{col}_te_mean'),
                            test_te_median.rename(f'{col}_te_median'),
                            test_te_nunique.rename(f'{col}_te_nunique')], axis=1)

    return te_df, test_te_df

full_train_data, full_test_data = target_encode_df(full_train_data, te_columns=['location', 'disease'], target_column='Total', test_df=full_test_data)`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          Here I've grouped the dataset based on location and disease and
          calculated mean, median, minimum, maximum etc. for target column
          (number of outbreaks) and run the function on both the training set
          and the inference (test) set. This gave the model important context
          and clues about each location and disease type and how that relates to
          number of outbreaks, which it could then use to make much more
          accurate predictions. This further improved the mean absolute error
          from the previous 6.51 all the way to 5.98
        </p>

        <p className='text-lg mb-4'>
          There were many other models and methods I tried but this model
          performed the best, and I chose this as the final submission. On the
          final private leaderboard it scored 6.88 and had 20th placement!
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>Leaderboard</h2>

        <Link
          className='text-lg underline text-blue-600 hover:text-blue-800'
          href='https://zindi.africa/competitions/outsmarting-outbreaks-challenge/leaderboard'
        >
          https://zindi.africa/competitions/outsmarting-outbreaks-challenge/leaderboard
        </Link>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>
          Closing Thoughts
        </h2>

        <p className='text-lg mb-4'>
          I had a ton of fun doing this competition. I'm an A level student and
          this was right before my mock exams at school, but I basically quit
          studying for a whole week and worked on this instead. Thankfully my
          mock exams went pretty well, and working on this paid off too. I am
          very happy with the model's performance.
        </p>
      </div>
    </div>
  );
}
