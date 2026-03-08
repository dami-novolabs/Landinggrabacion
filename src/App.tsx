import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play, ShieldCheck, Clock, Lock, ArrowRight, CheckCircle2, X } from "lucide-react";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pressLogo1 from 'figma:asset/703b5dedebffe029a7e02674bb9d9e555c683cd0.png';
import pressLogo2 from 'figma:asset/d399663dc68a8a2b9a5d52ff995252cfd2750bae.png';
import pressLogo3 from 'figma:asset/5e56563d4d2f43f6cacabbb74f2e241e7a5e1c1d.png';
import pressLogo4 from 'figma:asset/4150b3abe68230ad8c1124084a7d8f1b488b88f1.png';
import novolabsLogo from 'figma:asset/52020c0a501af2e202886d2601d951fdf3071574.png';
import teamPhoto from 'figma:asset/5a15fe1da9b7489ca2a2c6f39770b1897ac76942.png';

/**
 * NOVOLABS – Masterclass Access Landing
 * Single-file React component with TailwindCSS, Motion, and lucide-react.
 * Brand tokens: Thunder + Satoshi, Rojo #FF3A20, Verde Neón #D4FF78, Background #111111, Light Grey #F4F4F4.
 * Sections: Nav → Hero → Access → FOMO Footer.
 * Email-only access that redirects to masterclass video page.
 */

export default function MasterclassLanding() {
  const emailInputRef = useRef(null);

  const scrollToEmailInput = () => {
    // Primero hacer scroll suave hasta la sección
    document.getElementById('acceso')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    // Después de un pequeño delay, enfocar el input
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 800);
  };

  return (
    <div
      className="min-h-screen bg-[rgba(0,0,0,1)] text-white antialiased [--brand-rojo:#FF3A20] [--brand-neon:#D4FF78] [--bg:#111111] [--grey:#F4F4F4] selection:bg-[var(--brand-neon)] selection:text-black"
      data-testid="root"
    >
      <Noise />
      <Nav />
      <Hero onCtaClick={scrollToEmailInput} />
      <Access emailInputRef={emailInputRef} />
      <FomoFooter />
    </div>
  );
}

/* ---------------------------- UI – Partials ---------------------------- */
function Nav() {
  const prefersReduced = useReducedMotion();
  return (
    <div
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10 bg-[rgba(0,0,0,0.85)]"
      data-testid="nav"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-4">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center"
        >
          <ImageWithFallback 
            src={novolabsLogo} 
            alt="NOVOLABS" 
            className="h-6 md:h-8 w-auto" 
          />
        </motion.div>
        
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: -10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <p className="hidden md:block text-xs text-white/70 whitespace-nowrap">
            Desde 2019 ayudando a emprendedores de Latinoamérica
          </p>
          <p className="block md:hidden text-xs text-white/70 whitespace-nowrap">
            Desde 2019 ayudando a Emprendedores
          </p>
        </motion.div>
        
        <div className="flex justify-end">

        </div>
      </div>
    </div>
  );
}

function Hero({ onCtaClick }) {
  const prefersReduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[rgba(0,0,0,1)]" data-testid="hero">
      <GradientOrbs />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div className="text-center md:text-left">
          <motion.h1
            initial={prefersReduced ? {} : { y: 20, opacity: 0 }}
            whileInView={prefersReduced ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl leading-[1.1] md:text-6xl font-bold"
          >
            Aprende a lanzar tu proyecto y conseguir los <span className="text-[var(--brand-neon)] text-[64px]">primeros clientes</span>
            <span className="block text-xl font-normal text-white/70 md:text-2xl mt-4">
              Aplica los 6 pasos del Sistema de Validación Paga™ para evitar malgastar tiempo y dinero en construir cosas que nadie te quiera comprar.<br className="hidden md:block" />  <span className="font-bold text-[var(--brand-rojo)]">Disponible sólo por 7 días</span>.
            </span>
          </motion.h1>

          {/* Rating para mobile - aparece solo en mobile debajo del subheadline */}
          <div className="block md:hidden mt-4 text-center text-white/90">
            <span className="text-[var(--brand-neon)]">4.7 ⭐️</span>
            <span> basado en 2187 reviews</span>
          </div>

          <div className="mt-8 hidden md:flex flex-wrap items-center gap-4 text-white/80">
            <Badge icon={<ShieldCheck className="size-3.5" />}>100% práctico</Badge>
            <Badge icon={<Clock className="size-3.5" />}>Recursos y plantillas</Badge>
            <Badge icon={<Lock className="size-3.5" />}>Explicación paso a paso</Badge>
          </div>

          {/* CTA para desktop solamente */}
          <div className="mt-8 hidden md:flex items-center gap-4">
            <motion.button
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-rojo)] px-6 py-3 font-medium shadow-[0_12px_40px_-10px_rgba(255,58,32,0.6)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_60px_-10px_rgba(255,58,32,0.7)] w-full md:w-auto"
              animate={{ 
                rotate: [0, 1, 0, -1, 0] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut" 
              }}
            >
              Quiero la grabación <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </motion.button>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-white/90">
              <span className="text-[var(--brand-neon)]">4.7 ⭐️</span>
              <span>basado en 2187 reviews</span>
            </div>
          </div>

          <TrustBar className="mt-10" />
        </div>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-black/70 relative">
              <ImageWithFallback 
                src={teamPhoto}
                alt="NOVOLABS Alumni en Latinoamérica" 
                className="absolute inset-0 h-full w-full object-cover" 
              />
              
              {/* Badge EST. 2019 - Top Right */}
              <div className="absolute top-2 right-2 rounded-full bg-[var(--brand-neon)] px-3 py-1 text-sm font-medium text-black hidden md:block">
                EST. 2019
              </div>
              
              {/* Badge 300+ Alumni - Bottom Left */}
              <div className="absolute bottom-2 left-2 rounded-full bg-[var(--brand-rojo)] px-3 py-1 text-sm font-medium text-white hidden md:block">
                300+ Alumni en LATAM
              </div>
              
              {/* Overlay gradient for better badge visibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-28 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* CTA para mobile - aparece después de la imagen en zona del pulgar */}
        <div className="mt-6 block md:hidden">
          <motion.button
            onClick={onCtaClick}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-rojo)] px-6 py-3 font-medium shadow-[0_12px_40px_-10px_rgba(255,58,32,0.6)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_60px_-10px_rgba(255,58,32,0.7)] w-full"
            animate={{ 
              rotate: [0, 1, 0, -1, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut" 
            }}
          >
            Quiero la grabación <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </motion.button>
        </div>

        {/* Trust bar mobile - aparece después del CTA como validación final */}
        <MobileTrustBar className="mt-6 block md:hidden" />
      </div>
    </section>
  );
}

// Helper function to calculate deadline: 7 days from the most recent Wednesday
// Resets every Wednesday at midnight
function getNextMasterclassDeadline() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Calculate days since the most recent Wednesday (3)
  // If today is Wednesday (3), days since = 0
  // If today is Thursday (4), days since = 1
  // If today is Sunday (0), days since = 4
  let daysSinceWednesday;
  if (currentDay >= 3) {
    // Wednesday to Saturday
    daysSinceWednesday = currentDay - 3;
  } else {
    // Sunday to Tuesday
    daysSinceWednesday = currentDay + 4;
  }
  
  // Get the most recent Wednesday at midnight
  const lastWednesday = new Date(now);
  lastWednesday.setDate(now.getDate() - daysSinceWednesday);
  lastWednesday.setHours(0, 0, 0, 0);
  
  // The deadline is 7 days after the most recent Wednesday
  const deadline = new Date(lastWednesday);
  deadline.setDate(lastWednesday.getDate() + 7);
  
  return deadline.getTime();
}

function Access({ emailInputRef }) {
  return (
    <section id="acceso" className="relative isolate py-16 sm:py-24 bg-[rgba(0,0,0,1)]" data-testid="access-section">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
            <h2 className="mb-2 text-3xl font-bold text-[24px]">Ingresa tu email</h2>

            <AccessForm emailInputRef={emailInputRef} />

          </div>

          <div className="order-first md:order-none">
            <h3 className="mb-6 text-2xl font-bold">350+ personas ya lanzaron su proyecto al mercado con Novolabs</h3>

            <Countdown />
            <ul className="mt-6 space-y-3 text-white/80" id="resumen">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-[var(--brand-neon)]" />
                Contenido 100% práctico.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-[var(--brand-neon)]" />
                Metodología explicada paso a paso.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 text-[var(--brand-neon)]" />
                Casos reales y errores costosos que debes evitar.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}



function FomoFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[rgba(0,0,0,0.85)]" data-testid="footer">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <ImageWithFallback 
              src={novolabsLogo} 
              alt="NOVOLABS" 
              className="h-8 w-auto" 
            />
          </div>

          {/* Copyright - Centro en desktop, abajo en móvil */}
          <div className="flex-1 text-center order-last md:order-none">
            <p className="text-sm text-white/60">
              © 2025 Novolabs. Todos los derechos reservados.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 md:gap-8">
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Términos
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Privacidad
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Soporte
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- UI – Widgets ---------------------------- */
function Badge({ children, icon, className = "" }) {
  return null;
}

function TrustBar({ className = "" }) {
  return (
    <div className={`hidden md:flex items-center gap-6 opacity-70 ${className}`} data-testid="trust-bar">
      <span className="text-sm text-white/60">Mencionados en:</span>
      <div className="flex flex-wrap items-center gap-6">
        <div className="h-6 w-20 rounded flex items-center justify-center" aria-label="logo">
          <ImageWithFallback 
            src={pressLogo1} 
            alt="Press logo" 
            className="h-full w-full object-contain filter brightness-75 opacity-80" 
          />
        </div>
        <div className="h-6 w-20 rounded flex items-center justify-center" aria-label="logo">
          <ImageWithFallback 
            src={pressLogo2} 
            alt="Press logo" 
            className="h-full w-full object-contain filter brightness-75 opacity-80" 
          />
        </div>
        <div className="h-6 w-20 rounded flex items-center justify-center" aria-label="logo">
          <ImageWithFallback 
            src={pressLogo3} 
            alt="Press logo" 
            className="h-full w-full object-contain filter brightness-75 opacity-80" 
          />
        </div>

      </div>
    </div>
  );
}

function MobileTrustBar({ className = "" }) {
  return (
    <div className={`opacity-70 ${className}`} data-testid="mobile-trust-bar">
      <div className="text-center mb-4">
        <span className="text-sm text-white/60">Mencionados en:</span>
      </div>
      
      {/* Contenedor del carrusel con overflow hidden */}
      <div className="relative overflow-hidden">
        {/* Carrusel infinito */}
        <motion.div
          className="flex items-center gap-8"
          animate={{
            x: [0, -240] // Se mueve 240px hacia la izquierda (80px por logo x 3)
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          {/* Primer set de logos */}
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo1} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo2} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo3} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
          
          {/* Segundo set de logos para efecto infinito */}
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo1} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo2} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
          <div className="h-6 w-20 rounded flex items-center justify-center flex-shrink-0" aria-label="logo">
            <ImageWithFallback 
              src={pressLogo3} 
              alt="Press logo" 
              className="h-full w-full object-contain filter brightness-75 opacity-80" 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HeroVideoPoster() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <ImageWithFallback 
        src="https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hc3RlcmNsYXNzJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc1ODY0NTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Masterclass preview" 
        className="absolute inset-0 h-full w-full object-cover opacity-60" 
      />
      <button
        className="group relative z-10 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Ver trailer"
      >
        <Play className="size-5" /> Ver trailer (0:37)
      </button>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,255,120,0.15),transparent_60%)]" />
    </div>
  );
}

function AccessForm({ emailInputRef }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState("");

  // Configuración de Go High Level
  const GHL_API_KEY = "pit-b2107279-2ee7-4398-918d-3fd09dd9a600";
  const GHL_LOCATION_ID = "PjecH8ovrX0BCLpqqwXi";
  const GHL_API_BASE = "https://services.leadconnectorhq.com";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorPopup(false);
    setErrorMessage("");
    setFormError("");
    
    // Validación básica de email
    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Ingresa un correo válido");
      setShowErrorPopup(true);
      setLoading(false);
      return;
    }

    const userEmail = email.trim().toLowerCase();

    try {
      console.log("🚀 Iniciando proceso para:", userEmail);

      const newTag = "Masterclass - vio grabación";

      // ESTRATEGIA: Intentar crear directamente, y si falla por duplicado, actualizar
      console.log("🆕 Intentando crear contacto...");

      const createResponse = await fetch(
        `${GHL_API_BASE}/contacts/`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GHL_API_KEY}`,
            "Version": "2021-07-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            locationId: GHL_LOCATION_ID,
            tags: [newTag],
            source: "Masterclass Landing Page",
          }),
        }
      );

      console.log("📊 Status de creación:", createResponse.status);
      const createText = await createResponse.text();
      console.log("📄 Respuesta de creación:", createText);

      if (createResponse.ok) {
        // CASO 1: Contacto creado exitosamente
        console.log("✅ Contacto nuevo creado exitosamente");
      } else if (createResponse.status === 400 && createText.includes("contactId")) {
        // CASO 2: Contacto ya existe - extraer ID y actualizar tags
        console.log("⚠️ Contacto duplicado detectado, extrayendo ID...");
        
        const errorData = JSON.parse(createText);
        const duplicateContactId = errorData.meta?.contactId || errorData.contactId;
        
        console.log("🔍 ID del contacto existente:", duplicateContactId);
        
        if (duplicateContactId) {
          // Primero obtener el contacto para ver sus tags actuales
          console.log("📥 Obteniendo datos del contacto...");
          
          const getResponse = await fetch(
            `${GHL_API_BASE}/contacts/${duplicateContactId}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${GHL_API_KEY}`,
                "Version": "2021-07-28",
              },
            }
          );

          console.log("📊 Status GET contacto:", getResponse.status);
          const getText = await getResponse.text();
          console.log("📄 Respuesta GET contacto:", getText);

          if (getResponse.ok) {
            const contactData = JSON.parse(getText);
            const existingTags = contactData.contact?.tags || [];
            
            console.log("📋 Tags actuales del contacto:", existingTags);
            
            // Agregar el nuevo tag solo si no lo tiene
            if (existingTags.includes(newTag)) {
              console.log("ℹ️ El contacto ya tiene el tag");
            } else {
              const updatedTags = [...existingTags, newTag];
              
              console.log("🏷️ Tags que se van a actualizar:", updatedTags);
              
              // Actualizar el contacto con los tags
              const updateResponse = await fetch(
                `${GHL_API_BASE}/contacts/${duplicateContactId}`,
                {
                  method: "PUT",
                  headers: {
                    "Authorization": `Bearer ${GHL_API_KEY}`,
                    "Version": "2021-07-28",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    tags: updatedTags,
                  }),
                }
              );

              console.log("📊 Status actualización tags:", updateResponse.status);
              const updateText = await updateResponse.text();
              console.log("📄 Respuesta actualización tags:", updateText);

              if (updateResponse.ok) {
                console.log("��� Tags actualizados exitosamente");
              } else {
                console.error("⚠️ Error actualizando tags");
              }
            }
          } else {
            console.error("⚠️ Error obteniendo datos del contacto");
          }
        }
      } else {
        // CASO 3: Otro tipo de error
        console.error("⚠️ Error inesperado:", createText);
      }

      // PASO 3: Redirigir a la masterclass
      console.log("🎉 Proceso completado, redirigiendo a masterclass");
      setTimeout(() => {
        window.location.href = "https://ver-masterclass.novolabs.xyz/";
      }, 500);

    } catch (error) {
      console.error("❌ Error en la integración con Go High Level:", error);
      setFormError("Error en el formulario");
      setErrorMessage("Hubo un problema al procesar tu solicitud. Intenta nuevamente.");
      setShowErrorPopup(true);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" data-testid="access-form">
        <div>
          <input
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elon@marte.com"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 outline-none transition placeholder:text-white/40 focus:border-white/30"
            aria-label="email"
            required
          />
          {formError && (
            <p className="mt-2 text-sm text-[var(--brand-rojo)]">{formError}</p>
          )}
        </div>
        <motion.button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-rojo)] px-6 py-3 font-medium shadow-[0_12px_40px_-10px_rgba(255,58,32,0.6)] transition hover:translate-y-[-1px] disabled:opacity-60"
          disabled={loading}
          animate={{ 
            rotate: [0, 1, 0, -1, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut" 
          }}
        >
          {loading ? "Accediendo…" : "Acceder a la Grabación"}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </motion.button>
        <p className="text-xs text-white/50">
          Al ingresar tu email accedes inmediatamente a la grabación completa de la masterclass. Eso son 3+ horas de contenido práctico sobre emprendimiento y startups.
        </p>
      </form>

      <ErrorPopup 
        isOpen={showErrorPopup} 
        onClose={() => setShowErrorPopup(false)}
        message={errorMessage}
      />
    </>
  );
}

function Countdown({ size = "lg" }) {
  const [deadline, setDeadline] = useState(() => getNextMasterclassDeadline());
  const [now, setNow] = useState(Date.now());
  
  useEffect(() => {
    const t = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      
      // If deadline has passed, recalculate to get next Wednesday's deadline
      if (currentTime >= deadline) {
        setDeadline(getNextMasterclassDeadline());
      }
    }, 1000);
    return () => clearInterval(t);
  }, [deadline]);
  
  const remaining = Math.max(0, deadline - now);
  const d = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const h = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const s = Math.floor((remaining % (60 * 1000)) / 1000);

  const txt = `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 ${size === "sm" ? "text-sm" : "text-lg"}`}
      data-testid="countdown"
    >
      <Clock className={`opacity-80 ${size === "sm" ? "size-4" : "size-5"}`} />
      <span className="tabular-nums font-mono">{txt}</span>
    </div>
  );
}



function GradientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[var(--brand-neon)]/20 blur-[80px]" />
      <div className="absolute -right-16 top-10 h-[22rem] w-[22rem] rounded-full bg-[var(--brand-rojo)]/25 blur-[90px]" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  );
}



function ErrorPopup({ isOpen, onClose, message = "Ingresa un correo válido" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-[#111111] p-6 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>

        {/* Content */}
        <div className="text-center">
          <p className="text-white/90">{message}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Noise() {
  const noiseSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5"/></svg>`;
  
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] mix-blend-soft-light">
      <div className="h-full w-full" style={{ backgroundImage: `url('${noiseSvg}')` }} />
    </div>
  );
}
