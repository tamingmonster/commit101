import { useState } from 'react';
import { snapdom } from '@zumer/snapdom';
import jsPDF from 'jspdf';

export const useResumeExport = (hiddenRef: React.RefObject<HTMLDivElement>) => {
  const [isExporting, setIsExporting] = useState(false);

  const generateCanvas = async () => {
    if (!hiddenRef.current) {
      return null;
    }

    // 等待图片加载完成（如果有）
    const images = hiddenRef.current.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // 使用 cache: 'auto' 以利用缓存，提高多次导出的性能
    // scale: 2 用于保证高分辨率屏幕下的清晰度
    return await snapdom.toCanvas(hiddenRef.current, {
      scale: 2,
      cache: 'auto',
    });
  };

  const handleExportImage = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;
      
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;

      const imgData = canvas.toDataURL('image/png');
      
      // A4 尺寸: 210mm x 297mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, handleExportImage, handleExportPDF };
};
