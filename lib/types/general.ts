import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps, type JSX } from 'react';

export interface TitleAndText {
  title: string;
  text: string;
}

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

export type IconComp = (props: SVGProps<SVGSVGElement>) => JSX.Element;
export type LucideIconComp = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export interface TitleAndIcon {
  title: string;
  Icon: IconComp;
}

export type FormErrors<T extends object> = Partial<Record<keyof T | 'root', string[] | undefined>>;
