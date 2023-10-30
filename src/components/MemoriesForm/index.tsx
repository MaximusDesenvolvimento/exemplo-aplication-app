'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'
import { MediaPicker } from '../MediaPicker'
import { api } from '@/lib/api'

export function MemoriesForm() {
  const router = useRouter()
  const handlesCreateMemories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fileToupload = formData.get('midia')

    let converUrl = ''
    if (fileToupload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToupload)

      const uploadResponse = await api.post('upload', uploadFormData)

      converUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        converUrl,
        content: formData.get('content'),
        isPlublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form
      onSubmit={handlesCreateMemories}
      className="flex flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="file"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          anexar mídia
        </label>

        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          htmlFor="isPublic"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-500 bg-gray-500 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        salvar
      </button>
    </form>
  )
}
