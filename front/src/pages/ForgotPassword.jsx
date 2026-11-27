import { useState } from "react";
import { Link } from "react-router-dom";
import FondoToyStory from "../components/FondoToyStory";
import ToyStoreLogo from "../components/ToyStoreLogo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setCargando(true);
    setError("");

    const emailLimpio = String(email).trim().toLowerCase();

    try {
      let enviadoOk = false;
      try {
        const resVercel = await fetch("/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailLimpio }),
        });
        if (resVercel && resVercel.ok) {
          enviadoOk = true;
          const dataV = await resVercel.json().catch(() => ({}));
          setMensaje(dataV.message || `Hemos enviado las instrucciones para restablecer tu contraseña a ${emailLimpio}.`);
        }
      } catch (errApi) {
        console.warn("Fallo serverless Vercel forgot-password, intentando backend:", errApi.message);
      }

      if (!enviadoOk) {
        try {
          await fetch("/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailLimpio }),
          });
        } catch {
          // Continúa a pantalla de éxito
        }
        setMensaje(`Hemos enviado las instrucciones para restablecer tu contraseña a ${emailLimpio}. Revisa tu bandeja de entrada o spam.`);
      }

      setCargando(false);
    } catch {
      setCargando(false);
      setMensaje(`Hemos enviado las instrucciones para restablecer tu contraseña a ${emailLimpio}.`);
    }
  };

  return (
    <FondoToyStory>
      {/* Barra de carga */}
      {cargando && (
        <>
          <div className="top-loading-bar"></div>
          <div className="loader-overlay-minimal"></div>
        </>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">

        {/* Logo de Toy Store */}
        <ToyStoreLogo variant="new" scale={0.7} />

        <h2 className="text-xl font-bold text-gray-700 mb-2 border-b border-gray-100 pb-2">
          Recuperar contraseña
        </h2>

        {mensaje ? (
          <div className="flex flex-col items-center justify-center text-center py-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 border border-green-200">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <p className="text-gray-700 font-bold mb-6 text-sm">{mensaje}</p>
            <Link to="/login" className="w-full bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black py-3 rounded-xl transition text-base shadow-md block text-center uppercase tracking-wider">
              Volver al Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Ingresa el correo asociado a tu cuenta y te enviaremos instrucciones detalladas para restablecer tu acceso.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm border border-red-200 animate-pulse font-medium">
                  {error}
                </div>
              )}

              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-sky-300 rounded-xl p-3 mb-6 
                           focus:outline-none focus:border-[#1e3a8a] transition"
              />

              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] 
                           font-black py-3 rounded-xl transition text-base mb-4 shadow-md uppercase tracking-wider"
              >
                {cargando ? "Procesando..." : "Enviar instrucciones"}
              </button>

              <div className="text-center mt-2">
                <Link to="/login" className="text-sm text-sky-600 hover:underline flex items-center justify-center gap-1 font-semibold group">
                  <svg className="w-4 h-4 inline transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Volver al login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </FondoToyStory>
  );
}
