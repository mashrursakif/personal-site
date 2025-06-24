import Link from 'next/link';

export default function SpamEmails() {
  return (
    <div className='max-w-full text-black pb-20'>
      <div className='mb-10'>
        <h1 className='text-4xl font-bold mb-4 color-secondary'>
          Spam Email Classification
        </h1>

        <p className='text-lg mb-4'>
          Use a machine learning model to classify emails as spam based on given
          metadata
        </p>

        <div className='flex items-center gap-1 mb-4'>
          <p className='text-lg'>Link to competition:</p>
          <Link
            className='text-lg underline text-blue-600 hover:text-blue-800'
            href='https://www.kaggle.com/competitions/spam-emails12345/overview'
          >
            https://www.kaggle.com/competitions/spam-emails12345/overview
          </Link>
        </div>

        <p className='text-lg mb-4'>Placement: 1st out of 43</p>

        <p className='text-lg mb-4'>
          This was the very first competition where I got 1st place! This was a
          Kaggle Community competition. While this wasn't a super complex
          competition, it was still really fun to try out some ideas and
          iterating on them
        </p>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>My Approach</h2>

        <p className='text-lg mb-4'>
          For tabular tasks, I usually start building a quick model using
          CatBoost. It's simple, easy to understand, and usually performs pretty
          well too, without requiring lots of tinkering.
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm mb-4 max-w-[1000px]'>
          <code>
            {`cb_params = {
    'iterations': 2000,
    'early_stopping_rounds': 500,
    'learning_rate': 1e-2,
    'loss_function': 'Logloss',
    'eval_metric': 'Accuracy',
    'verbose': 100,
    'task_type': 'CPU',
}
model = CatBoostClassifier(**cb_params)`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          This base model already gave a great 93.5% accuracy score on
          validation set.
        </p>

        <p className='text-lg mb-4'>
          I later decided to do some feature engineering:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm mb-4 max-w-[1000px]'>
          <code>
            {`full_df['credit_per_age'] = full_df['CreditScore'] / (full_df['Age'] + 1)
full_df['balance_to_salary'] = full_df['Balance'] / (full_df['EstimatedSalary'] + 1)
full_df['active_card'] = full_df['IsActiveMember'] * full_df['HasCrCard']`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          Adding these extra features further improved score slightly.
        </p>

        <p className='text-lg mb-4'>
          After that I tried doing k-folded training using 5 CatBoost Models:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm mb-4 max-w-[1000px]'>
          <code>
            {`from sklearn.model_selection import StratifiedKFold

kf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

models = []
for fold_idx, (train_idx, valid_idx) in enumerate(kf.split(x, y)):
    x_train, x_valid = x.iloc[train_idx], x.iloc[valid_idx]
    y_train, y_valid = y.iloc[train_idx], y.iloc[valid_idx]

    train_pool = Pool(x_train, label=y_train, cat_features=cat_cols)
    valid_pool = Pool(x_valid, label=y_valid, cat_features=cat_cols)

    model = CatBoostClassifier(**cb_params)
    model.fit(train_pool, eval_set=valid_pool)
    models.append(model)`}
          </code>
        </pre>

        <p className='text-lg mb-4'>But improvements from this were minimal</p>

        <p className='text-lg mb-4'>
          In the final submission, I decided to use a AutoGluon, trained for 15
          minutes. This was the simplest, fastest way to perform stacking and
          ensembling on a bunch of models:
        </p>

        <pre className='bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm mb-4 max-w-[1000px]'>
          <code>
            {`from autogluon.tabular import TabularPredictor

predictor = TabularPredictor(label='Exited', problem_type='binary', eval_metric='accuracy')

predictor.fit(
   copy_df,
   presets='best_quality',
   time_limit=60*15,
   auto_stack=True,
   num_stack_levels=1,
   dynamic_stacking=True,
)`}
          </code>
        </pre>

        <p className='text-lg mb-4'>
          This scored 93.8 on public leaderboard and 93.4 on private
          leaderboard:
        </p>

        <Link
          className='text-lg underline text-blue-600 hover:text-blue-800'
          href='https://www.kaggle.com/competitions/spam-emails12345/leaderboard'
        >
          https://www.kaggle.com/competitions/spam-emails12345/leaderboard
        </Link>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 color-secondary'>
          Closing Thoughts
        </h2>

        <p className='text-lg mb-4'>
          I had only made a handful of submissions on this competition, and I
          wasn't really expecting to get 1st place... even if it is a relatively
          smaller competition, I'm still very happy with this win nonetheless
        </p>
      </div>
    </div>
  );
}
