interface PreviewSummaryProps {
  summary: string;
  visible: boolean;
}

export const PreviewSummary = ({ summary, visible }: PreviewSummaryProps) => {
  if (!summary || !visible) return null;
  
  return (
    <section>
      <div className="flex items-center gap-2 mb-2 text-gray-400 font-mono text-xs uppercase tracking-wider">
         <span className="text-green-600">/**</span> Summary <span className="text-green-600">*/</span>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
};
