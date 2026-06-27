'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  label?: string;
  multiple?: boolean;
  initialPreviews?: string[];
}

export default function ImageDropzone({ label = 'Drag & drop images, or click to browse', multiple = true, initialPreviews = [] }: ImageDropzoneProps) {
  const [previews, setPreviews] = useState<string[]>(initialPreviews);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews((prev) => (multiple ? [...prev, ...urls] : urls.slice(0, 1)));
  }, [multiple]);

  const removePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-gold bg-gold/5'
            : 'border-ink/15 dark:border-white/15 hover:border-gold/50 hover:bg-gold/5'
        )}
      >
        <UploadCloud className="w-8 h-8 text-gold-dark dark:text-gold" />
        <p className="text-sm text-ink/60 dark:text-white/60">{label}</p>
        <p className="text-xs text-ink/40 dark:text-white/40">PNG, JPG up to 5MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {previews.map((src, i) => (
            <div key={src + i} className="relative aspect-square rounded-xl overflow-hidden border border-ink/10 dark:border-white/10 group">
              <Image src={src} alt={`Upload preview ${i + 1}`} fill className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => removePreview(i)}
                className="absolute top-1 right-1 p-1 rounded-full bg-ink/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
