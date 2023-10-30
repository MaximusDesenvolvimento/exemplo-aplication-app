import Image from 'next/image'
import Link from 'next/link'

import nlwLogo from '../../assets/nlw-spacetime-logo.svg'

export function Hero() {
  return (
    <div className="z-10 mt-5 space-y-5 md:mt-0">
      <Image src={nlwLogo} alt="NLW spacetime" width={160} height={48} />
      <div className="max-w-[420px]">
        <h1 className="pb-1 text-[1.5rem] font-bold leading-tight text-gray-50 md:text-[2.5rem]">
          Sua cápsula do tempo
        </h1>
        <p className="text-sm leading-relaxed text-gray-100 md:text-lg">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-xs uppercase leading-none text-black hover:bg-green-600 md:text-sm"
      >
        CADASTRAR LEMBRANçA
      </Link>
    </div>
  )
}
