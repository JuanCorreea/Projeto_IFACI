interface ICard {
  title?: string;
  size: keyof typeof tamanhos;
  accent?: keyof typeof estilos;
  children?: React.ReactNode;
}

const tamanhos = {
  sm: "w-full",
  md: "w-full",
  lg: "w-full",
} as const;

const estilos = {
  primary: "card-panel",
  active: "border-[#2d6b4e] bg-[#0f1d1a] text-[#e4f4ee] shadow-[0_30px_60px_-30px_rgba(110,191,141,0.65)]",
  warning: "border-[#7f4d2d] bg-[#231610] text-[#f3deca] shadow-[0_30px_60px_-30px_rgba(255,138,61,0.45)]",
} as const;

export default function Card({ title, size, accent = "primary", children }: ICard) {
  const tamanhoAtivo = tamanhos[size];
  const estiloAtivo = estilos[accent];

  return (
    <div className={`rounded-[30px] border px-6 py-6 ${tamanhoAtivo} ${estiloAtivo}`}>
      <div className="space-y-5">
        <h1 className="text-2xl font-black tracking-[0.08em] uppercase text-[#e4f4ee]">{title}</h1>
        {children}
      </div>
    </div>
  );
}
