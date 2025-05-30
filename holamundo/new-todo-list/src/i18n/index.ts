import { createI18n } from "vue-i18n";

const messages = {
	es: {
		nav: {
			web: "Página web",
			esUnaWeb: "Esto es una página web",
			es: "es",
			en: "en",
			acerca: "Acerca de",
			nueva: "Nueva",
			inicio: "Inicio",
		},
		home: {
			todoInpLabel: "Nueva tarea",
			prioritario: "Prioritario",
			crear: "Crear",
			todas: "Todas",
			pendientes: "Pendientes",
			completadas: "Completadas",
			prioritarias: "Prioritarias",
			creaNuevaTarea: "Crea una nueva tarea",
			quedanNPendientes: "Quedan <0>{n}</0> pendientes",
			todasCompletadas: "Todas las tareas están completadas",
		}
	},
	en: {
		nav: {
			web: "Website",
			esUnaWeb: "This is a website",
			es: "es",
			en: "en",
			acerca: "About",
			nueva: "New",
			inicio: "Home",
		},
		home: {
			todoInpLabel: "New task",
			prioritario: "Priority",
			crear: "Create",
			todas: "All",
			quedanNPendientes: "<0>{n}</0> tasks remaining",
			completadas: "Completed",
			prioritarias: "Priority",
			creaNuevaTarea: "Create a new task",
			quedan: "Remaining",
			todasCompletadas: "All tasks are completed",
		}
	}
}


export default createI18n({
	locale: import.meta.env.VITE_DEFAULT_LOCALE,
	fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
	legacy: false, // Use Composition API,
	globalInjection: true, // Enable global injection of i18n methods
	messages
})