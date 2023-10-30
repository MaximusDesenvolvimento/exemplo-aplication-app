'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }
    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <div>
      <input
        onChange={onFileSelected}
        type="file"
        name="midia"
        id="file"
        accept="image/*"
        className=" hidden"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="preview image"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </div>
  )
}
