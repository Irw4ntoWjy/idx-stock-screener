// components/page/pdf-viewer.tsx
import dynamic from 'next/dynamic';

const PdfPreviewer = dynamic(
	() =>
		import('./pdf-view-client').then((mod) => mod.PdfPreviewer),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-screen items-center justify-center bg-gray-50">
				<p className="text-gray-600">Loading PDF viewer...</p>
			</div>
		),
	}
);

export default PdfPreviewer;
