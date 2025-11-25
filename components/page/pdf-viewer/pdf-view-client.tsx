'use client';

import {
	SpecialZoomLevel,
	Viewer,
	Worker,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export const PdfPreviewer = ({ url }: { url: string }) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<div className="h-screen w-full">
			<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js">
				<Viewer
					fileUrl={url}
					plugins={[defaultLayoutPluginInstance]}
					httpHeaders={{
						Referer: 'https://www.idx.co.id/',
						Origin: 'https://www.idx.co.id',
					}}
					defaultScale={SpecialZoomLevel.PageFit}
				/>
			</Worker>
		</div>
	);
};
