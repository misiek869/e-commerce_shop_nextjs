import Image from 'next/image'
import loader from '@/assets/loader.gif'

const LoadingPage = () => {
	return (
		<div className='flex flex-row min-h-screen justify-center items-center'>
			<Image src={loader} height={150} width={150} alt='loading spinner' />
		</div>
	)
}

export default LoadingPage
