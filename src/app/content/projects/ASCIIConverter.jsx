import Image from 'next/image';
import Link from 'next/link';

export default function ASCIIConverter() {
	return (
		<div className='max-w-full text-black pb-20'>
			<div className='mb-10'>
				<h1 className='text-4xl font-bold mb-4 color-secondary'>
					ASCII Image Converter
				</h1>

				<p className='text-lg mb-4'>
					A program that converts images and videos into ASCII text. This was my
					first program written in C. While this is a small project, the primary
					motivation for creating it was learning to use C as a beginner.
					Choosing a more fun, small scale project helped with learning the
					basics without it being too overwhelming.
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Features</h2>

				<ul className='list-disc list-inside'>
					<li className='text-lg mb-1'>
						Convert images and videos to ASCII text
					</li>

					<li className='text-lg mb-1'>Save outputs as text files</li>

					<li className='text-lg mb-1'>Select custom resolution for outputs</li>

					<li className='text-lg mb-1'>
						View saved ASCII files through terminal and web viewer
					</li>
				</ul>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Installation and Usage
				</h2>

				<p className='text-lg mb-4'>Clone git repo and build</p>
				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-5'>
					<code>{`git clone https://github.com/mashrursakif/ascii-converter.git`}</code>
					<br />
					<code>{`cd ascii-converter; make`}</code>
				</pre>

				<p className='text-lg mb-4'>Convert image and video</p>
				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-5'>
					<code>{`./ascii_converter -i 'images/cat.jpg' -s -r 100`}</code>
				</pre>

				<p className='text-lg mb-4'>View saved images and videos</p>
				<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-8'>
					<code>{`./ascii_converter -o 'outputs/cat.txt'`}</code>
				</pre>

				<h3 className='text-xl font-semibold mb-2'>Command Line Flags:</h3>

				<p className='text-lg mb-2'>
					-i: Specify path for input image or video
				</p>

				<p className='text-lg mb-2'>
					-s: Save output image (optional, saves as txt file in the outputs/
					directory)
				</p>

				<p className='text-lg mb-2'>
					-r: Specify horizontal resolution (optional, default: 80)
				</p>

				<p className='text-lg mb-2'>
					-o: Specify path for saved ASCII txt file to open and view
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Examples</h2>

				<div className='flex items-center justify-center flex-wrap gap-4 mb-4'>
					<Image
						src='/images/ascii_converter/real_example2.webp'
						alt='Original Image 1'
						width={425}
						height={240}
						className='w-[425px] h-[240px]'
					/>

					<Image
						src='/images/ascii_converter/ascii_example2.webp'
						alt='ASCII Image 1'
						width={425}
						height={240}
						className='w-[425px] h-[240px]'
					/>
				</div>

				<p className='text-sm text-center mb-8'>
					Stock image by tawatchai07 at Freepik
				</p>

				<div className='flex items-center justify-center flex-wrap gap-4 mb-4'>
					<Image
						src='/images/ascii_converter/real_example1.webp'
						alt='Original Image 1'
						width={425}
						height={285}
						className='w-[425px] h-[285px]'
					/>

					<Image
						src='/images/ascii_converter/ascii_example1.webp'
						alt='ASCII Image 1'
						width={425}
						height={285}
						className='w-[425px] h-[285px]'
					/>
				</div>

				<p className='text-sm text-center mb-8'>
					Stock image by wal_172619 at Pixabay
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Process</h2>

				<div className='mb-6'>
					<h3 className='text-xl font-semibold mb-2'>Image Processing</h3>
					<p className='text-lg mb-4'>
						Image input and processing was handled by{' '}
						<code className='bg-gray-300 p-1'>stb_image</code> and{' '}
						<code className='bg-gray-300 p-1'>stb_image_resize</code> was used
						for scaling down higher resolution images to desired resolution.
					</p>

					<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
						<code>
							{`int width, height, channels;
unsigned char *original_img = stbi_load(image_path, &width, &height, &channels, 1);
                        
int output_width = output_size;
int output_height = output_size * 0.3;
int output_channels = 1;
size_t buffer_size = output_width * output_height * output_channels;
unsigned char *scaled_img = malloc(buffer_size);

stbir_resize_uint8_linear(original_img, width, height, 0, scaled_img, output_width, output_height, 0, output_channels);`}
						</code>
					</pre>

					<p className='text-lg mb-4'>
						Since ASCII characters have higher height than width,{' '}
						<code className='bg-gray-300 p-1'>output_height</code> was scaled by
						0.3 to maintain proper aspect ratio. The input images are converted
						to grayscale for easier brightness calculation.
					</p>
				</div>

				<div className='mb-6'>
					<h3 className='text-xl font-semibold mb-2'>Video Processing</h3>
					<p className='text-lg mb-4'>
						Video decoding and gathering pixel data for each frame was done
						using FFmpeg.
					</p>

					<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
						<code>
							{`AVCodecParameters *codec_params = format_context->streams[video_stream_idx]->codecpar;
const AVCodec *codec = avcodec_find_decoder(codec_params->codec_id);
AVCodecContext *codec_context = avcodec_alloc_context3(codec);

avcodec_parameters_to_context(codec_context, codec_params);
avcodec_open2(codec_context, codec, NULL);

AVFrame *original_frame = av_frame_alloc();
AVPacket *packet = av_packet_alloc();

int output_width = output_size;
int output_height = output_size * 0.3;

struct SwsContext *sws_context = sws_getContext(codec_context->width, codec_context->height, codec_context->pix_fmt, output_width, output_height, AV_PIX_FMT_GRAY8, SWS_BILINEAR, NULL, NULL, NULL);

AVFrame *scaled_frame = av_frame_alloc();
int buffer_size = av_image_get_buffer_size( AV_PIX_FMT_GRAY8, codec_context->width, codec_context->width, 1);
uint8_t *buffer = (uint8_t *)av_malloc(buffer_size * sizeof(uint8_t));

av_image_fill_arrays(scaled_frame->data, scaled_frame->linesize, buffer, AV_PIX_FMT_GRAY8, output_width, output_height, 1);`}
						</code>
					</pre>
				</div>

				<div className='mb-6'>
					<h3 className='text-xl font-semibold mb-2'>Printing ASCII Outputs</h3>

					<p className='text-lg mb-4'>
						The <code className='bg-gray-300 p-1'>map_px_to_char</code> function
						calculates brightness of pixels and returns corresponding{' '}
						<code className='bg-gray-300 p-1'>ascii</code> characters.
					</p>

					<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
						<code>
							{`const char *ascii = "@#*+=-:. ";

char map_px_to_char(unsigned char brightness) {
  int ascii_len = strlen(ascii);

  int idx = (brightness / 256.0) * ascii_len;
  return ascii[idx];
}`}
						</code>
					</pre>

					<p className='text-lg mb-4'>
						The <code className='bg-gray-300 p-1'>print_output</code> function
						loops through the pixels and writes to specified file (by default,
						it outputs to terminal using{' '}
						<code className='bg-gray-300 p-1'>stdout</code>)
					</p>

					<pre className='bg-gray-800 text-white p-4 rounded-md max-w-[99%] overflow-x-auto text-sm mb-4'>
						<code>
							{`void print_output(FILE *output_file, unsigned char *img, int output_width, int output_height) {
  for (int y = 0; y < output_height; ++y) {
    for (int x = 0; x < output_width; ++x) {
      unsigned char brightness = img[y * output_width + x];
      fputc(map_px_to_char(brightness), output_file);
    }
    fputc('\n', output_file);
  }
}`}
						</code>
					</pre>
				</div>

				<div className='mb-6'>
					<h3 className='text-xl font-semibold mb-2'>Web Viewer</h3>

					<p className='text-lg mb-4'>
						Viewing higher resolution outputs through the terminal is not really
						feasible due to limited space, hence I decided to create a web
						viewer to better visualize them locally through a browser. (located
						at /web/index.html)
					</p>

					<div className='flex items-center justify-center flex-wrap gap-4 mb-4'>
						<Image
							src='/images/ascii_converter/ascii_web.webp'
							alt='Original Image 1'
							width={600}
							height={360}
							className='w-[600px] h-[auto]'
						/>
					</div>
				</div>

				<p className='text-lg mb-4'>
					Full project code can be found on my{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/mashrursakif/ascii-converter'
					>
						GitHub repository
					</Link>
				</p>
			</div>
			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Closing Notes
				</h2>

				<p className='text-lg mb-4'>
					As this was my first time programming in C, majority of my time on
					this project was spent learning basic usage and features of C. Trying
					to understand pointers, memory allocation and management, different
					data types, and much more. Coming from Javascript and Python, both of
					which work at a much higher level of abstraction, it can be quite
					confusing and difficult to learn C concepts. But grasping concepts of
					a low level language does make it significantly easier to understand
					fundamental computer science topics such as how memory works, how
					function stacks are called, the limitations and constraints associated
					with these things, etc. Working with image and video processing using
					stb_image and FFmpeg for the first time has also been very insightful.
					Even though this project was made just for fun, it did help me learn
					fundamentals of using C quite well.
				</p>
			</div>
		</div>
	);
}
