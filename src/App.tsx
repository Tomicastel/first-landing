import { useEffect, useState } from "react";
import { business, membershipPlans } from "./data/business";

type IconName = "bolt" | "clock" | "barbell" | "heart" | "arrow" | "instagram" | "play" | "menu" | "close";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24", "aria-hidden": true };
  const icons: Record<IconName, React.ReactNode> = {
    bolt: <path d="M13 2 4.5 13h6L10.8 22 19.5 10h-6L13 2Z" />,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
    barbell: <><path d="M5 8v8M8 6v12M16 6v12M19 8v8M8 12h8" /></>,
    heart: <path d="M20 8.6c0 5-8 10.1-8 10.1S4 13.6 4 8.6A4.1 4.1 0 0 1 11 5.7L12 7l1-1.3A4.1 4.1 0 0 1 20 8.6Z" />,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.4" cy="6.7" r=".7" fill="currentColor" stroke="none" /></>,
    play: <path d="m9.5 7 7 5-7 5V7Z" fill="currentColor" stroke="none" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg {...common}>{icons[name]}</svg>;
}

const nav = [
  { label: "Programas", href: "#programas" },
  { label: "Horarios", href: "#horarios" },
  { label: "Membresías", href: "#membresias" },
  { label: "Entrenadores", href: "#entrenadores" },
  { label: "Contacto", href: "#contacto" },
];
const mapUrl = "https://www.google.com/maps/search/?api=1&query=Balcarce+1230%2C+Rosario%2C+Santa+Fe";
const scheduleRows = [
  { time: "06:30", classes: ["CrossFit", "Open Gym", "CrossFit", "Open Gym", "CrossFit", "—"] },
  { time: "07:30", classes: ["—", "Funcional", "—", "Funcional", "—", "CrossFit"] },
  { time: "12:30", classes: ["HIIT", "CrossFit", "HIIT", "CrossFit", "HIIT", "Funcional"] },
  { time: "18:30", classes: ["CrossFit", "Fuerza", "CrossFit", "Fuerza", "CrossFit", "—"] },
  { time: "19:30", classes: ["Fuerza", "HIIT", "Fuerza", "HIIT", "Open Gym", "—"] },
];
const scheduleDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const benefits = [
  { icon: "clock" as IconName, number: "01", title: "Acceso 24/7", text: "Tu disciplina no entiende de horarios. Entrena cuando el foco esté contigo." },
  { icon: "barbell" as IconName, number: "02", title: "Equipo de élite", text: "Rigs, plataformas y máquinas de precisión para cada objetivo." },
  { icon: "bolt" as IconName, number: "03", title: "Coaches certificados", text: "Método, técnica y exigencia real para elevar tu estándar." },
  { icon: "heart" as IconName, number: "04", title: "Recovery lab", text: "Sauna, movilidad y recuperación para volver más fuerte mañana." },
];

const programs = [
  { name: "CrossFit", level: "ALTA INTENSIDAD", duration: "60 MIN", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85", description: "La sesión insignia: fuerza, resistencia y comunidad." },
  { name: "Musculación", level: "FUERZA", duration: "75 MIN", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85", description: "Construye fuerza con progresiones medibles y guiadas." },
  { name: "HIIT", level: "MÁXIMO RITMO", duration: "45 MIN", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85", description: "Intervalos explosivos, resultados que se sienten." },
  { name: "Funcional", level: "TODOS LOS NIVELES", duration: "50 MIN", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=85", description: "Muévete mejor para rendir fuera y dentro del box." },
];

const coaches = [
  { name: "Mara Costa", role: "Head Coach · CrossFit L3", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=85" },
  { name: "Leo Ruiz", role: "Strength & Conditioning", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=85" },
  { name: "Nora Vidal", role: "Olympic Weightlifting", image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=85" },
];

export default function App() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const program = programs[activeProgram];

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("#main-content section");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const images = document.querySelectorAll<HTMLImageElement>("#main-content img");
    images.forEach((image, index) => {
      image.decoding = "async";
      if (index === 0) {
        image.loading = "eager";
        image.fetchPriority = "high";
      } else {
        image.loading = "lazy";
      }
    });

    const mapLink = document.querySelector<HTMLAnchorElement>('a[href="https://maps.google.com"]');
    if (mapLink) mapLink.href = mapUrl;

    document.querySelectorAll<HTMLAnchorElement>("#main-content a").forEach((link) => {
      if (!link.textContent?.trim() && link.querySelector("svg") && !link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", "Más información");
      }
    });

    const schedule = document.querySelector<HTMLTableElement>("#horarios table");
    if (schedule) {
      if (!schedule.caption) {
        const caption = document.createElement("caption");
        caption.className = "sr-only";
        caption.textContent = "Horarios semanales de clases";
        schedule.prepend(caption);
      }
      schedule.querySelectorAll("thead th").forEach((cell) => cell.setAttribute("scope", "col"));
      schedule.querySelectorAll("tbody th").forEach((cell) => cell.setAttribute("scope", "row"));
      schedule.querySelectorAll("tbody td").forEach((cell) => {
        if (cell.textContent?.trim() === "—") cell.setAttribute("aria-label", "Sin clase programada");
      });
    }

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#0f0f11] text-white selection:bg-[#d4ff00] selection:text-black">
      <div className="mx-auto max-w-[1440px] border-x border-white/10">
        <header className="relative z-30 flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
          <a href="#inicio" className="flex items-center gap-2.5 text-lg font-black tracking-[-0.08em]" aria-label={`${business.name} inicio`}><span className="grid size-8 place-items-center bg-[#d4ff00] text-black">A</span>{business.shortName}<span className="font-light text-white/40">/FITNESS</span></a>
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Navegación principal">{nav.map((item) => <a className="text-[11px] font-bold uppercase tracking-[.12em] text-white/65 transition-colors duration-200 hover:text-[#d4ff00]" href={item.href} key={item.label}>{item.label}</a>)}</nav>
          <a href="#prueba" className="hidden bg-[#d4ff00] px-5 py-3 text-[11px] font-black uppercase tracking-[.12em] text-black transition duration-200 hover:-translate-y-0.5 hover:bg-white lg:block">Prueba gratis <span className="ml-2">↗</span></a>
          <button type="button" className="transition-transform duration-200 hover:text-[#d4ff00] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}><Icon name={menuOpen ? "close" : "menu"} className="size-6" /></button>
          <div id="mobile-menu" aria-hidden={!menuOpen} data-menu-open={menuOpen} className="mobile-menu absolute inset-x-0 top-full border-b border-white/10 bg-[#0f0f11] p-6 lg:hidden"><nav className="grid gap-5" aria-label="Navegación móvil">{nav.map((item) => <a onClick={closeMenu} className="text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:text-[#d4ff00]" href={item.href} key={item.label}>{item.label}</a>)}<a onClick={closeMenu} href="#prueba" className="mt-2 bg-[#d4ff00] px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-black transition duration-200 hover:bg-white">Prueba gratis</a></nav></div>
        </header>

         <section id="inicio" data-reveal="hero" className="relative min-h-[780px] border-b border-white/10 px-6 pb-12 pt-20 lg:px-10 lg:pt-28">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          <div className="absolute right-0 top-0 h-full w-[49%] bg-gradient-to-l from-black/45 via-black/25 to-transparent" />
           <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1300&q=90" alt="Atleta entrenando con pesas" loading="eager" fetchPriority="high" decoding="async" className="absolute inset-y-0 right-0 -z-0 h-full w-[56%] object-cover object-center opacity-80 grayscale" />
          <div className="absolute inset-y-0 right-0 w-[58%] bg-gradient-to-r from-[#0f0f11] via-[#0f0f11]/35 to-transparent" />
          <div className="relative z-10 grid max-w-4xl gap-8">
              <p data-reveal-delay="1" className="flex items-center gap-3 font-mono text-[10px] font-bold tracking-[.2em] text-[#d4ff00]"><span className="size-2 rounded-full bg-[#d4ff00]" /> ROSARIO · EST. 2017</p>
             <h1 data-reveal-delay="2" className="max-w-4xl font-display text-[clamp(2.75rem,10vw,9.5rem)] font-black uppercase leading-[.78] tracking-[-.09em]">No entrenes.<br /><span className="text-[#d4ff00]">Trasciende.</span></h1>
             <p data-reveal-delay="3" className="max-w-md text-base leading-7 text-white/70">Un espacio para quienes convierten la disciplina en una forma de vida. Entrenamiento de élite, sin atajos.</p>
              <div data-reveal-delay="4" className="flex flex-wrap gap-3"><a href={business.whatsappUrl} className="bg-[#d4ff00] px-7 py-4 text-xs font-black uppercase tracking-[.14em] text-black transition duration-200 hover:-translate-y-1 hover:bg-white">Empieza hoy <span className="ml-4">↗</span></a><a href="#programas" className="border border-white/30 px-7 py-4 text-xs font-black uppercase tracking-[.14em] transition duration-200 hover:border-[#d4ff00] hover:text-[#d4ff00]">Ver instalaciones <Icon name="play" className="ml-3 inline size-3" /></a></div>
          </div>
          <div className="relative z-10 mt-20 flex max-w-4xl flex-col justify-between gap-7 border-t border-white/15 pt-6 sm:flex-row sm:items-end lg:mt-28"><div><div className="text-3xl tracking-tight text-[#d4ff00]">★★★★★</div><p className="mt-2 text-xs font-semibold text-white/70">4.9/5 por más de 500 miembros</p></div><div className="sm:text-right"><p className="font-mono text-[10px] tracking-[.18em] text-white/45">PRÓXIMA CLASE</p><p className="mt-1 text-sm font-bold">CROSSFIT WOD <span className="ml-4 text-[#d4ff00]">18:30</span></p></div></div>
        </section>

        <section className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-label">01 / EL ESTÁNDAR</p><h2 className="section-title mt-4">Todo lo que necesitas.<br /><span className="text-white/35">Nada que no.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/55">Diseñamos cada metro cuadrado para que tu único límite sea el que decidas superar.</p></div>
          <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((benefit) => <article className="group min-h-64 border-b border-r border-white/10 p-6 transition hover:bg-[#1e1e24]" key={benefit.title}><div className="flex items-start justify-between"><Icon name={benefit.icon} className="size-7 text-[#d4ff00]" /><span className="font-mono text-[10px] text-white/30">{benefit.number}</span></div><h3 className="mt-16 text-lg font-bold tracking-tight">{benefit.title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{benefit.text}</p></article>)}</div>
        </section>

        <section id="programas" className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-10 flex items-end justify-between"><div><p className="section-label">02 / PROGRAMACIÓN</p><h2 className="section-title mt-4">Encuentra<br />tu pulso.</h2></div><p className="hidden max-w-xs text-sm text-white/55 md:block">Cuatro disciplinas. Un mismo objetivo: una versión de ti que no negocia.</p></div>
          <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
            <div className="grid content-start gap-1">{programs.map((item, index) => <button onClick={() => setActiveProgram(index)} className={`flex items-center justify-between border-b px-1 py-5 text-left transition ${activeProgram === index ? "border-[#d4ff00] text-[#d4ff00]" : "border-white/15 text-white/40 hover:text-white"}`} key={item.name}><span className="text-2xl font-black tracking-[-.06em]">{String(index + 1).padStart(2, "0")}. {item.name}</span><span className="font-mono text-[10px]">{activeProgram === index ? "ACTIVO ↗" : "+"}</span></button>)}</div>
            <article className="relative min-h-[420px] overflow-hidden rounded-xl bg-[#1e1e24] p-6 lg:p-8"><img src={program.image} alt={`Clase de ${program.name}`} className="absolute inset-0 size-full object-cover opacity-55 grayscale transition duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/20 to-transparent" /><div className="relative flex h-full min-h-[370px] flex-col justify-between"><div className="flex gap-2"><span className="bg-[#d4ff00] px-3 py-1.5 font-mono text-[9px] font-bold tracking-wider text-black">{program.level}</span><span className="border border-white/35 px-3 py-1.5 font-mono text-[9px] font-bold tracking-wider">{program.duration}</span></div><div><h3 className="text-5xl font-black uppercase tracking-[-.07em] md:text-7xl">{program.name}</h3><div className="mt-5 flex items-end justify-between gap-8"><p className="max-w-sm text-sm leading-6 text-white/75">{program.description}</p><a href="#horarios" className="shrink-0 rounded-full border border-white/40 p-3 transition hover:border-[#d4ff00] hover:bg-[#d4ff00] hover:text-black"><Icon name="arrow" className="size-5" /></a></div></div></div></article>
          </div>
        </section>

        <section id="horarios" className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-label">03 / HORARIOS</p><h2 className="section-title mt-4">Tu semana,<br /><span className="text-white/35">en movimiento.</span></h2></div><div className="max-w-xs"><p className="text-sm leading-6 text-white/55">Consulta la planilla semanal y encuentra el momento que te haga volver más fuerte.</p><div className="mt-4 flex gap-4 font-mono text-[9px] font-bold tracking-widest text-white/50"><span><i className="mr-1.5 inline-block size-2 bg-[#d4ff00]" />CLASE</span><span><i className="mr-1.5 inline-block size-2 border border-white/35" />OPEN GYM</span></div></div></div>
          <div className="overflow-x-auto border border-white/10 bg-[#1e1e24]"><table className="min-w-[780px] w-full border-collapse text-left"><thead><tr className="border-b border-white/10"><th className="w-24 px-5 py-4 font-mono text-[10px] font-medium tracking-[.15em] text-white/40">HORA</th>{scheduleDays.map((day, index) => <th key={day} className={`border-l border-white/10 px-5 py-4 font-mono text-[10px] font-bold tracking-[.15em] ${index === 2 ? "bg-[#d4ff00] text-black" : "text-white/70"}`}>{day}<span className="ml-2 font-normal opacity-60">{18 + index}</span></th>)}</tr></thead><tbody>{scheduleRows.map((row) => <tr className="border-b border-white/10 last:border-0" key={row.time}><th className="px-5 py-3 font-display text-xl tracking-[-.06em] text-white/70">{row.time}</th>{row.classes.map((className, index) => <td className="border-l border-white/10 p-1.5" key={`${row.time}-${index}`}>{className === "—" ? <div className="grid h-14 place-items-center font-mono text-[10px] text-white/20">—</div> : <div className={`flex h-14 flex-col justify-center px-3 ${className === "CrossFit" || className === "HIIT" ? "bg-[#d4ff00] text-black" : "border border-white/15 bg-[#0f0f11] text-white"}`}><span className="text-xs font-extrabold tracking-tight">{className}</span><span className="mt-0.5 font-mono text-[8px] font-bold tracking-wide opacity-55">60 MIN</span></div>}</td>)}</tr>)}</tbody></table></div>
          <p className="mt-4 font-mono text-[9px] tracking-[.12em] text-white/40">* HORARIOS SUJETOS A CAMBIOS. CONSULTA EN RECEPCIÓN PARA CLASES ESPECIALES.</p>
        </section>

          <section id="membresias" className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28"><div className="mb-12 text-center"><p className="section-label">03 / MEMBRESÍAS</p><h2 className="section-title mt-4">Elige tu compromiso.</h2></div><div className="grid gap-4 lg:grid-cols-3">{membershipPlans.map((plan) => <article key={plan.name} className={`relative rounded-xl border p-7 lg:p-8 ${plan.accent ? "border-[#d4ff00] bg-[#d4ff00] text-black" : "border-white/15 bg-[#1e1e24]"}`}>{plan.accent && <span className="absolute right-6 top-0 -translate-y-1/2 bg-black px-3 py-1.5 font-mono text-[9px] font-bold tracking-widest text-[#d4ff00]">MÁS ELEGIDO</span>}<p className={`font-mono text-[10px] font-bold tracking-[.18em] ${plan.accent ? "text-black/60" : "text-white/45"}`}>{plan.name}</p><div className="mt-10 flex items-start"><span className="mt-3 text-xl">$</span><span className="text-7xl font-black tracking-[-.08em]">{plan.price}</span><span className={`mt-auto mb-3 text-xs ${plan.accent ? "text-black/60" : "text-white/50"}`}>/mes</span></div><ul className={`mt-9 grid gap-4 border-t pt-7 text-sm ${plan.accent ? "border-black/15" : "border-white/15 text-white/70"}`}>{plan.details.map((item) => <li className="flex gap-3" key={item}><span className="font-bold">✓</span>{item}</li>)}</ul><a href="#prueba" className={`mt-9 block py-4 text-center text-[11px] font-black uppercase tracking-[.13em] transition ${plan.accent ? "bg-black text-white hover:bg-white hover:text-black" : "border border-white/30 hover:border-[#d4ff00] hover:bg-[#d4ff00] hover:text-black"}`}>Elegir {plan.name}</a></article>)}</div></section>

        <section id="entrenadores" className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-label">04 / EL EQUIPO</p><h2 className="section-title mt-4">Te exigimos<br /><span className="text-white/35">porque creemos.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/55">No son animadores. Son atletas que estudian el movimiento y viven el proceso.</p></div><div className="grid gap-4 md:grid-cols-3">{coaches.map((coach) => <article className="group relative min-h-[400px] overflow-hidden rounded-xl bg-[#1e1e24]" key={coach.name}><img src={coach.image} alt={coach.name} className="absolute size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6"><div><h3 className="text-2xl font-bold tracking-tight">{coach.name}</h3><p className="mt-1 font-mono text-[10px] tracking-wide text-[#d4ff00]">{coach.role}</p></div><a href="#contacto" aria-label={`Instagram de ${coach.name}`} className="rounded-full border border-white/40 p-2.5 transition hover:border-[#d4ff00] hover:bg-[#d4ff00] hover:text-black"><Icon name="instagram" className="size-4" /></a></div></article>)}</div></section>

        <section className="border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28"><div className="mb-12"><p className="section-label">05 / VOCES DEL BOX</p><h2 className="section-title mt-4">La prueba está<br />en el progreso.</h2></div><div className="grid gap-4 lg:grid-cols-3">{[["Entré buscando ponerme en forma. Encontré una versión de mí que no sabía que existía.", "Lucía B.", "MIEMBRO DESDE 2022"], ["Aquí cada clase tiene intención. Los coaches saben exactamente cuándo apretarte y cuándo corregirte.", "Carlos M.", "MIEMBRO DESDE 2021"], ["El nivel de energía es contagioso. Es el único lugar al que llego cansada y salgo más fuerte.", "Elena R.", "MIEMBRO DESDE 2024"]].map(([quote, name, meta]) => <blockquote className="rounded-xl bg-[#1e1e24] p-7" key={name}><div className="text-xl tracking-[.18em] text-[#d4ff00]">★★★★★</div><p className="mt-8 text-xl font-medium leading-8 tracking-tight">“{quote}”</p><footer className="mt-10 border-t border-white/10 pt-4"><cite className="not-italic text-sm font-bold">{name}</cite><p className="mt-1 font-mono text-[9px] tracking-widest text-white/40">{meta}</p></footer></blockquote>)}</div></section>

         <section id="prueba" className="relative overflow-hidden bg-[#d4ff00] px-6 py-20 text-black lg:px-10 lg:py-28"><div className="absolute -right-5 -top-24 font-display text-[25rem] font-black leading-none tracking-[-.16em] text-black/10">A</div><div className="relative grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end"><div><p className="font-mono text-[10px] font-bold tracking-[.2em]">06 / TU PRIMER PASO</p><h2 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,7vw,7rem)] font-black uppercase leading-[.8] tracking-[-.09em]">Tu primera clase va por nuestra cuenta.</h2></div><div><p className="max-w-sm text-sm font-medium leading-6 text-black/65">Conoce el box, habla con un coach y prueba el método. Sin contratos. Sin excusas.</p><a href={business.emailUrl} className="mt-7 inline-block bg-black px-7 py-4 text-xs font-black uppercase tracking-[.14em] text-white transition hover:bg-white hover:text-black">Solicitar prueba <span className="ml-4">↗</span></a></div></div></section>

          <footer id="contacto" className="px-6 py-12 lg:px-10"><div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4"><div><a href="#inicio" className="text-xl font-black tracking-[-.1em]">{business.shortName}<span className="font-light text-white/40">/FITNESS</span></a><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Más que entrenar. Una práctica diaria de convertir potencial en rendimiento.</p></div><div><p className="footer-label">ENCUÉNTRANOS</p><p className="mt-4 text-sm leading-6 text-white/70">{business.address}</p><a className="mt-4 inline-block text-xs font-bold text-[#d4ff00]" href="https://maps.google.com" target="_blank" rel="noreferrer">ABRIR MAPA ↗</a></div><div><p className="footer-label">HORARIOS</p><p className="mt-4 text-sm leading-6 text-white/70">Lun–Vie · 06:00–22:30<br />Sábado · 08:00–14:00<br /></p></div><div><p className="footer-label">CONTACTO</p><a className="mt-4 block break-words text-sm text-white/70 hover:text-[#d4ff00]" href={business.emailUrl}>{business.email}</a><a className="mt-2 block text-sm text-white/70 hover:text-[#d4ff00]" href={business.whatsappUrl}>{business.phone}</a><div className="mt-5 flex gap-3"><a className="rounded-full border border-white/20 p-2 hover:border-[#d4ff00] hover:text-[#d4ff00]" href="#contacto"><Icon name="instagram" className="size-4" /></a><a className="rounded-full border border-white/20 px-3 py-2 text-[10px] font-bold hover:border-[#d4ff00] hover:text-[#d4ff00]" href="#contacto">TK</a></div></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[10px] font-medium tracking-wider text-white/35 sm:flex-row"><p>© 2026 {business.name.toUpperCase()}. TODOS LOS DERECHOS RESERVADOS.</p><div className="flex gap-5"><a href="#contacto">PRIVACIDAD</a><a href="#contacto">LEGALES</a><a href="#contacto">COOKIES</a></div></div><a href="#inicio" className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] text-[#d4ff00] transition hover:text-white" aria-label="Volver al inicio">VOLVER ARRIBA <span aria-hidden="true" className="text-base">↑</span></a></footer>
          <a href={business.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact Athletix Fitness on WhatsApp" title="Contact Athletix Fitness on WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,.35)] transition hover:scale-105 hover:bg-[#20bd5a] sm:bottom-6 sm:right-6">
            <svg aria-hidden="true" className="size-7" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.86 11.86 0 0 0 12.07 0C5.52 0 .19 5.33.19 11.88c0 2.09.55 4.13 1.59 5.92L.09 24l6.35-1.66a11.87 11.87 0 0 0 5.63 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.46-8.39Zm-8.43 18.2h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.85 9.85 0 0 1-1.5-5.17C2.19 6.45 6.62 2 12.07 2c2.64 0 5.12 1.03 6.98 2.9a9.84 9.84 0 0 1 2.9 6.99c0 5.45-4.43 9.81-9.88 9.81Zm5.4-7.36c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>
          </a>
      </div>
      </main>
    </>
  );
}
