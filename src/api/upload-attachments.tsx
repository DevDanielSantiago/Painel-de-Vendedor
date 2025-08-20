import { api } from '../lib/axios'
import { attachment } from './types/attachment'

export interface UploadAttachmentsBody {
  files: FormData
}

interface UploadAttachmentsResponse {
  attachments: attachment[]
}

export async function uploadAttachments({
  files,
}: UploadAttachmentsBody): Promise<UploadAttachmentsResponse> {
  const attachments = await api.post<UploadAttachmentsResponse>(
    '/attachments',
    files,
  )

  return attachments.data
}
