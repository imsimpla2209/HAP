import { instance } from "apis/http"
import { config } from "features/auth/authService"


export const fetchPresignedUrl = async (url, file) => {
  try {
    const uploadConfig = (await instance.get(url, config))?.data
    // const sigedUrl = `https://api.cloudinary.com/v1_1/${uploadConfig?.cloudName}/image/upload?api_key=${uploadConfig?.apiKey}&timestamp=${uploadConfig?.timestamp}&signature=${uploadConfig?.signature}`
    const sigedUrl = `https://api.cloudinary.com/v1_1/${uploadConfig?.cloudName}/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('signature', uploadConfig?.signature)
    formData.append('timestamp', uploadConfig?.timestamp)
    formData.append('api_key', uploadConfig?.apiKey)
    const fileTranform = await fetch(sigedUrl, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        return result
      })
      .catch(error => {
        console.error('Error:', error)
      })

    return fileTranform?.secure_url
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchAllToCL = async (files, useOriginFile = true) => {
  const url = 'customer/upload'
  const requests = files.map(async (file) => {
    if (typeof file === 'string') return file
    if (file?.path && file?.type) {
      return file
    }
    let fileBase64 = null
    const type = file?.type;
    if (!useOriginFile) {
      fileBase64 = await getBase64(file.originFileObj).catch(err => console.error(err))
    }

    return await fetchPresignedUrl(url, useOriginFile ? file : fileBase64).then(result => ({ path: result, type }))
  })

  return Promise.all(requests)
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })