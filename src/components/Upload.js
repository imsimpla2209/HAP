import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Typography, Upload, message } from 'antd'

const validFileType = [
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'text/plain',
  'application/pdf',
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/avif',
  'image/webp',
  'image/x-icon',
  '.docx',
  '.csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xlsx',
  '.xls',
  'application/vnd.ms-excel',
]

export const checkFileFunc = (file) => {
  if (file?.path) {
    return true
  }
  const checkType = validFileType.includes(file.type)
  const checkSize = file.size <= 50000000
  console.log('size', checkSize, file.size)
  console.log('type', checkType, file.type)
  if (!checkSize || !checkType) {
    return false
  } else {
    return true
  }
}

export const handleValidateFile = (e) => {
  const filelist = e?.fileList
  const validFile = filelist.flatMap((file) => {
    const checkFile = checkFileFunc(file)
    if (!checkFile) {
      return []
    } else {
      if (typeof file === 'string') {
        file.thumbUrl = file
        file.url = file
      }
      if (file.path) {
        file.thumbUrl = file.path
        file.url = file.path
      }
      return file
    }
  })
  // console.log(validFile)
  return validFile
}

export const onChangeUpload = file => {
  const checkFile = checkFileFunc(file)
  if (!checkFile) {
    message.error('Your file is invalid, over 50Mb or invalid type')
    file.status = 'error'
    file.response = 'This file is invalid (maybe invalid file type or over 50Mb), please remove this one before upload'
  } else {
    file.status = 'done'
    file.response = 'File is valid'
  }
  return false
}

export const previewFile = file => {
  console.log('s', file)

  if (typeof file === 'string') {
    return file
  }
  if (file?.path) {
    return file?.path
  }
  const checkFile = checkFileFunc(file)

  if (!checkFile) {
    file.url = 'https://freeiconshop.com/wp-content/uploads/edd/document-error-flat.png'
  }
  return file?.thumbUrl ?? ''
}

export function DefaultUpload({ normFile, files, text, maxCount = 10 }) {
  return (
    // <Form.Item
    //   name="upload"
    //   valuePropName="fileList"
    //   getValueFromEvent={e => {
    //     const validFiles = handleValidateFile(e)
    //     normFile(validFiles)
    //   }}
    //   fileList={files}
    //   data={files}
    //   style={{
    //     marginBottom: '20px',
    //     marginTop: '8px',
    //   }}
    // >
    <Upload
      name="logo"
      listType="picture"
      onPreview={previewFile}
      fileList={files}
      onChange={e => {
        const validFiles = handleValidateFile(e)
        normFile(validFiles)
      }}
      accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
application/vnd.ms-excel, .xlsx, .xls"
      beforeUpload={file => onChangeUpload(file)}
      maxCount={maxCount}
    >
      <Button icon={<UploadOutlined />}>{text || 'Đăng Tải'}</Button>
      <Typography.Text disabled style={{ marginLeft: '10px' }}>
        Số lượng tối đa: {maxCount}
      </Typography.Text>
    </Upload>
    // </Form.Item>
  )
}

export function DraggerUpload({ normFile, files }) {
  return (
    <Form.Item label="Drag">
      <Form.Item
        name="dragger"
        valuePropName="fileList"
        getValueFromEvent={e => {
          const validFiles = handleValidateFile(e)
          normFile(validFiles)
        }}
        noStyle
      >
        <Upload.Dragger
          name="files"
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,
.xlsx, .xls"
          beforeUpload={file => onChangeUpload(file)}
          maxCount={10}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Maximum Size: 50MB</p>
          <Typography.Text disabled style={{ marginLeft: '10px' }}>
            Maximum Files: 3
          </Typography.Text>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  )
}
