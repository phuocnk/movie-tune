import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export interface ImgProps {
  src: string
  className?: string | undefined
}

const Img = ({ src, className }: ImgProps) => {
  return <LazyLoadImage className={className || ''} alt='' effect='blur' src={src} />
}

export default Img
