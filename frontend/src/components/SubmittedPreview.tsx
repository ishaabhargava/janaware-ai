type SubmittedPreviewProps = {
  submittedText: string
}

function SubmittedPreview({ submittedText }: SubmittedPreviewProps) {
  if (!submittedText) return null

  return (
    <section className="mx-auto max-w-5xl px-6 pb-10">
      <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-6">
        <h3 className="text-xl font-semibold text-blue-300">
          Submitted Article Preview
        </h3>
        <p className="mt-4 whitespace-pre-line text-white/80">
          {submittedText}
        </p>
      </div>
    </section>
  )
}

export default SubmittedPreview