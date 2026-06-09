interface IBotao {
  nome: string;
  estilo: keyof typeof estilos;
  onClick: () => void;
}

const estilos = {
  deletar: "bg-[#d95c4d] hover:bg-[#e1766a] text-white shadow-[0_18px_40px_-25px_rgba(217,92,77,0.8)]",
  confirmar: "bg-[#6ebf8d] hover:bg-[#84d5a4] text-[#0b1217] shadow-[0_18px_40px_-25px_rgba(110,191,141,0.65)]",
};

export default function Botao({ nome, estilo, onClick }: IBotao) {
  const estiloAtivo = estilos[estilo];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${estiloAtivo}`}
    >
      {nome}
    </button>
  );
}
