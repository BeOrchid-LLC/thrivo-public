import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * App-screenshot device frame from the Figma design: 36px radius with a 3px
 * ink border (hero "Dashboard 1" node 144:512).
 */
export function PhoneFrame({
  src,
  alt,
  width = 227,
  height = 492,
  className,
  priority = false,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-phone border-[3px] border-foreground shadow-lg',
        className
      )}
      style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
