import { createI18n } from "vue-i18n";
// import { Traductor } from "@/services/translationApi";

// const traductor = new Traductor(import.meta.env.VITE_DEFAULT_LOCALE);

export default createI18n({
	locale: import.meta.env.VITE_DEFAULT_LOCALE,
	fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
	legacy: false, // Use Composition API,
	globalInjection: true, // Enable global injection of i18n methods
	// messages: traductor.traducciones as Record<string, Record<string, string>>,
	messages: {},
})