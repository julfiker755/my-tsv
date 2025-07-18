export type IdParams = {
  params: Promise<{ id: string }>
};

export type SlugParams = {
  params: Promise<{ slug: string }>
};

export interface childrenProps {
  children: React.ReactNode;
}