"use client"

import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";
import Botao from "./components/Botao";

interface SensorData {
  Sensor: string;
  Codigo: string;
  Status: boolean;
}

export default function Home() {
  const [dadosBackend, setDadosBackend] = useState<SensorData[]>([]);

  const pegaDados = async () => {
    try {
      const resposta = await fetch("http://localhost:8080/");
      const resposta_JSON = await resposta.json();
      setDadosBackend(resposta_JSON);
    } catch (error) {
      console.error("Falha na requisição:", error);
    }
  };

  const deletaTudo = async () => {
    try {
      await fetch("http://localhost:8080/destroy", {
        method: "DELETE",
      });
      setDadosBackend([]);
      alert("Dados excluídos com sucesso!");
    } catch (error) {
      console.error("Falha na requisição:", error);
    }
  };

  useEffect(() => {
    pegaDados();
  }, []);

  const totais = useMemo(
    () => {
      const total = dadosBackend.length;
      const ativos = dadosBackend.filter((item) => item.Status).length;
      return {
        total,
        ativos,
        inativos: total - ativos,
      };
    },
    [dadosBackend]
  );

  return (
    <main className="min-h-screen px-6 py-8 text-[#e4f4ee]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="section-surface rounded-[32px] border border-[rgba(255,255,255,0.08)] p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#7db2a7]">Painel Industrial</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">Monitoramento de Sensores</h1>
              <p className="mt-3 max-w-2xl text-sm text-muted">
                Tema escuro com indicadores modernos, status instantâneo e tipografia mais alinhada ao estilo industrial.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Botao estilo="confirmar" onClick={pegaDados} nome="Atualizar" />
              <Botao estilo="deletar" onClick={deletaTudo} nome="Limpar Dados" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="card-panel rounded-[26px] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[#7db2a7]">Sensores</p>
              <p className="mt-3 text-4xl font-black">{totais.total}</p>
            </div>
            <div className="card-panel rounded-[26px] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[#7db2a7]">Ativos</p>
              <p className="mt-3 text-4xl font-black text-[#6ebf8d]">{totais.ativos}</p>
            </div>
            <div className="card-panel rounded-[26px] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[#7db2a7]">Inativos</p>
              <p className="mt-3 text-4xl font-black text-[#ff8a3d]">{totais.inativos}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {dadosBackend.length === 0 ? (
            <div className="section-surface rounded-[28px] p-10 text-center text-[#b1c6c6]">
              Nenhum sensor encontrado no servidor. Atualize a página ou verifique a conexão com a API.
            </div>
          ) : (
            dadosBackend.map((item, posicao) => {
              const statusLabel = item.Status ? "Operando" : "Parado";
              const accent = item.Status ? "active" : "warning";

              return (
                <Card key={posicao} size="md" accent={accent} title={item.Sensor || "Sensor sem nome"}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`status-pill ${item.Status ? "" : "inactive"}`}>
                        {statusLabel}
                      </span>
                      <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
                        #{item.Codigo || "—"}
                      </span>
                    </div>

                    <div className="space-y-2 rounded-[28px] bg-[#0e1a21] p-4">
                      <div className="flex items-center justify-between text-sm text-muted">
                        <span className="uppercase tracking-[0.18em]">Código</span>
                        <span className="font-semibold text-[#eaf7ee]">{item.Codigo || "---"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted">
                        <span className="uppercase tracking-[0.18em]">Último estado</span>
                        <span className="font-semibold text-[#eaf7ee]">{statusLabel}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
