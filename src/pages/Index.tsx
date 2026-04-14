import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FloralDivider() {
  return (
    <div className="floral-divider my-8">
      <span className="text-[var(--wedding-purple)] text-xl animate-float">✿</span>
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: "var(--wedding-cream)" }}>

      {/* Декоративные лепестки фоновые */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-8 text-5xl opacity-10 animate-float delay-100" style={{ color: "var(--wedding-purple)" }}>❀</div>
        <div className="absolute top-1/4 right-6 text-4xl opacity-10 animate-float delay-300" style={{ color: "var(--wedding-purple)" }}>✿</div>
        <div className="absolute top-1/2 left-4 text-3xl opacity-10 animate-float delay-500" style={{ color: "var(--wedding-brown)" }}>❁</div>
        <div className="absolute bottom-1/3 right-10 text-4xl opacity-10 animate-float delay-200" style={{ color: "var(--wedding-purple)" }}>❀</div>
        <div className="absolute bottom-20 left-12 text-3xl opacity-10 animate-float delay-600" style={{ color: "var(--wedding-brown)" }}>✿</div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10">
        {/* Фото пары */}
        <div className="animate-scale-in mb-10 relative">
          <div
            className="w-52 h-52 md:w-64 md:h-64 rounded-full mx-auto overflow-hidden"
            style={{ border: "4px solid var(--wedding-purple-light)", boxShadow: "0 8px 40px rgba(184,164,201,0.35)" }}
          >
            <img
              src="https://cdn.poehali.dev/files/2437e660-a2ba-4dab-9b1a-2303747b97d3.jpg"
              alt="Алина и Павел"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-display italic"
            style={{ background: "var(--wedding-purple-light)", color: "var(--wedding-purple-dark)" }}
          >
            19 сентября 2026
          </div>
        </div>

        <div className="animate-fade-in-up delay-200">
          <p
            className="font-display italic text-base md:text-lg tracking-widest mb-3"
            style={{ color: "var(--wedding-purple-dark)" }}
          >
            свадьба
          </p>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
            style={{ color: "var(--wedding-dark)", fontWeight: 300 }}
          >
            Алина
            <span style={{ color: "var(--wedding-purple)" }}> & </span>
            Павел
          </h1>
        </div>

        <div className="animate-fade-in-up delay-400 max-w-lg">
          <p className="text-sm md:text-base leading-relaxed font-light mb-10" style={{ color: "var(--wedding-brown)" }}>
            Мы будем счастливы разделить с вами один из самых важных дней нашей жизни
          </p>

          <button
            onClick={() => setInviteOpen(true)}
            className="px-10 py-4 font-display italic text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              border: "1.5px solid var(--wedding-purple)",
              color: "var(--wedding-purple-dark)",
              borderRadius: "2rem",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--wedding-purple)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--wedding-purple-dark)";
            }}
          >
            Открыть приглашение ✿
          </button>
        </div>

        {/* Стрелка вниз */}
        <div className="absolute bottom-10 animate-float delay-700" style={{ color: "var(--wedding-purple)" }}>
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
            <path d="M12 0v28M2 20l10 12 10-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── МОДАЛКА: приглашение ── */}
      {inviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(61,43,26,0.5)", backdropFilter: "blur(6px)" }}
          onClick={() => setInviteOpen(false)}
        >
          <div
            className="relative max-w-md w-full rounded-2xl p-8 text-center animate-scale-in max-h-[90vh] overflow-y-auto"
            style={{ background: "var(--wedding-cream)", boxShadow: "0 24px 80px rgba(122,92,148,0.25)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setInviteOpen(false)}
              className="absolute top-4 right-4 text-2xl leading-none opacity-40 hover:opacity-80"
              style={{ color: "var(--wedding-dark)" }}
            >
              ×
            </button>
            <div className="text-3xl mb-4">✿</div>
            <p className="font-display italic text-sm mb-2" style={{ color: "var(--wedding-purple-dark)" }}>приглашение</p>
            <h2 className="font-display text-3xl mb-6" style={{ color: "var(--wedding-dark)", fontWeight: 300 }}>
              Дорогие родные и друзья!
            </h2>
            <p className="text-sm leading-relaxed font-light mb-4" style={{ color: "var(--wedding-brown)" }}>
              Мы рады пригласить вас на нашу свадьбу и будем счастливы провести этот день вместе с вами.
            </p>
            <p className="text-sm leading-relaxed font-light" style={{ color: "var(--wedding-brown)" }}>
              Этот день станет началом нашей семейной истории, и нам очень важно, чтобы рядом были самые близкие люди.
            </p>
            <div className="floral-divider my-6">
              <span style={{ color: "var(--wedding-purple)" }}>❁</span>
            </div>
            <p className="font-display italic text-lg" style={{ color: "var(--wedding-purple-dark)" }}>
              Алина & Павел
            </p>
          </div>
        </div>
      )}

      {/* ── ФОТО ПАРЫ (большое) ── */}
      <Section>
        <div className="px-4 md:px-8 py-16 max-w-3xl mx-auto relative z-10">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 16px 60px rgba(184,164,201,0.3)" }}
          >
            <img
              src="https://cdn.poehali.dev/files/5ee4ed04-1ac4-4284-837c-6cf53bc8f868.jpg"
              alt="Алина и Павел"
              className="w-full object-cover max-h-[600px]"
              style={{ objectPosition: "center top" }}
            />
          </div>
        </div>
      </Section>

      {/* ── ДАТА И МЕСТО ── */}
      <Section>
        <section className="py-20 px-6 relative z-10">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-10 text-center"
            style={{ background: "var(--wedding-purple-light)", boxShadow: "0 8px 40px rgba(184,164,201,0.2)" }}
          >
            <p className="font-display italic text-sm mb-2" style={{ color: "var(--wedding-purple-dark)" }}>место и время</p>
            <h2
              className="font-display text-4xl md:text-5xl mb-8"
              style={{ color: "var(--wedding-dark)", fontWeight: 300 }}
            >
              Дата и место
            </h2>

            <FloralDivider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📅</div>
                <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--wedding-purple-dark)" }}>Дата</p>
                <p className="font-display text-3xl" style={{ color: "var(--wedding-dark)", fontWeight: 400 }}>19.09.2026</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📍</div>
                <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--wedding-purple-dark)" }}>Место</p>
                <p className="font-display text-xl font-semibold mb-1" style={{ color: "var(--wedding-dark)" }}>Банкетный зал «Камелия»</p>
                <p className="text-sm font-light" style={{ color: "var(--wedding-brown)" }}>г. Тамбов, ул. Чкалова, 10А</p>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ── ПРОГРАММА ── */}
      <Section>
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <p className="font-display italic text-sm mb-2" style={{ color: "var(--wedding-purple-dark)" }}>расписание</p>
            <h2
              className="font-display text-4xl md:text-5xl mb-12"
              style={{ color: "var(--wedding-dark)", fontWeight: 300 }}
            >
              Программа дня
            </h2>

            <div className="space-y-0">
              {[
                { time: "14:00", event: "Сбор гостей" },
                { time: "15:00", event: "Выездная регистрация" },
                { time: "16:00", event: "Начало банкета" },
                { time: "22:00", event: "Завершение вечера" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div
                    className="flex items-center gap-6 py-5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: i % 2 === 0 ? "var(--wedding-beige)" : "transparent" }}
                  >
                    <span
                      className="font-display text-2xl md:text-3xl min-w-[80px] text-right"
                      style={{ color: "var(--wedding-purple)", fontWeight: 300 }}
                    >
                      {item.time}
                    </span>
                    <div
                      className="w-px h-8 flex-shrink-0"
                      style={{ background: "var(--wedding-purple-light)" }}
                    />
                    <span
                      className="text-sm md:text-base text-left font-light"
                      style={{ color: "var(--wedding-dark)" }}
                    >
                      {item.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ── ДРЕСС-КОД ── */}
      <Section>
        <section className="py-20 px-6 relative z-10">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-10 text-center"
            style={{ background: "var(--wedding-beige)" }}
          >
            <p className="font-display italic text-sm mb-2" style={{ color: "var(--wedding-purple-dark)" }}>дресс-код</p>
            <h2
              className="font-display text-4xl md:text-5xl mb-6"
              style={{ color: "var(--wedding-dark)", fontWeight: 300 }}
            >
              Дресс-код
            </h2>
            <p className="text-sm font-light mb-10 max-w-md mx-auto" style={{ color: "var(--wedding-brown)" }}>
              Мы будем благодарны, если вы поддержите атмосферу праздника и выберете наряды в нежных оттенках:
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Бежевый", color: "#e8d5bc" },
                { name: "Кремовый", color: "#fdf6ee" },
                { name: "Коричневый", color: "#8b6f47" },
                { name: "Пудровый", color: "#e8dff0" },
              ].map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-full"
                    style={{
                      background: c.color,
                      border: "2px solid var(--wedding-warm)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                    }}
                  />
                  <span className="text-xs font-light" style={{ color: "var(--wedding-brown)" }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ── ВАЖНАЯ ИНФОРМАЦИЯ ── */}
      <Section>
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-xl mx-auto">
            <p className="font-display italic text-sm mb-2 text-center" style={{ color: "var(--wedding-purple-dark)" }}>важно знать</p>
            <h2
              className="font-display text-4xl md:text-5xl mb-12 text-center"
              style={{ color: "var(--wedding-dark)", fontWeight: 300 }}
            >
              Важная информация
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: "🌸",
                  text: "Мы очень любим детей, но в этот день просим вас прийти без малышей, чтобы все могли полностью насладиться праздником.",
                },
                {
                  icon: "🎁",
                  text: "Пожеланий по подаркам нет — для нас главное ваше присутствие и хорошее настроение.",
                },
                {
                  icon: "💌",
                  text: "Если вы планируете прийти со своей второй половинкой, пожалуйста, заранее сообщите нам об этом.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-xl"
                  style={{ background: "var(--wedding-purple-light)" }}
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm leading-relaxed font-light" style={{ color: "var(--wedding-dark)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ── ФИНАЛЬНЫЙ БЛОК ── */}
      <Section>
        <section className="py-24 px-6 text-center relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="text-4xl mb-8 animate-float">❀</div>

            <div
              className="rounded-2xl p-10 md:p-16"
              style={{
                background: "linear-gradient(135deg, var(--wedding-purple-light) 0%, var(--wedding-beige) 100%)",
                boxShadow: "0 16px 60px rgba(184,164,201,0.3)"
              }}
            >
              <p
                className="font-display text-2xl md:text-3xl mb-4 leading-relaxed"
                style={{ color: "var(--wedding-dark)", fontWeight: 300, fontStyle: "italic" }}
              >
                Будем с нетерпением ждать встречи с вами
                <br />в наш особенный день ❤️
              </p>

              <FloralDivider />

              <p
                className="font-display text-3xl md:text-4xl"
                style={{ color: "var(--wedding-purple-dark)", fontWeight: 400, fontStyle: "italic" }}
              >
                Алина и Павел
              </p>

              <p
                className="mt-4 text-sm font-light tracking-widest"
                style={{ color: "var(--wedding-brown)" }}
              >
                19 · 09 · 2026
              </p>
            </div>
          </div>
        </section>
      </Section>

    </main>
  );
}
