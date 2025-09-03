import Image from 'next/image';
import Link from 'next/link';

export default function CatBreedClassifier() {
	return (
		<div className='max-w-full text-black pb-20'>
			<div className='mb-10'>
				<h1 className='text-4xl font-bold mb-4 color-secondary'>
					Cat Breed Classification
				</h1>

				<p className='text-lg mb-4'>
					Creating a vision model that can classify breeds of cats based on
					their images
				</p>

				<div className='flex items-center justify-center'>
					<Image
						src='/images/cat_breed_classifier.webp'
						alt='Cat Breed Classifier'
						width={600}
						height={400}
						className='w-[600px] h-[400px] object-cover'
					/>
				</div>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>My Approach</h2>
				<p className='text-lg mb-4'>
					This was the very first deep learning model I had trained, which made
					this a really fun project to work on. A cat breed classifier was a
					good choice since it was a good test of basic skills and knowledge,
					while not being too complicated and overwhelming. That being said,
					looking at it now, there were lots of mistakes and bad design choices
					I made while training this model. I'll go into more detail on that
					later in the post. I primarily used pytorch to train/fine-tune the
					model, using torchvision for data augmentation, using hugging face to
					load the model itself.
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Dataset</h2>

				<div>
					<p className='text-lg'>
						The dataset I used can be found{' '}
						<Link
							className='text-lg underline text-blue-600 hover:text-blue-800'
							href='https://github.com/Aml-Hassan-Abd-El-hamid/datasets'
							target='_blank'
							rel='noopener noreferrer'
						>
							here
						</Link>
					</p>
				</div>

				<p className='text-lg mb-4'>
					It had around total 10K images, of 34 different breeds. The basic
					structure of the pytroch dataset:
				</p>

				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm'>
					<code>{`class CatBreedsDataset(torch.utils.data.Dataset):
    def __init__(self, root_dir, transform=transforms.ToTensor()):
        self.root_dir = root_dir
        self.transform = transform
        self.image_paths = []
        self.labels = []
        
        class_idx = 0
        
        for root, sub_dirs, filenames in os.walk(root_dir):
            for f in filenames:
                if f.endswith('jpg') or file.endswith('png'):
                    match = re.match(r'([a-zA-Z]+(?:_[a-zA-Z]+)*)', f)
                    breed_name = match.group(1)
                    
                    image_path = os.path.join(root, f)
                    
                    if breed_name not in class_dict:
                        class_dict[breed_name] = class_idx
                        class_idx += 1
                    
                    self.image_paths.append(image_path)
                    self.labels.append(class_dict[breed_name])
                 
    def __getitem__(self, index):
        image_path = self.image_paths[index]
        label = self.labels[index]
        img = Image.open(image_path).convert('RGB')
        
        if self.transform:
            img = self.transform(img)
        
        return img, label
    
    def __len__(self):
        return len(self.image_paths)
`}</code>
				</pre>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Initial Training
				</h2>

				<p className='text-lg mb-4'>
					I first decided to train a small model on only 10 cat breeds as a
					starting point. I initially used a resnet-18 model, then switching to
					a resnet-152. I used CrossEntropyLoss as the loss function, SGD
					optimizer and a basic learning rate scheduler:
				</p>

				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
					<code>
						{`model = torchvision.models.resnet152(weights=torchvision.models.ResNet152_Weights.DEFAULT)
num_features = model.fc.in_features
model.fc = torch.nn.Linear(num_features, 12)

loss_fn = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.09)
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)`}
					</code>
				</pre>

				<p className='text-lg mb-4'>
					I used handful of data augmentation techniques to prevent overfitting
					such as:
				</p>

				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
					<code>
						{`train_transforms = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(0.5),
    transforms.RandomVerticalFlip(0.5),
    transforms.ColorJitter(brightness=0.2),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])`}
					</code>
				</pre>

				<p className='text-lg mb-4'>
					I split the data into a train and validation set and trained for a few
					epochs. This method reached around 91% accuracy on validation set, but
					the difference between the resnet-18 and 152 were almost unnoticeable,
					even though 152 being a substantially larger model.
				</p>

				<p className='text-lg mb-4'>
					Next, I tried training on all 34 breeds, using the resnet-152 model.
					It reached around 68% accuracy, the performance was decent, but
					nothing too impressive. So I tried a transformer based google-vit
					model, which still gave similar results.
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Conclusion</h2>

				<p className='text-lg mb-4'>
					The primary issue with my method was using a model that was too large,
					while not having enough data. Properly training/fine-tuning a model
					such as resnet-152 or google-vit, takes a lot of data. This is the
					reason why there weren't much improvements when switching from
					resnet-18 to 152. While at first 10K images seems like a lot, trying
					to classify 34 different breeds is still quite difficult. Using a
					smaller model such as efficient-net would likely give much better
					results. Alongside of that, using Adam or AdamW instead of SGD as the
					optimizer likely would've helped a lot too. Instead of a basic StepLR
					scheduler, using OneCycleLR usually leads to better performance as
					well. Trying cross-validation would make the model much more robust.
					Perhaps these are things I'll try some day in the future but as a
					first attempt at trying to train a deep learning model, I'm happy with
					how this turned out with 68% accuracy on 34 total breeds.
				</p>

				<div>
					<p className='text-lg'>
						If you'd like to try out the model for yourself, it's available on
						my Hugging Face Space{' '}
						<Link
							href='https://huggingface.co/spaces/MashrurSakif/cat-breed-classifier'
							className='text-lg underline text-blue-600 hover:text-blue-800'
							target='_blank'
							rel='noopener noreferrer'
						>
							here
						</Link>
					</p>
				</div>

				<div>
					<p className='text-lg'>
						Along with the files and configs{' '}
						<Link
							href='https://huggingface.co/spaces/MashrurSakif/cat-breed-classifier/tree/main'
							className='text-lg underline text-blue-600 hover:text-blue-800'
							target='_blank'
							rel='noopener noreferrer'
						>
							here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
