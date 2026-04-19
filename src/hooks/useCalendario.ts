import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface CalendarioEvento {
  id: string;
  casa: string;
  tipo_trabalho: string;
  nome: string;
  data_evento: string;
  horario_inicio: string | null;
  horario_fim: string | null;
  valor_contribuicao: number | null;
  descricao: string | null;
  status: string;
  link_whatsapp: string | null;
}

export function useCalendario(casa: string, limit = 6) {
  const [eventos, setEventos] = useState<CalendarioEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!supabase || !casa) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const today = new Date().toISOString().split("T")[0];
        const { data, error: err } = await supabase
          .from("calendario")
          .select("*")
          .eq("casa", casa)
          .gte("data_evento", today)
          .eq("status", "confirmado")
          .order("data_evento", { ascending: true })
          .limit(limit);

        if (err) throw err;
        setEventos(data || []);
      } catch (e: any) {
        setError(e.message);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [casa, limit]);

  return { eventos, loading, error };
}
