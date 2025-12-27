export default function ResumePage() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="/resume/resume.pdf"
        className="h-full w-full"
        title="Resume PDF"
      />
    </div>
  )
}
