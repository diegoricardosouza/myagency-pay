import logo from '../../../public/logo.png';

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img src={logo} alt="" className={className} />
  )
}
