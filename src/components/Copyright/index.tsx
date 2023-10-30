import Link from 'next/link'

export function Copyright() {
  return (
    <div className="mt-2 text-sm text-gray-200 md:mt-0">
      Feito com 💜 no NLW da{' '}
      <Link
        href="https://rocketseat.com.br/"
        target="_blank"
        className="underline hover:text-gray-100"
      >
        Rocketseat
      </Link>
    </div>
  )
}
