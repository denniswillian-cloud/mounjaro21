export interface Category {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverColor: string;
  neonColor: string;
  icon: string;
  type: 'phase' | 'day' | 'recipe' | 'habit' | 'download' | 'intro';
  order: number;
  pdfUrl?: string;
}

export interface Chapter {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  habit?: string;
  coverColor: string;
  neonColor?: string;
  pdfUrl?: string;
  order: number;
  emoji?: string;
  // Recipe-specific
  ingredients?: string[];
  steps?: string[];
  bestTime?: string;
  // Day-specific
  recommendedTea?: string;
  dayObjective?: string;
}

export interface Comment {
  id: string;
  chapterId: string;
  userName: string;
  avatar?: string;
  text: string;
  date: string;
  likes: number;
  replies: Comment[];
  approved: boolean;
}

export interface UserProgress {
  completedChapters: string[];
  currentDay: number;
}

// ─── CATEGORIES ────────────────────────────────────────────────────────────────

export const defaultCategories: Category[] = [
  {
    id: 'intro', slug: 'introduccion',
    title: 'Introducción', subtitle: 'El protocolo natural de 21 días',
    coverColor: '#1B3A24', neonColor: '#3DFF7A', icon: '🌿',
    type: 'intro', order: 0,
  },
  {
    id: 'fase1', slug: 'fase-1-activacion',
    title: 'Fase 1', subtitle: 'Activación Metabólica · Días 1–7',
    coverColor: '#0D2A14', neonColor: '#3DFF7A', icon: '🌱',
    type: 'phase', order: 1,
  },
  {
    id: 'fase2', slug: 'fase-2-quema',
    title: 'Fase 2', subtitle: 'Quema Metabólica · Días 8–14',
    coverColor: '#2A1200', neonColor: '#FF7B3A', icon: '🔥',
    type: 'phase', order: 2,
  },
  {
    id: 'fase3', slug: 'fase-3-optimizacion',
    title: 'Fase 3', subtitle: 'Optimización Metabólica · Días 15–21',
    coverColor: '#2A2200', neonColor: '#FFD93D', icon: '⭐',
    type: 'phase', order: 3,
  },
  {
    id: 'digestivos', slug: 'tes-digestivos',
    title: 'Tés Digestivos', subtitle: '7 recetas para apoyar tu digestión',
    coverColor: '#0D2A14', neonColor: '#3DFF7A', icon: '🍵',
    type: 'recipe', order: 4,
  },
  {
    id: 'termogenicos', slug: 'tes-termogenicos',
    title: 'Tés Termogénicos', subtitle: '8 recetas para estimular el metabolismo',
    coverColor: '#2A1200', neonColor: '#FF7B3A', icon: '🔥',
    type: 'recipe', order: 5,
  },
  {
    id: 'desinflamantes', slug: 'tes-desinflamantes',
    title: 'Tés Desinflamantes', subtitle: '7 recetas para reducir la hinchazón',
    coverColor: '#00202A', neonColor: '#47E5D8', icon: '💧',
    type: 'recipe', order: 6,
  },
  {
    id: 'antioxidantes', slug: 'tes-antioxidantes',
    title: 'Tés Antioxidantes', subtitle: '8 recetas ricas en antioxidantes naturales',
    coverColor: '#1A0A2E', neonColor: '#C084FC', icon: '✨',
    type: 'recipe', order: 7,
  },
  {
    id: 'habitos', slug: 'habitos-diarios',
    title: 'Hábitos Diarios', subtitle: 'Acciones simples para resultados reales',
    coverColor: '#1A1800', neonColor: '#FFD93D', icon: '💛',
    type: 'habit', order: 8,
  },
  {
    id: 'downloads', slug: 'descargas',
    title: 'Descargas', subtitle: 'Materiales del programa en PDF',
    coverColor: '#0D2A14', neonColor: '#3DFF7A', icon: '📥',
    type: 'download', order: 9,
  },
];

// ─── CHAPTERS ──────────────────────────────────────────────────────────────────

export const defaultChapters: Chapter[] = [

  // ── INTRO ──────────────────────────────────────────────────────────────────

  {
    id: 'intro-1', categoryId: 'intro', order: 0,
    title: 'Bienvenida al Protocolo',
    subtitle: 'El plan natural de 21 días para acelerar tu metabolismo',
    emoji: '🌿',
    summary: 'Un protocolo diseñado como una guía práctica de 21 días, con enfoque natural, simple y realista. Aquí no encontrarás promesas milagrosas, sino hábitos reales que funcionan.',
    content: `Si sientes que haces esfuerzos para bajar de peso, pero tu cuerpo parece avanzar lentamente, no estás sola.

Muchas personas experimentan digestión pesada, hinchazón, falta de energía o la sensación de que su metabolismo funciona más lento de lo esperado.

La buena noticia: pequeños cambios en los hábitos diarios pueden marcar una gran diferencia.

Durante los próximos 21 días, el objetivo será avanzar paso a paso, construyendo consistencia y creando una base más saludable para tu bienestar.

No se trata de buscar perfección. Se trata de crear consistencia.`,
    habit: 'Dedica 5 minutos esta mañana a escribir por qué quieres transformar tu rutina.',
    coverColor: '#1B3A24', neonColor: '#3DFF7A',
  },
  {
    id: 'intro-2', categoryId: 'intro', order: 1,
    title: 'El Protocolo de 3 Fases',
    subtitle: 'Cómo está organizado tu plan de 21 días',
    emoji: '📋',
    summary: 'El protocolo está dividido en tres fases progresivas, cada una con objetivos específicos y tés recomendados.',
    content: `El protocolo natural de 21 días combina pequeños hábitos diarios con el uso estratégico de tés naturales.

Fase 1 — Activación Metabólica (Días 1–7):
Apoyar la digestión, reducir inflamación e introducir hábitos equilibrados.

Fase 2 — Quema Metabólica (Días 8–14):
Estimular el gasto energético y favorecer el uso eficiente de la energía.

Fase 3 — Optimización Metabólica (Días 15–21):
Consolidar los hábitos adquiridos y mantener una rutina estable a largo plazo.

¿Por qué 21 días? Tres semanas ofrecen el tiempo suficiente para que una persona comience a adaptarse a nuevas rutinas y cree mayor conciencia sobre la alimentación, la hidratación y el bienestar diario.`,
    habit: 'Lee el índice completo del programa y visualiza tu transformación en 21 días.',
    coverColor: '#1B3A24', neonColor: '#3DFF7A',
  },
  {
    id: 'intro-3', categoryId: 'intro', order: 2,
    title: '¿Qué es el Metabolismo?',
    subtitle: 'Entiende cómo funciona tu cuerpo',
    emoji: '⚡',
    summary: 'El metabolismo es mucho más que quemar calorías. Es un sistema complejo que involucra digestión, energía, equilibrio hormonal y bienestar general.',
    content: `El metabolismo es el conjunto de reacciones químicas que permiten que el organismo transforme los alimentos en energía.

Esta energía es la que el cuerpo utiliza para:
• Respirar y pensar
• Mover los músculos
• Digerir alimentos
• Reparar tejidos
• Mantener el equilibrio interno

Incluso cuando descansas, tu metabolismo continúa trabajando.

Factores que influyen en tu metabolismo:
• Genética y edad
• Masa muscular y actividad física
• Alimentación y calidad del descanso
• Equilibrio hormonal y niveles de estrés

Una digestión eficiente permite que el cuerpo absorba correctamente los nutrientes. Las infusiones naturales han sido utilizadas durante siglos como una forma sencilla de apoyar el sistema digestivo.`,
    habit: 'Registra cómo te sientes hoy: energía, digestión e hinchazón (del 1 al 5).',
    coverColor: '#1B3A24', neonColor: '#3DFF7A',
  },

  // ── FASE 1 — ACTIVACIÓN METABÓLICA (Días 1–7) ─────────────────────────────

  {
    id: 'day1', categoryId: 'fase1', order: 0,
    title: 'Día 1', subtitle: 'Activar la digestión',
    emoji: '🌱',
    summary: 'El primer paso de tu protocolo. Activa tu digestión con agua tibia y tu primer té.',
    content: `¡Bienvenida al Día 1 del Protocolo Efecto Mounjaro Natural!

Objetivo del día: Activar la digestión.

Hoy comienzas con el hábito más simple y poderoso: un vaso de agua tibia al despertar. Este pequeño gesto le envía una señal al cuerpo de que el día comienza con intención.

Tu té recomendado para hoy es el Té de Limón y Jengibre — una combinación digestiva perfecta para comenzar la primera fase.

Recuerda: No se trata de perfección. Se trata de mostrarte. Eso ya es una victoria.`,
    habit: 'Bebe un vaso de agua tibia al despertar, antes de cualquier otra cosa.',
    recommendedTea: 'tea1',
    dayObjective: 'Activar la digestión',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day2', categoryId: 'fase1', order: 1,
    title: 'Día 2', subtitle: 'Estimular la circulación',
    emoji: '🚶',
    summary: 'Agrega movimiento ligero a tu rutina. Una caminata de 10-15 minutos ya marca diferencia.',
    content: `¡Excelente! Llegaste al Día 2.

Objetivo del día: Estimular la circulación.

El movimiento es uno de los aliados más importantes para apoyar el metabolismo. No es necesario un entrenamiento intenso. Una caminata de 10-15 minutos activa la circulación sanguínea y favorece el gasto energético.

Tu té de hoy: Té de Canela y Limón — un clásico aromático termogénico que complementa perfectamente el movimiento.

Consejo del día: Si caminas al aire libre, mejor. La luz natural también apoya el ritmo circadiano y mejora la energía.`,
    habit: 'Camina 10-15 minutos hoy, preferiblemente al aire libre.',
    recommendedTea: 'tea9',
    dayObjective: 'Estimular la circulación',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day3', categoryId: 'fase1', order: 2,
    title: 'Día 3', subtitle: 'Reducir la inflamación',
    emoji: '🌿',
    summary: 'Reduce alimentos ultraprocesados hoy. Tu digestión te lo agradecerá.',
    content: `¡Tres días en el protocolo! Estás construyendo algo real.

Objetivo del día: Reducir la inflamación abdominal.

Los alimentos ultraprocesados contienen grandes cantidades de azúcares añadidos, grasas refinadas y sodio, que pueden generar digestión pesada e inflamación. Hoy, elige opciones más naturales: frutas frescas, verduras, alimentos poco procesados.

Tu té de hoy: Té de Jengibre y Menta — una combinación refrescante y digestiva, perfecta para reducir la sensación de pesadez.

Una buena práctica: Antes de comer, pregúntate: "¿Puedo elegir algo más natural aquí?"`,
    habit: 'Elimina al menos un alimento ultraprocesado de tu dieta hoy.',
    recommendedTea: 'tea18',
    dayObjective: 'Disminuir inflamación',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day4', categoryId: 'fase1', order: 3,
    title: 'Día 4', subtitle: 'Apoyar la eliminación',
    emoji: '💧',
    summary: 'Aumenta tu consumo de agua hoy. La hidratación es clave para el metabolismo.',
    content: `Día 4 — a mitad de la primera semana. ¡Lo estás haciendo!

Objetivo del día: Apoyar la eliminación de toxinas.

La hidratación adecuada es fundamental para prácticamente todas las funciones del organismo. Una buena referencia es consumir entre 6 y 8 vasos de agua al día.

Señales de deshidratación: fatiga, ansiedad, digestión lenta, dolor de cabeza.

Tu té de hoy: Té Verde con Limón — rico en antioxidantes naturales y perfecto para acompañar la hidratación.

Tip: Lleva una botella de agua contigo durante todo el día como recordatorio visual.`,
    habit: 'Aumenta tu consumo de agua — busca llegar a 6 vasos hoy.',
    recommendedTea: 'tea12',
    dayObjective: 'Apoyar eliminación de toxinas',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day5', categoryId: 'fase1', order: 4,
    title: 'Día 5', subtitle: 'Regular el metabolismo',
    emoji: '😴',
    summary: 'El descanso es tan importante como la alimentación. Duerme al menos 7 horas esta noche.',
    content: `¡Día 5! La mitad de la primera fase ya está cerca.

Objetivo del día: Regular el metabolismo a través del descanso.

El sueño afecta directamente el metabolismo. Durante el descanso, el cuerpo regula las hormonas del apetito (leptina y grelina) y realiza procesos de recuperación esenciales.

Falta de sueño → niveles de energía bajos → más antojos → metabolismo lento.

Tu té de hoy: Té de Canela y Jengibre — cálido y aromático, ideal para tomar antes de dormir.

Para mejorar el sueño: reduce el uso de pantallas 30 minutos antes de acostarte, mantén tu habitación fresca y oscura.`,
    habit: 'Duerme al menos 7 horas esta noche. Apaga las pantallas 30 min antes.',
    recommendedTea: 'tea11',
    dayObjective: 'Regular el metabolismo',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day6', categoryId: 'fase1', order: 5,
    title: 'Día 6', subtitle: 'Mejorar la digestión',
    emoji: '🍎',
    summary: 'Incluye frutas naturales en tu día. Son aliadas del metabolismo y la digestión.',
    content: `Día 6 — casi terminando la primera semana. ¡Eres increíble!

Objetivo del día: Mejorar la digestión con frutas naturales.

Las frutas frescas aportan fibra, vitaminas, minerales y agua. Son uno de los alimentos más poderosos para apoyar la digestión y aportar energía sostenida.

Opciones recomendadas: manzana, pera, kiwi, papaya, berries, limón. Evita los jugos de frutas procesados.

Tu té de hoy: Té de Limón con Menta — fresco, digestivo y perfecto para acompañar las frutas del día.

Consejo: Incluye una fruta en el desayuno y otra como snack de media mañana.`,
    habit: 'Incluye al menos 2 frutas naturales en tu alimentación hoy.',
    recommendedTea: 'tea7',
    dayObjective: 'Mejorar la digestión',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'day7', categoryId: 'fase1', order: 6,
    title: 'Día 7', subtitle: 'Cerrar la fase de activación',
    emoji: '🏆',
    summary: '¡Primera semana completada! Celebra tu progreso y prepárate para la Fase 2.',
    content: `¡FELICITACIONES! Completaste la Fase 1 — Activación Metabólica.

Objetivo del día: Cerrar la fase con movimiento consciente.

Una semana de hábitos nuevos ya está creando cambios reales en tu organismo. La digestión mejora, la hidratación aumenta y el cuerpo empieza a responder mejor.

Tu té de hoy: Té Verde con Jengibre — la combinación perfecta para celebrar tu primera semana y prepararte para la Fase 2.

Reflexión del Día 7: ¿Qué cambios notaste esta semana? ¿Tu digestión? ¿Tu energía? ¿Tu claridad mental? Escríbelo — esto te motivará en la Fase 2.

La Fase 2 (Quema Metabólica) comienza mañana. ¡Estás lista!`,
    habit: 'Camina 20 minutos hoy y reflexiona sobre tu primera semana.',
    recommendedTea: 'tea8',
    dayObjective: 'Cerrar fase de activación',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },

  // ── FASE 2 — QUEMA METABÓLICA (Días 8–14) ────────────────────────────────

  {
    id: 'day8', categoryId: 'fase2', order: 0,
    title: 'Día 8', subtitle: 'Controlar picos de azúcar',
    emoji: '🔥',
    summary: 'Evita bebidas azucaradas hoy. Tu metabolismo te lo agradecerá con más energía.',
    content: `¡Bienvenida a la Fase 2 — Quema Metabólica!

Objetivo del día: Controlar los picos de azúcar.

Las bebidas azucaradas (refrescos, jugos industriales, bebidas energéticas) generan picos rápidos de glucosa en sangre, seguidos de caídas bruscas que provocan fatiga, ansiedad y más antojos.

Esta semana, el enfoque estará en estimular el gasto energético del organismo y favorecer que el cuerpo use de forma más eficiente la energía de los alimentos.

Tu té de hoy: Té Verde con Canela — termogénico y antioxidante, ideal para comenzar esta nueva fase.`,
    habit: 'Evita todas las bebidas azucaradas hoy. Elige agua, té o agua con limón.',
    recommendedTea: 'tea12',
    dayObjective: 'Controlar picos de azúcar',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day9', categoryId: 'fase2', order: 1,
    title: 'Día 9', subtitle: 'Favorecer el metabolismo',
    emoji: '💧',
    summary: 'Aumenta tu hidratación. El agua es el combustible del metabolismo activo.',
    content: `Día 9 — construyendo el ritmo metabólico.

Objetivo del día: Favorecer el metabolismo con hidratación óptima.

La hidratación es fundamental para el funcionamiento metabólico. Cuando el cuerpo está bien hidratado, procesa mejor los nutrientes y utiliza la energía de forma más eficiente.

Meta de hoy: 8 vasos de agua + 2 tazas de té.

Tu té de hoy: Té de Jengibre y Limón — estimulante, digestivo y rico en antioxidantes. Uno de los favoritos del protocolo.`,
    habit: 'Mantén un registro de cuántos vasos de agua bebes hoy. Meta: 8 vasos.',
    recommendedTea: 'tea1',
    dayObjective: 'Favorecer el metabolismo',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day10', categoryId: 'fase2', order: 2,
    title: 'Día 10', subtitle: 'Activar la quema calórica',
    emoji: '🚶',
    summary: 'Camina 20 minutos hoy. El movimiento activa la quema metabólica de forma natural.',
    content: `¡Día 10! Una tercera parte del programa completada.

Objetivo del día: Activar la quema calórica con movimiento.

El cuerpo humano fue diseñado para moverse. Sin embargo, la vida moderna ha reducido significativamente el nivel de movimiento diario. El sedentarismo puede disminuir el gasto energético y afectar el equilibrio metabólico.

Opciones de movimiento: caminata, subir escaleras, estiramientos, actividades recreativas.

Tu té de hoy: Té de Canela con Clavo — una mezcla aromática intensa que genera sensación de calor y apoya la digestión.`,
    habit: 'Camina 20 minutos hoy. Sube escaleras cuando puedas.',
    recommendedTea: 'tea13',
    dayObjective: 'Activar quema calórica',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day11', categoryId: 'fase2', order: 3,
    title: 'Día 11', subtitle: 'Reducir la inflamación',
    emoji: '🥗',
    summary: 'Evita la comida rápida hoy. Opta por opciones naturales para reducir la inflamación sistémica.',
    content: `Día 11 — en plena fase de quema metabólica.

Objetivo del día: Reducir la inflamación sistémica.

La comida rápida y ultraprocesada contiene aditivos, conservantes y grasas trans que pueden generar inflamación crónica, afectando el metabolismo, la digestión y los niveles de energía.

Opciones alternativas: ensaladas, frutas, proteínas de calidad, verduras asadas, sopas caseras.

Tu té de hoy: Té Verde con Menta — refrescante, antioxidante y perfecto para acompañar una alimentación más natural.`,
    habit: 'Evita la comida rápida hoy. Prepara algo casero, aunque sea simple.',
    recommendedTea: 'tea25',
    dayObjective: 'Reducir inflamación',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day12', categoryId: 'fase2', order: 4,
    title: 'Día 12', subtitle: 'Apoyar la digestión',
    emoji: '🥦',
    summary: 'Agrega más vegetales a tu alimentación hoy. Son aliados del metabolismo activo.',
    content: `Día 12 — tu cuerpo ya está respondiendo a los cambios.

Objetivo del día: Apoyar la digestión con vegetales.

Las verduras aportan fibra, vitaminas, minerales y agua. Son fundamentales para una digestión eficiente. La fibra alimenta la microbiota intestinal, que está directamente relacionada con el metabolismo.

Recomendados: brócoli, espinacas, zanahoria, pepino, apio, pimientos.

Tu té de hoy: Té de Jengibre con Canela — cálido y digestivo, perfecto después de una comida rica en vegetales.`,
    habit: 'Incluye al menos 2-3 porciones de vegetales en tu alimentación hoy.',
    recommendedTea: 'tea11',
    dayObjective: 'Apoyar la digestión',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day13', categoryId: 'fase2', order: 5,
    title: 'Día 13', subtitle: 'Mejorar el metabolismo',
    emoji: '💧',
    summary: 'Mantén hidratación constante durante todo el día. Es clave para el metabolismo óptimo.',
    content: `Día 13 — casi al final de la Fase 2.

Objetivo del día: Mejorar el metabolismo con hidratación constante.

La hidratación no solo afecta la digestión. También está relacionada con la regulación de la temperatura corporal, el transporte de nutrientes, la eliminación de residuos y el funcionamiento del cerebro.

Señal de buena hidratación: orina de color amarillo claro.

Tu té de hoy: Té Verde con Limón — una infusión ligera y revitalizante, perfecta para mantener la hidratación durante el día.`,
    habit: 'Lleva agua contigo todo el día. Meta: hidratación constante, no solo cuando tengas sed.',
    recommendedTea: 'tea12',
    dayObjective: 'Mejorar metabolismo',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'day14', categoryId: 'fase2', order: 6,
    title: 'Día 14', subtitle: 'Cerrar la fase de quema',
    emoji: '🏆',
    summary: '¡Dos semanas completadas! Un logro real. Prepárate para la Fase 3.',
    content: `¡FELICITACIONES! Completaste la Fase 2 — Quema Metabólica.

¡Dos semanas de protocolo! Esto es un logro significativo.

Objetivo del día: Cerrar la fase con actividad física ligera.

A lo largo de los últimos 7 días trabajaste en: estimular el gasto energético, mejorar la hidratación, reducir alimentos procesados y mantener una rutina de movimiento.

Tu té de hoy: Té de Canela y Jengibre — la combinación más completa de la Fase 2.

Reflexión del Día 14: ¿Qué cambios notas respecto a la semana pasada? ¿Más energía? ¿Mejor digestión? ¿Menos hinchazón? Escríbelo. La conciencia acelera los resultados.

¡La Fase 3 (Optimización) comienza mañana!`,
    habit: 'Realiza actividad física ligera y reflexiona sobre tus 2 semanas de progreso.',
    recommendedTea: 'tea11',
    dayObjective: 'Cerrar fase de quema',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },

  // ── FASE 3 — OPTIMIZACIÓN METABÓLICA (Días 15–21) ────────────────────────

  {
    id: 'day15', categoryId: 'fase3', order: 0,
    title: 'Día 15', subtitle: 'Optimizar el metabolismo',
    emoji: '⭐',
    summary: 'Comienza la fase final. Consolida tus hábitos y mantén la hidratación óptima.',
    content: `¡Bienvenida a la Fase 3 — Optimización Metabólica!

Objetivo del día: Optimizar el metabolismo con hidratación.

Después de 14 días de trabajo, tu organismo ya ha comenzado a adaptarse a una rutina más equilibrada. Esta fase final no busca introducir cambios radicales, sino reforzar lo aprendido y crear una rutina sostenible.

Esta semana se introducen tés antioxidantes que complementan el trabajo metabólico de las fases anteriores.

Tu té de hoy: Té Verde con Limón — el aliado más versátil de todo el protocolo.`,
    habit: 'Mantén hidratación constante hoy. Celebra haber llegado a la Fase 3.',
    recommendedTea: 'tea12',
    dayObjective: 'Optimizar metabolismo',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day16', categoryId: 'fase3', order: 1,
    title: 'Día 16', subtitle: 'Estimular la circulación',
    emoji: '🚶',
    summary: 'Camina 20 minutos hoy. El movimiento regular es el hábito más poderoso para el metabolismo.',
    content: `Día 16 — en la recta final del protocolo.

Objetivo del día: Estimular la circulación con movimiento.

En esta fase, el objetivo es consolidar el nivel de movimiento que desarrollaste en las fases anteriores. Cada caminata, cada escalera elegida, cada estiramiento matutino está construyendo un metabolismo más activo.

Tu té de hoy: Té de Jengibre y Menta — la combinación perfecta de calor digestivo y frescura energizante.

Motivación: En 6 días más completarás los 21 días. Cada paso que das hoy cuenta.`,
    habit: 'Camina 20 minutos hoy. Hazlo como un ritual, no como una obligación.',
    recommendedTea: 'tea18',
    dayObjective: 'Estimular circulación',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day17', categoryId: 'fase3', order: 2,
    title: 'Día 17', subtitle: 'Equilibrio metabólico',
    emoji: '😴',
    summary: 'Prioriza el descanso esta noche. El sueño de calidad consolida todos los cambios del protocolo.',
    content: `Día 17 — el descanso como herramienta de transformación.

Objetivo del día: Equilibrio metabólico a través del sueño.

El descanso nocturno es fundamental para el equilibrio metabólico. Durante el sueño, el cuerpo realiza procesos importantes de recuperación y regulación hormonal.

Recomendaciones para mejorar el sueño:
• Mantener horarios de sueño consistentes
• Reducir el uso de pantallas antes de dormir
• Crear un ambiente tranquilo y oscuro
• Evitar comidas pesadas justo antes de acostarte

Tu té de hoy: Té de Canela con Limón — cálido y reconfortante, ideal para la noche.`,
    habit: 'Apaga las pantallas 30 min antes de dormir. Duerme al menos 7-8 horas.',
    recommendedTea: 'tea9',
    dayObjective: 'Equilibrio metabólico',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day18', categoryId: 'fase3', order: 3,
    title: 'Día 18', subtitle: 'Mejorar la digestión',
    emoji: '🥗',
    summary: 'Incluye alimentos naturales en tu día. Están directamente relacionados con la eficiencia del metabolismo.',
    content: `Día 18 — consolidando los hábitos más importantes.

Objetivo del día: Mejorar la digestión con alimentos naturales.

Una digestión eficiente es la base de un metabolismo activo. Los alimentos naturales (frutas, verduras, proteínas de calidad, grasas saludables) apoyan directamente este proceso.

Alimentos recomendados hoy:
• Frutas frescas (especialmente manzana, pera, kiwi)
• Verduras variadas
• Proteínas de calidad
• Grasas saludables (aceite de oliva, aguacate, frutos secos)

Tu té de hoy: Té Verde con Jengibre — antioxidante y digestivo, la combinación más completa.`,
    habit: 'Incluye alimentos naturales en cada comida del día. Evita lo ultraprocesado.',
    recommendedTea: 'tea8',
    dayObjective: 'Mejorar digestión',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day19', categoryId: 'fase3', order: 4,
    title: 'Día 19', subtitle: 'Mantener el metabolismo activo',
    emoji: '🚫',
    summary: 'Evita los procesados hoy. Tres días para completar el protocolo — mantén el ritmo.',
    content: `Día 19 — ¡solo 3 días para terminar!

Objetivo del día: Mantener el metabolismo activo.

En estos últimos días del protocolo, el objetivo es demostrar que los hábitos ya son parte de tu rutina natural. Elegir bien hoy no debería sentirse como un esfuerzo — debería sentirse como la nueva normalidad.

Los alimentos ultraprocesados son el mayor obstáculo para el metabolismo eficiente. Hoy, elige conscientemente.

Tu té de hoy: Té de Limón y Menta — fresco, digestivo y perfecto para mantenerte energizada.`,
    habit: 'Evita los procesados hoy. Cocina algo simple pero natural.',
    recommendedTea: 'tea7',
    dayObjective: 'Mantener metabolismo activo',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day20', categoryId: 'fase3', order: 5,
    title: 'Día 20', subtitle: 'Sostener la quema metabólica',
    emoji: '💪',
    summary: '¡Un día antes del final! Cierra con una sesión de actividad física ligera.',
    content: `Día 20 — penúltimo día del protocolo. ¡Casi lo lograste!

Objetivo del día: Sostener la quema metabólica con actividad física.

Hoy, el movimiento tiene un significado especial. No es solo para quemar calorías — es una celebración de todo lo que tu cuerpo ha logrado en estas tres semanas.

Tu té de hoy: Té Verde con Canela — termogénico y antioxidante, el brindis perfecto para el penúltimo día.

Reflexión: ¿Recuerdas cómo te sentías el Día 1? Compara eso con cómo te sientes hoy. Esa diferencia es tu transformación.`,
    habit: 'Realiza actividad física ligera hoy. Celébrala como un logro.',
    recommendedTea: 'tea12',
    dayObjective: 'Sostener quema metabólica',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },
  {
    id: 'day21', categoryId: 'fase3', order: 6,
    title: 'Día 21', subtitle: 'Consolidar los resultados',
    emoji: '🌟',
    summary: '¡COMPLETASTE EL PROTOCOLO! 21 días de transformación real. Reflexiona y celebra.',
    content: `¡FELICITACIONES! Completaste el Protocolo Efecto Mounjaro Natural de 21 Días.

Esto representa mucho más que seguir un protocolo. Representa el inicio de una relación más consciente con tu cuerpo, tus hábitos y tu bienestar.

A lo largo de estas tres semanas:
✓ Apoyaste tu sistema digestivo
✓ Estimulaste tu metabolismo de forma natural
✓ Mejoraste tu hidratación
✓ Incorporaste movimiento consciente
✓ Aprendiste 30 recetas de tés naturales
✓ Creaste hábitos que pueden durar toda la vida

Tu té de hoy: Té de Jengibre y Limón — el primero que tomaste en el Día 1. Cierra el círculo.

Recuerda siempre: los cambios más poderosos comienzan con pequeñas acciones repetidas todos los días.

El final de los 21 días es solo el comienzo de una nueva etapa.`,
    habit: 'Reflexiona sobre tu recorrido de 21 días. Escribe 3 cambios que notaste.',
    recommendedTea: 'tea1',
    dayObjective: 'Consolidar resultados',
    coverColor: '#2A2200', neonColor: '#FFD93D',
  },

  // ── TÉS DIGESTIVOS (Recetas 1–7) ──────────────────────────────────────────

  {
    id: 'tea1', categoryId: 'digestivos', order: 0,
    title: 'Té de Jengibre y Limón', subtitle: 'El clásico digestivo del protocolo',
    emoji: '🍋',
    summary: 'El jengibre apoya la digestión y genera calor corporal. El limón aporta frescura y complementa sus propiedades digestivas.',
    content: 'Una de las infusiones más usadas en el protocolo. Ideal para comenzar el día o después de las comidas.',
    ingredients: [
      '1 taza de agua filtrada (250 ml)',
      '3 a 4 rodajas de jengibre fresco',
      'Jugo de medio limón',
    ],
    steps: [
      'Calienta el agua hasta ebullición.',
      'Añade las rodajas de jengibre.',
      'Hierve durante 5 minutos a fuego medio.',
      'Retira del fuego y deja reposar 2 minutos.',
      'Cuela y agrega el jugo de limón.',
      'Bebe caliente o a temperatura tibia.',
    ],
    bestTime: 'Mañana en ayunas o después del almuerzo',
    habit: 'Prepara este té antes de tu desayuno durante la primera semana.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea2', categoryId: 'digestivos', order: 1,
    title: 'Té de Manzanilla y Menta', subtitle: 'Calmante y digestivo',
    emoji: '🌼',
    summary: 'La manzanilla tiene propiedades calmantes para el sistema digestivo. La menta ayuda a aliviar la sensación de pesadez después de las comidas.',
    content: 'Una infusión clásica y muy eficaz para momentos de incomodidad digestiva.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de flores de manzanilla secas',
      '5 hojas de menta fresca',
    ],
    steps: [
      'Hierve el agua.',
      'Vierte sobre la manzanilla y la menta en una taza.',
      'Cubre y deja reposar 5 a 7 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después de las comidas o antes de dormir',
    habit: 'Toma esta infusión después de la cena durante la Fase 1.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea3', categoryId: 'digestivos', order: 2,
    title: 'Té de Hinojo', subtitle: 'Anti-hinchazón natural',
    emoji: '🌿',
    summary: 'El hinojo ha sido utilizado tradicionalmente para apoyar la digestión y ayudar a reducir la sensación de hinchazón abdominal.',
    content: 'Simple pero muy efectivo. Ideal para los momentos de mayor sensación de hinchazón.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharadita de semillas de hinojo',
    ],
    steps: [
      'Hierve el agua.',
      'Tritura ligeramente las semillas de hinojo con la parte trasera de una cuchara.',
      'Agrega las semillas al agua hirviendo.',
      'Deja reposar 7 minutos antes de colar.',
      'Bebe caliente.',
    ],
    bestTime: 'Después del almuerzo o cuando sientas hinchazón',
    habit: 'Usa este té cuando sientas hinchazón abdominal.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea4', categoryId: 'digestivos', order: 3,
    title: 'Té de Anís y Canela', subtitle: 'Aromático y digestivo',
    emoji: '⭐',
    summary: 'El anís se utiliza tradicionalmente para apoyar la digestión. La canela aporta un sabor cálido y aromático que complementa perfectamente.',
    content: 'Una combinación cálida y reconfortante, perfecta para los días más frescos.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 estrella de anís',
      '1 pequeña rama de canela',
    ],
    steps: [
      'Agrega el anís y la canela al agua fría.',
      'Lleva a ebullición.',
      'Hierve durante 5 minutos.',
      'Retira del fuego y deja reposar 3 minutos.',
      'Cuela y disfruta caliente.',
    ],
    bestTime: 'Después de las comidas principales',
    habit: 'Prueba este té después de la comida más grande del día.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea5', categoryId: 'digestivos', order: 4,
    title: 'Té de Menta Fresca', subtitle: 'Refrescante y digestivo',
    emoji: '🌿',
    summary: 'La menta es conocida por su efecto refrescante y por su uso tradicional en el apoyo al sistema digestivo. Simple y deliciosa.',
    content: 'La infusión más simple y refrescante del protocolo. Se prepara en menos de 5 minutos.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '6 hojas de menta fresca',
    ],
    steps: [
      'Hierve el agua.',
      'Vierte sobre las hojas de menta en la taza.',
      'Cubre y deja reposar 5 minutos.',
      'Bebe sin colar, o cuélala si prefieres.',
    ],
    bestTime: 'Cualquier momento del día, especialmente post-comidas',
    habit: 'Siempre ten menta fresca disponible en casa durante el protocolo.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea6', categoryId: 'digestivos', order: 5,
    title: 'Té de Jengibre y Manzanilla', subtitle: 'Calor y calma digestiva',
    emoji: '🌸',
    summary: 'Esta combinación une dos ingredientes conocidos por apoyar la digestión y promover relajación después de las comidas.',
    content: 'Una infusión de doble acción: el jengibre estimula la digestión mientras la manzanilla calma el sistema digestivo.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '2 rodajas de jengibre fresco',
      '1 cucharada de flores de manzanilla',
    ],
    steps: [
      'Hierve el jengibre en el agua durante 5 minutos.',
      'Agrega la manzanilla.',
      'Deja reposar otros 5 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después de la cena o cuando el sistema digestivo esté irritado',
    habit: 'Toma esta combinación cuando tengas digestión pesada después de cenar.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'tea7', categoryId: 'digestivos', order: 6,
    title: 'Té de Limón y Menta', subtitle: 'Fresco y revitalizante',
    emoji: '🍋',
    summary: 'Esta infusión es refrescante y ligera, ideal para acompañar momentos de digestión después de las comidas.',
    content: 'La combinación cítrica-refrescante del protocolo. Puede tomarse fría o caliente.',
    ingredients: [
      '1 taza de agua (250 ml)',
      'Jugo de medio limón',
      '5 hojas de menta fresca',
    ],
    steps: [
      'Hierve el agua.',
      'Añade las hojas de menta.',
      'Deja reposar 5 minutos.',
      'Agrega el jugo de limón justo antes de consumir.',
      'Puedes servir fría en verano.',
    ],
    bestTime: 'Media mañana o como reemplazo del café',
    habit: 'Usa esta infusión como reemplazo del café de media mañana.',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },

  // ── TÉS TERMOGÉNICOS (Recetas 8–15) ──────────────────────────────────────

  {
    id: 'tea8', categoryId: 'termogenicos', order: 0,
    title: 'Té Verde con Jengibre', subtitle: 'Antioxidante y termogénico',
    emoji: '🍵',
    summary: 'El té verde es conocido por su contenido de antioxidantes y por formar parte de muchas rutinas relacionadas con el bienestar metabólico.',
    content: 'Una de las infusiones más poderosas del protocolo. Combina el perfil antioxidante del té verde con el efecto termogénico del jengibre.',
    ingredients: [
      '1 taza de agua (250 ml) a 70-80°C (sin hervir completamente)',
      '1 cucharadita de té verde en hojas o 1 bolsita',
      '2 rodajas de jengibre fresco',
    ],
    steps: [
      'Calienta el agua a 70-80°C (sin llegar a ebullición).',
      'IMPORTANTE: No uses agua hirviendo — amarga el té verde.',
      'Añade el té verde y el jengibre.',
      'Deja reposar exactamente 4 minutos.',
      'Cuela y bebe sin azúcar para mejores resultados.',
    ],
    bestTime: 'Mañana después del desayuno (no en ayunas)',
    habit: 'Reemplaza el café por esta infusión durante la Fase 2.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea9', categoryId: 'termogenicos', order: 1,
    title: 'Té de Canela y Limón', subtitle: 'Cálido y aromático',
    emoji: '🍋',
    summary: 'La canela aporta un aroma cálido y es comúnmente utilizada en bebidas relacionadas con el bienestar digestivo y metabólico.',
    content: 'Una infusión reconfortante que combina el calor de la canela con la frescura del limón.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 rama de canela',
      'Jugo de medio limón',
    ],
    steps: [
      'Agrega la rama de canela al agua fría.',
      'Hierve durante 5 minutos.',
      'Retira del fuego.',
      'Agrega el jugo de limón antes de consumir.',
      'Bebe caliente.',
    ],
    bestTime: 'Mañana o después del almuerzo',
    habit: 'Toma esta infusión como parte de tu rutina matutina en la Fase 2.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea10', categoryId: 'termogenicos', order: 2,
    title: 'Té Rojo con Jengibre', subtitle: 'Digestivo y metabólico',
    emoji: '🍵',
    summary: 'El té rojo (pu-erh) ha sido consumido tradicionalmente en algunas culturas como parte de rutinas relacionadas con el bienestar digestivo.',
    content: 'Una infusión robusta y terráquea que combina el perfil único del té rojo con el calor del jengibre.',
    ingredients: [
      '1 taza de agua (250 ml) a 90-95°C',
      '1 cucharadita de té rojo pu-erh',
      '2 rodajas de jengibre fresco',
    ],
    steps: [
      'Calienta el agua a 90-95°C.',
      'Añade el té rojo y el jengibre.',
      'Deja reposar 4 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después de las comidas principales',
    habit: 'Usa el té rojo como bebida digestiva después del almuerzo.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea11', categoryId: 'termogenicos', order: 3,
    title: 'Té de Canela, Jengibre y Limón', subtitle: 'Triple termogénico',
    emoji: '🔥',
    summary: 'Esta combinación aporta un sabor cálido y refrescante. Tradicionalmente se usa para acompañar rutinas orientadas a la digestión y al bienestar metabólico.',
    content: 'La infusión termogénica más completa del protocolo. Tres ingredientes, un efecto poderoso.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 pequeña rama de canela',
      '2 rodajas de jengibre fresco',
      'Jugo de medio limón',
    ],
    steps: [
      'Agrega la canela y el jengibre al agua.',
      'Hierve durante 5 minutos.',
      'Retira del fuego.',
      'Añade el jugo de limón.',
      'Deja reposar 2 minutos y bebe caliente.',
    ],
    bestTime: 'Mañana o media tarde para mayor energía',
    habit: 'Este es el té principal para los días de mayor movimiento físico.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea12', categoryId: 'termogenicos', order: 4,
    title: 'Té Verde con Limón', subtitle: 'Antioxidante ligero',
    emoji: '🍵',
    summary: 'El té verde es conocido por su contenido de antioxidantes y por formar parte de muchas rutinas relacionadas con el metabolismo.',
    content: 'La versión más ligera y versátil del té verde en el protocolo.',
    ingredients: [
      '1 taza de agua (250 ml) a 70-80°C',
      '1 cucharadita de té verde',
      'Jugo de medio limón',
    ],
    steps: [
      'Calienta el agua sin llegar a ebullición.',
      'Añade el té verde.',
      'Deja reposar 3-4 minutos.',
      'Cuela e incorpora el limón al final.',
      'Bebe sin azúcar.',
    ],
    bestTime: 'Media mañana o media tarde',
    habit: 'Sustituye una bebida azucarada por esta infusión cada día.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea13', categoryId: 'termogenicos', order: 5,
    title: 'Té de Jengibre, Canela y Clavo', subtitle: 'Especias de calor profundo',
    emoji: '🌶️',
    summary: 'Esta mezcla aromática combina especias tradicionalmente utilizadas en bebidas calientes para apoyar la digestión y aportar sensación de calor.',
    content: 'La infusión más intensa de la Fase 2. Para quienes disfrutan sabores fuertes y especiados.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '2 rodajas de jengibre fresco',
      '1 pequeña rama de canela',
      '2 clavos de olor',
    ],
    steps: [
      'Agrega todos los ingredientes al agua fría.',
      'Lleva a ebullición.',
      'Hierve durante 6 minutos.',
      'Deja reposar 2 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Mañana o en días fríos',
    habit: 'Usa esta infusión los días de mayor actividad física.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea14', categoryId: 'termogenicos', order: 6,
    title: 'Té Rojo con Canela', subtitle: 'Digestivo y aromático',
    emoji: '♦️',
    summary: 'El té rojo se utiliza tradicionalmente en diferentes culturas como parte de rutinas relacionadas con el bienestar digestivo.',
    content: 'Una combinación robusta y aromática que apoya la digestión y aporta calor.',
    ingredients: [
      '1 taza de agua (250 ml) a 90-95°C',
      '1 cucharadita de té rojo pu-erh',
      '1 pequeña rama de canela',
    ],
    steps: [
      'Calienta el agua a 90-95°C.',
      'Añade el té rojo y la canela.',
      'Deja reposar 4 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después del almuerzo',
    habit: 'Toma este té después de la comida más abundante del día.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },
  {
    id: 'tea15', categoryId: 'termogenicos', order: 7,
    title: 'Té de Jengibre con Pimienta Cayena', subtitle: 'El más intenso del protocolo',
    emoji: '🌶️',
    summary: 'La combinación de jengibre y cayena genera una sensación de calor corporal que tradicionalmente se asocia con bebidas estimulantes del metabolismo.',
    content: 'Solo para quienes toleran bien los sabores picantes. Empieza con una pizca mínima de cayena.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '3 rodajas de jengibre fresco',
      '1 pizca muy pequeña de pimienta cayena',
      'Jugo de limón (opcional)',
    ],
    steps: [
      'Hierve el jengibre durante 5 minutos.',
      'Retira del fuego.',
      'Añade la pizca de cayena (muy pequeña al principio).',
      'Agrega el limón si lo deseas.',
      'Bebe caliente y con cuidado.',
    ],
    bestTime: 'Mañana antes de actividad física',
    habit: 'Prueba este té una vez por semana durante la Fase 2. Ajusta la cayena a tu tolerancia.',
    coverColor: '#2A1200', neonColor: '#FF7B3A',
  },

  // ── TÉS DESINFLAMANTES (Recetas 16–22) ────────────────────────────────────

  {
    id: 'tea16', categoryId: 'desinflamantes', order: 0,
    title: 'Té de Hibisco', subtitle: 'Rojo, refrescante y antioxidante',
    emoji: '🌺',
    summary: 'El hibisco tiene un sabor ligeramente ácido y refrescante. Se utiliza tradicionalmente por su perfil antioxidante y su hermoso color rojo natural.',
    content: 'Una de las infusiones más vistosas del protocolo. Puede servirse fría como una bebida refrescante.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de flores de hibisco secas',
    ],
    steps: [
      'Hierve el agua.',
      'Vierte sobre las flores de hibisco en una taza.',
      'Deja reposar 6 minutos antes de colar.',
      'Puede beberse caliente o refrigerarse para una bebida fría.',
    ],
    bestTime: 'Media tarde o como bebida refrescante',
    habit: 'Prepara este té en doble cantidad y guarda la mitad fría para la tarde.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea17', categoryId: 'desinflamantes', order: 1,
    title: 'Té de Manzanilla con Hinojo', subtitle: 'Doble acción anti-hinchazón',
    emoji: '🌼',
    summary: 'La manzanilla apoya la digestión con sus propiedades calmantes, mientras el hinojo ayuda a reducir la sensación de hinchazón abdominal.',
    content: 'Una de las infusiones más eficaces para el control de la hinchazón abdominal.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de manzanilla seca',
      '1 cucharadita de semillas de hinojo',
    ],
    steps: [
      'Hierve el agua.',
      'Añade la manzanilla y las semillas de hinojo.',
      'Deja reposar 6 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después de las comidas o cuando haya sensación de hinchazón',
    habit: 'Toma esta infusión después de la cena durante la Fase 3.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea18', categoryId: 'desinflamantes', order: 2,
    title: 'Té de Menta y Jengibre', subtitle: 'Fresco y anti-inflamatorio',
    emoji: '🌿',
    summary: 'Una bebida refrescante que combina las propiedades digestivas de la menta con el efecto cálido y anti-inflamatorio del jengibre.',
    content: 'El equilibrio perfecto entre frescura y calor digestivo.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '5 hojas de menta fresca',
      '2 rodajas de jengibre',
    ],
    steps: [
      'Hierve el jengibre durante 4 minutos.',
      'Agrega las hojas de menta.',
      'Deja reposar 3 minutos más.',
      'Cuela y bebe caliente o tibio.',
    ],
    bestTime: 'Mañana o después del almuerzo',
    habit: 'Usa este té los días que te sientas más hinchada.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea19', categoryId: 'desinflamantes', order: 3,
    title: 'Té de Anís', subtitle: 'El clásico digestivo',
    emoji: '⭐',
    summary: 'El anís se utiliza tradicionalmente para apoyar la digestión y aliviar molestias digestivas leves como gases y distensión.',
    content: 'Simple y efectivo. El té de anís es uno de los remedios digestivos más clásicos.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharadita de semillas de anís',
    ],
    steps: [
      'Hierve el agua.',
      'Añade las semillas de anís.',
      'Deja reposar 6-7 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Después de las comidas o cuando haya gases',
    habit: 'Ten semillas de anís siempre disponibles en tu cocina.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea20', categoryId: 'desinflamantes', order: 4,
    title: 'Té de Jengibre y Cúrcuma', subtitle: 'Anti-inflamatorio natural',
    emoji: '🌟',
    summary: 'El jengibre y la cúrcuma son ingredientes ampliamente utilizados en infusiones de bienestar digestivo y anti-inflamatorio.',
    content: 'Una combinación dorada con propiedades que van más allá de la digestión.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '2 rodajas de jengibre fresco',
      '½ cucharadita de cúrcuma en polvo',
    ],
    steps: [
      'Agrega el jengibre y la cúrcuma al agua.',
      'Hierve durante 6 minutos.',
      'Deja reposar 2 minutos.',
      'Cuela y bebe caliente.',
      'Opcional: añade una pizca de pimienta negra para mejorar la absorción de la cúrcuma.',
    ],
    bestTime: 'Mañana o tarde',
    habit: 'Incorpora este té al menos 3 veces por semana durante el protocolo.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea21', categoryId: 'desinflamantes', order: 5,
    title: 'Té de Manzanilla con Limón', subtitle: 'Calmante y digestivo',
    emoji: '🌼',
    summary: 'La manzanilla tiene un efecto calmante para el sistema digestivo. El limón añade un toque fresco y aporta vitamina C.',
    content: 'La combinación más suave y calmante del protocolo, perfecta para la noche.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de manzanilla seca',
      'Jugo de medio limón',
    ],
    steps: [
      'Hierve el agua.',
      'Añade la manzanilla.',
      'Deja reposar 5-6 minutos.',
      'Cuela.',
      'Añade el jugo de limón al final.',
      'Bebe caliente.',
    ],
    bestTime: 'Antes de dormir',
    habit: 'Toma este té como ritual nocturno para mejorar el descanso.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },
  {
    id: 'tea22', categoryId: 'desinflamantes', order: 6,
    title: 'Té de Romero', subtitle: 'Aromático y digestivo',
    emoji: '🌿',
    summary: 'El romero es una hierba aromática que ha sido utilizada en infusiones naturales relacionadas con el bienestar digestivo.',
    content: 'Una infusión herbal con un aroma inconfundible y propiedades digestivas reconocidas.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharadita de romero seco o 2 ramitas de romero fresco',
    ],
    steps: [
      'Hierve el agua.',
      'Añade el romero.',
      'Deja reposar durante 5 minutos.',
      'Cuela y bebe caliente.',
    ],
    bestTime: 'Media tarde o después del almuerzo',
    habit: 'Prueba el romero fresco — el aroma es completamente diferente al seco.',
    coverColor: '#00202A', neonColor: '#47E5D8',
  },

  // ── TÉS ANTIOXIDANTES (Recetas 23–30) ─────────────────────────────────────

  {
    id: 'tea23', categoryId: 'antioxidantes', order: 0,
    title: 'Té Verde con Manzana', subtitle: 'Suave y antioxidante',
    emoji: '🍎',
    summary: 'Una bebida suave y aromática. El té verde aporta antioxidantes naturales y la manzana añade un dulzor natural y fresco.',
    content: 'La infusión más suave y fácil de preparar para quienes no disfrutan sabores intensos.',
    ingredients: [
      '1 taza de agua (250 ml) a 70-80°C',
      '1 cucharadita de té verde',
      '2 rodajas finas de manzana',
    ],
    steps: [
      'Calienta el agua sin llegar a ebullición.',
      'Añade la manzana y el té verde a la taza.',
      'Deja reposar 4 minutos.',
      'Bebe sin colar para mantener las rodajas de manzana.',
    ],
    bestTime: 'Media mañana o media tarde',
    habit: 'Usa este té como snack líquido de media tarde.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea24', categoryId: 'antioxidantes', order: 1,
    title: 'Té de Hibisco con Naranja', subtitle: 'Rico en vitamina C',
    emoji: '🍊',
    summary: 'Una infusión refrescante y rica en compuestos antioxidantes naturales. La combinación hibisco-naranja es una de las más populares del protocolo.',
    content: 'El color rojo intenso y el sabor cítrico hacen de este té uno de los más disfrutados.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de flores de hibisco secas',
      '1 rodaja de naranja',
    ],
    steps: [
      'Hierve el agua.',
      'Añade el hibisco y la rodaja de naranja.',
      'Deja reposar 6 minutos.',
      'Cuela y bebe caliente o frío.',
    ],
    bestTime: 'Media tarde o como bebida refrescante',
    habit: 'Prepara una jarra grande con este té y tómalo frío durante el día.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea25', categoryId: 'antioxidantes', order: 2,
    title: 'Té Verde con Menta', subtitle: 'Fresco y revitalizante',
    emoji: '🌿',
    summary: 'La menta aporta frescura y complementa el perfil antioxidante del té verde. Refrescante a cualquier hora del día.',
    content: 'Frescura y antioxidantes en una misma taza. Puede tomarse caliente o fría.',
    ingredients: [
      '1 taza de agua (250 ml) a 70-80°C',
      '1 cucharadita de té verde',
      '4 hojas de menta fresca',
    ],
    steps: [
      'Calienta el agua a 70-80°C.',
      'Añade el té verde y la menta.',
      'Deja reposar 4 minutos.',
      'Cuela y disfruta caliente o deja enfriar.',
    ],
    bestTime: 'Cualquier momento del día',
    habit: 'Usa este té cuando necesites un momento de pausa y claridad mental.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea26', categoryId: 'antioxidantes', order: 3,
    title: 'Té de Canela y Manzana', subtitle: 'Reconfortante y dulce natural',
    emoji: '🍎',
    summary: 'Una infusión aromática y reconfortante, ideal para momentos de descanso. La manzana aporta dulzor natural sin azúcar añadida.',
    content: 'El té más reconfortante del protocolo. Perfecto para los momentos de relajación.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 pequeña rama de canela',
      '3 rodajas de manzana',
    ],
    steps: [
      'Agrega la canela y la manzana al agua fría.',
      'Hierve durante 6 minutos.',
      'Deja reposar 3 minutos.',
      'Bebe caliente con las rodajas de manzana.',
    ],
    bestTime: 'Tarde o noche',
    habit: 'Usa este té como reemplazo de los dulces de la tarde.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea27', categoryId: 'antioxidantes', order: 4,
    title: 'Té de Hibisco con Limón', subtitle: 'Ácido y antioxidante',
    emoji: '🌺',
    summary: 'El hibisco aporta antioxidantes naturales y el limón añade vitamina C y frescura. Una combinación poderosa y refrescante.',
    content: 'Versión citrus del té de hibisco. Para quienes disfrutan sabores más ácidos.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharada de flores de hibisco',
      'Jugo de medio limón',
    ],
    steps: [
      'Hierve el agua.',
      'Vierte sobre el hibisco.',
      'Deja reposar 6 minutos.',
      'Cuela.',
      'Añade el jugo de limón al final para preservar la vitamina C.',
    ],
    bestTime: 'Media mañana o media tarde',
    habit: 'Este té puede tomarse frío con hielo en días calurosos.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea28', categoryId: 'antioxidantes', order: 5,
    title: 'Té Verde con Jengibre y Limón', subtitle: 'La trinidad metabólica',
    emoji: '🍵',
    summary: 'Esta infusión combina ingredientes tradicionales asociados con el bienestar metabólico. Té verde, jengibre y limón — tres en uno.',
    content: 'La infusión más completa del programa. Antioxidante, termogénica y digestiva a la vez.',
    ingredients: [
      '1 taza de agua (250 ml) a 70-80°C',
      '1 cucharadita de té verde',
      '1 rodaja de jengibre',
      'Jugo de medio limón',
    ],
    steps: [
      'Calienta el agua a 70-80°C.',
      'Añade el té verde y el jengibre.',
      'Deja reposar 4 minutos.',
      'Cuela y añade el limón al final.',
    ],
    bestTime: 'Mañana después del desayuno',
    habit: 'Esta es la infusión ideal para los días del protocolo más exigentes.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea29', categoryId: 'antioxidantes', order: 6,
    title: 'Té de Romero con Limón', subtitle: 'Herbal y refrescante',
    emoji: '🌿',
    summary: 'El romero aporta un aroma herbal único y el limón añade un toque refrescante. Una combinación que estimula los sentidos.',
    content: 'Para los amantes de los sabores herbales e intensos. El romero fresco marca la diferencia.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '1 cucharadita de romero seco o 2 ramitas frescas',
      'Jugo de medio limón',
    ],
    steps: [
      'Hierve el agua.',
      'Añade el romero.',
      'Deja reposar 5 minutos.',
      'Cuela.',
      'Añade el jugo de limón.',
    ],
    bestTime: 'Mañana o media tarde',
    habit: 'Prueba el romero fresco para una experiencia aromática más intensa.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },
  {
    id: 'tea30', categoryId: 'antioxidantes', order: 7,
    title: 'Té de Manzana, Jengibre y Canela', subtitle: 'Cálido, dulce y especiado',
    emoji: '🍎',
    summary: 'Esta combinación crea una infusión aromática y reconfortante ideal para acompañar momentos de descanso. Perfecta para el final del día.',
    content: 'La infusión de cierre del protocolo. Aromática, reconfortante y con toques de todas las categorías.',
    ingredients: [
      '1 taza de agua (250 ml)',
      '2 rodajas de manzana fresca',
      '1 rodaja de jengibre',
      '1 pequeña rama de canela',
    ],
    steps: [
      'Agrega todos los ingredientes al agua fría.',
      'Hierve durante 6 minutos.',
      'Deja reposar 3 minutos.',
      'Bebe caliente, con las rodajas de manzana si deseas.',
    ],
    bestTime: 'Noche, antes de dormir',
    habit: 'Prepara este té en el Día 21 como ritual de cierre del protocolo.',
    coverColor: '#1A0A2E', neonColor: '#C084FC',
  },

  // ── HÁBITOS DIARIOS ────────────────────────────────────────────────────────

  {
    id: 'habit1', categoryId: 'habitos', order: 0,
    title: 'Hidratación Consciente', subtitle: 'El hábito más simple y poderoso',
    emoji: '💧',
    summary: 'Beber agua de forma consciente puede transformar tu energía, digestión y metabolismo en pocos días.',
    content: `La mayoría de la fatiga, ansiedad y digestión lenta tiene una causa común: deshidratación.

El agua es fundamental para prácticamente todas las funciones del organismo:
• Regulación de la temperatura corporal
• Transporte de nutrientes
• Eliminación de residuos
• Funcionamiento cerebral y energético

Meta diaria: 6-8 vasos de agua + las infusiones del protocolo.

Señales de buena hidratación: orina de color amarillo claro, energía estable, menos dolores de cabeza.

La práctica: Pon un vaso de agua en tu mesita de noche esta noche. Mañana, al despertar, bébelo antes de cualquier otra cosa.`,
    habit: 'Bebe un vaso de agua tibia al despertar. Lleva una botella contigo todo el día.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit2', categoryId: 'habitos', order: 1,
    title: 'Movimiento Matutino', subtitle: '10 minutos que cambian el día',
    emoji: '🧘',
    summary: 'El movimiento por la mañana activa el metabolismo, mejora la circulación y aumenta la claridad mental para todo el día.',
    content: `No necesitas ir al gym. 10 minutos de movimiento consciente al despertar cambian todo.

Opciones simples:
• Estiramientos suaves (5-10 min)
• Caminata por el barrio (10-15 min)
• Respiración profunda + movilidad articular
• Subir y bajar escaleras

El secreto: hazlo ANTES de tocar el teléfono. Esta pequeña decisión activa tu sistema nervioso, tu digestión y tu circulación de forma natural.

Consejo para 28-55+: el movimiento matutino es especialmente importante después de los 35 años para mantener el metabolismo activo.`,
    habit: 'Mañana, antes de tocar el teléfono, muévete 10 minutos.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit3', categoryId: 'habitos', order: 2,
    title: 'Comer con Atención', subtitle: 'La digestión empieza en la mente',
    emoji: '🥗',
    summary: 'Comer con mayor atención favorece una digestión más cómoda, mejor absorción de nutrientes y mayor conciencia de la saciedad.',
    content: `La forma en que comes es tan importante como lo que comes.

Prácticas de alimentación consciente:
• Mastica cada bocado al menos 20-25 veces
• Come sin pantallas ni distracciones
• Presta atención a las señales de saciedad
• Come despacio — el cerebro tarda 20 min en registrar la saciedad
• Elige porciones moderadas y aumenta si realmente lo necesitas

La digestión empieza en la boca. Cuando masticas bien, el resto del sistema digestivo trabaja menos y funciona mejor.`,
    habit: 'En la próxima comida, apaga el teléfono y enfócate solo en comer.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit4', categoryId: 'habitos', order: 3,
    title: 'Descanso de Calidad', subtitle: 'El metabolismo se regula mientras duermes',
    emoji: '😴',
    summary: 'El sueño de calidad regula las hormonas del apetito, permite la recuperación muscular y es fundamental para el equilibrio metabólico.',
    content: `El sueño es uno de los pilares más subestimados del metabolismo.

Durante el sueño:
• El cuerpo regula leptina y grelina (hormonas del apetito)
• Se reparan tejidos y músculos
• El cerebro procesa y consolida la memoria
• El sistema inmune se fortalece
• El metabolismo se autorregula

Meta: 7-8 horas de sueño consistente.

Para mejorar el sueño:
• Mantén horarios regulares (mismo horario todos los días)
• Reduce pantallas 30 min antes de dormir
• Crea un ambiente oscuro y fresco
• Toma un té calmante (manzanilla, menta) antes de dormir`,
    habit: 'Define una hora fija para dormir y cúmplela esta semana.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit5', categoryId: 'habitos', order: 4,
    title: 'Reducir el Estrés', subtitle: 'El cortisol frena el metabolismo',
    emoji: '🌿',
    summary: 'El estrés crónico eleva el cortisol, lo que puede afectar el metabolismo, aumentar los antojos y dificultar la pérdida de peso.',
    content: `El estrés no es solo emocional. Tiene consecuencias físicas directas en el metabolismo.

El estrés prolongado provoca:
• Aumento del cortisol
• Mayor almacenamiento de grasa abdominal
• Antojos de azúcar y grasa
• Digestión lenta
• Alteraciones del sueño

Estrategias simples para reducir el estrés:
• Respiraciones profundas: 4 segundos inhalar, 4 sostener, 4 exhalar
• Toma pausas de 5 minutos durante la jornada
• Camina al aire libre cuando sea posible
• Dedica tiempo a actividades que disfrutes
• Practica agradecer antes de dormir`,
    habit: 'Haz 5 respiraciones profundas cuando sientas tensión hoy.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit6', categoryId: 'habitos', order: 5,
    title: 'Alimentación Natural', subtitle: 'Cerca de la naturaleza, lejos de los procesados',
    emoji: '🥦',
    summary: 'Los alimentos naturales son la base del metabolismo eficiente. Cuanto más procesado es un alimento, más difícil resulta para el cuerpo usarlo bien.',
    content: `No se trata de dietas extremas. Se trata de elegir alimentos más cercanos a su forma natural.

Priorizar:
• Frutas y verduras frescas
• Proteínas de calidad (huevo, legumbres, carnes magras)
• Grasas saludables (aceite de oliva, aguacate, nueces)
• Alimentos integrales (arroz integral, avena, quinoa)
• Agua e infusiones naturales

Reducir gradualmente:
• Azúcares añadidos
• Alimentos ultraprocesados
• Bebidas azucaradas
• Comida rápida

El enfoque es gradual y sostenible. No se trata de privación, sino de elecciones más inteligentes.`,
    habit: 'Elige un alimento natural en lugar de un procesado en tu próxima comida.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },
  {
    id: 'habit7', categoryId: 'habitos', order: 6,
    title: 'Constancia sobre Perfección', subtitle: 'El secreto del protocolo de 21 días',
    emoji: '🎯',
    summary: 'La constancia es más poderosa que la perfección. Pequeñas acciones repetidas cada día son la base de la transformación real.',
    content: `Este es el hábito más importante de todos.

No es hacer todo perfecto. Es aparecer cada día, aunque sea con un pequeño gesto.

La neurociencia del hábito:
• Los hábitos se forman con repetición, no con intensidad
• 21 días crean las bases neurológicas de nuevos comportamientos
• El cuerpo aprende de la constancia, no de los esfuerzos esporádicos
• Cada día completado fortalece el hábito

Si fallas un día: no pasa nada. El error se convierte en problema solo si lo usas para abandonar. Un día malo no arruina 20 días buenos.

Recuerda siempre: No se trata de buscar perfección. Se trata de crear consistencia.`,
    habit: 'Hoy, haz al menos UNA cosa del protocolo. Una es suficiente para mantener el hábito.',
    coverColor: '#1A1800', neonColor: '#FFD93D',
  },

  // ── DESCARGAS ──────────────────────────────────────────────────────────────

  {
    id: 'dl1', categoryId: 'downloads', order: 0,
    title: 'Protocolo Completo — 21 Días', subtitle: 'Guía completa en PDF',
    emoji: '📄',
    summary: 'El protocolo completo con las 3 fases, los 21 días, hábitos diarios y planner de seguimiento.',
    content: 'Descarga la guía completa del Protocolo Efecto Mounjaro Natural. Incluye los 21 días organizados por fases, hábitos recomendados, checklist y registro de progreso.',
    pdfUrl: '#',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'dl2', categoryId: 'downloads', order: 1,
    title: 'Las 30 Recetas de Tés', subtitle: 'Todas las recetas en PDF imprimible',
    emoji: '🍵',
    summary: 'Las 30 recetas de tés organizadas por categoría: Digestivos, Termogénicos, Desinflamantes y Antioxidantes.',
    content: 'Guía de recetas completa con ingredientes, preparación y mejores momentos para consumirlas. Lista de ingredientes para llevar al supermercado incluida.',
    pdfUrl: '#',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'dl3', categoryId: 'downloads', order: 2,
    title: 'Tabla de Seguimiento', subtitle: 'Registra tu progreso diario',
    emoji: '📊',
    summary: 'Plantilla imprimible para registrar hidratación, infusión del día, alimentación, movimiento y descanso.',
    content: 'Tabla de seguimiento de 21 días con espacios para registrar: energía (1-5), digestión, inflamación, infusión del día, hábito cumplido. Incluye espacio para notas personales.',
    pdfUrl: '#',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
  {
    id: 'dl4', categoryId: 'downloads', order: 3,
    title: 'Lista de Ingredientes', subtitle: 'Todo lo que necesitas para el protocolo',
    emoji: '🛒',
    summary: 'Lista completa de todos los ingredientes necesarios para las 30 recetas. Lista de compras organizada por categoría.',
    content: `Lista completa de ingredientes para el Protocolo de 21 días:

Hierbas y flores: Manzanilla, Menta fresca o seca, Hibisco, Romero, Salvia

Especias y raíces: Jengibre fresco, Canela en rama, Anís estrellado, Semillas de anís, Semillas de hinojo, Clavos de olor, Cúrcuma en polvo, Pimienta cayena

Tés base: Té verde (hojas o bolsitas), Té rojo pu-erh

Frutas: Limón, Naranja, Manzana fresca

Opcional: Miel natural, Agua filtrada`,
    pdfUrl: '#',
    coverColor: '#0D2A14', neonColor: '#3DFF7A',
  },
];

// ─── COMMENTS ──────────────────────────────────────────────────────────────────

export const defaultComments: Comment[] = [
  {
    id: 'c1', chapterId: 'day1',
    userName: 'María González',
    text: '¡Empezando este camino con mucha emoción! Hice mi primer té de jengibre y limón esta mañana y me sentí increíble 🌿',
    date: '2025-01-15', likes: 14, replies: [], approved: true,
  },
  {
    id: 'c2', chapterId: 'day1',
    userName: 'Ana Martínez',
    text: 'El Día 1 fue más fácil de lo que pensaba. El té digestivo base es delicioso 🍵',
    date: '2025-01-16', likes: 9, replies: [], approved: true,
  },
  {
    id: 'c3', chapterId: 'tea1',
    userName: 'Carmen López',
    text: 'Llevo una semana con el té de jengibre y limón en ayunas y ya noto la diferencia en mi digestión. Totalmente recomendado!',
    date: '2025-01-20', likes: 22, replies: [], approved: true,
  },
  {
    id: 'c4', chapterId: 'day7',
    userName: 'Lucía Fernández',
    text: '¡Primera semana completada! 🎉 Perdí 1.5 kg y me siento con mucha más energía. El protocolo funciona de verdad.',
    date: '2025-01-22', likes: 31, replies: [], approved: true,
  },
  {
    id: 'c5', chapterId: 'tea8',
    userName: 'Rosa Jiménez',
    text: 'El té verde con jengibre se convirtió en mi favorito de la Fase 2. Lo tomo cada mañana antes del trabajo. 💚',
    date: '2025-01-25', likes: 18, replies: [], approved: true,
  },
];
