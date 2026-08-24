import { useState } from '#imports'
import { useAuth } from './useAuth'

export interface GenerateTestPayload {
  document_id: number | string
  difficulty: string
  num_questions: number
}

export interface SubmitTestPayload {
  document_id: number | string
  difficulty: string
  answers: Array<{
    question_text: string
    options: Record<string, string> | string[]
    user_answer: string
    correct_answer: string
    explanation?: string
  }>
}

export const useQuizApi = () => {
  const { apiCall } = useAuth()
  const documents = useState<any[]>('quiz_documents', () => [])

  // Fetch Dashboard Stats & Recent Documents
  const fetchDashboardData = async () => {
    return await apiCall('/api/dashboard/', {
      method: 'GET'
    })
  }

  // Fetch Full Document Library
  const fetchDocuments = async (sortBy: 'date' | 'name' = 'date') => {
    try {
      const response = await apiCall(`/api/documents/?sort=${sortBy}`, {
        method: 'GET'
      })
      documents.value = Array.isArray(response) ? response : (response.results || [])
      return documents.value
    } catch (err) {
      console.error('Failed to fetch documents:', err)
      return []
    }
  }

  // Upload Document (Multipart/Form-Data)
const uploadDocument = async (file: File) => {
  if (!file) {
    throw new Error('No file selected.')
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      'Unsupported file type. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.'
    )
  }

  if (file.size > 25 * 1024 * 1024) {
    throw new Error('File size must not exceed 25MB.')
  }

  const formData = new FormData()
  formData.append('file', file)

  const newDoc = await apiCall('/api/documents/upload/', {
    method: 'POST',
    body: formData
  })

  const documentId =
    newDoc?.id ??
    newDoc?.document_id

  if (!documentId) {
    throw new Error(
      'Upload succeeded, but the server did not return a document ID.'
    )
  }

  await fetchDocuments()

  return newDoc
}

  // Delete Document
  const deleteDocument = async (docId: number | string) => {
    return await apiCall(`/api/documents/${docId}/`, {
      method: 'DELETE'
    })
  }

  // Generate Test Questions from Document
  const generateTest = async (payload: GenerateTestPayload) => {
    return await apiCall('/api/tests/generate/', {
      method: 'POST',
      body: payload
    })
  }

  // Submit Completed Test Answers
  const submitTest = async (payload: SubmitTestPayload) => {
    return await apiCall('/api/tests/submit/', {
      method: 'POST',
      body: payload
    })
  }

  // Fetch Test History List
  const fetchTestHistory = async () => {
    return await apiCall('/api/tests/history/', {
      method: 'GET'
    })
  }

  // Fetch Single Test Attempt Details
  const fetchTestAttemptDetails = async (attemptId: number | string) => {
    return await apiCall(`/api/tests/history/${attemptId}/`, {
      method: 'GET'
    })
  }

return {
    documents,
    fetchDashboardData,
    fetchDocuments, 
    uploadDocument,
    deleteDocument,
    generateTest,
    submitTest,
    fetchTestHistory,
    fetchTestAttemptDetails
  }
}