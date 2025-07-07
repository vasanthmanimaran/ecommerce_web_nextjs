'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CategoriesContent from '../categories/components/categories'

const ErrorFallback = ({ error }) => (
  <div className="text-red-500 p-4 text-center">
    Error loading categories: {error.message}
  </div>
)

export default function CategoriesPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-10 w-10 border-4 border-gray-400 rounded-full border-t-transparent" />
        </div>
      }>
        <CategoriesContent />
      </Suspense>
    </ErrorBoundary>
  )
}