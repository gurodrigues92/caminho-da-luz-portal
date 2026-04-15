import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Foto {
  id: string;
  url_imagem: string;
  url_thumbnail: string | null;
  ordem: number;
}

interface EventoComFotos {
  id: string;
  casa: string;
  tipo_trabalho: string;
  tipo_trabalho_slug: string;
  titulo: string;
  data_evento: string;
  fotos: Foto[];
}

interface TrabalhoOption {
  tipo_trabalho: string;
  tipo_trabalho_slug: string;
}

export function useGaleria(casa: string, trabalhoSlug: string | null = null, limit = 20) {
  const [eventos, setEventos] = useState<EventoComFotos[]>([]);
  const [trabalhos, setTrabalhos] = useState<TrabalhoOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        // Fetch trabalhos for filter tabs
        const { data: trabalhosData } = await supabase
          .from("eventos")
          .select("tipo_trabalho, tipo_trabalho_slug")
          .eq("casa", casa)
          .order("tipo_trabalho");

        const uniqueTrabalhos = trabalhosData
          ? Array.from(new Map(trabalhosData.map((t) => [t.tipo_trabalho_slug, t])).values())
          : [];
        setTrabalhos(uniqueTrabalhos);

        // Fetch eventos with fotos
        let query = supabase
          .from("eventos")
          .select("*, evento_fotos(id, url_imagem, url_thumbnail, ordem)")
          .eq("casa", casa)
          .order("data_evento", { ascending: false })
          .limit(limit);

        if (trabalhoSlug) {
          query = query.eq("tipo_trabalho_slug", trabalhoSlug);
        }

        const { data, error: err } = await query;
        if (err) throw err;

        const mapped: EventoComFotos[] = (data || []).map((e: any) => ({
          ...e,
          fotos: (e.evento_fotos || []).sort((a: Foto, b: Foto) => a.ordem - b.ordem),
        }));

        setEventos(mapped);
      } catch (e: any) {
        setError(e.message);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [casa, trabalhoSlug, limit]);

  return { eventos, trabalhos, loading, error };
}
