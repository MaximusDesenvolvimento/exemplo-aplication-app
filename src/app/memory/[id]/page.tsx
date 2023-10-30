import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/dist/client/components/headers'

import { api } from '@/lib/api'

import { ChevronLeft, Edit } from 'lucide-react'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { MemoriesProps } from '@/app/page'

dayjs.locale(ptBr)

interface IdProps {
  params: {
    id: string
  }
}

interface MemoryProp extends MemoriesProps {
  content: string
  isPublic: boolean
  converUrl: string
}

type MemoryProps = Omit<MemoryProp, 'excerpt' | 'coverUlr'>

export default async function Memory({ params }: IdProps) {
  const id = params.id

  const token = cookies().get('token')?.value

  const response = await api.get(`/memory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: MemoryProps = await response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <div>
        <div key={memory.id} className="space-y-4">
          <div className="item-center flex cursor-pointer gap-2">
            <Edit className="h-4 w-4 " />
            <span className="text-sm leading-relaxed text-gray-300">
              Editar memória
            </span>
          </div>
          <Image
            width={592}
            src={memory.converUrl}
            height={280}
            alt="image memory"
            className="rounded"
          />
          <p>{memory.content}</p>
        </div>
      </div>
    </div>
  )
}
