// src/composables/useLoadLocale.ts
import { ref }     from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchTranslations } from '@/services/translationApi'

export function useLoadLocale() {
  // pull the global composer methods & refs directly
  const {
    locale,
    availableLocales,
    setLocaleMessage,
  } = useI18n({ useScope: 'global' })

  const loading = ref(false)
  const error   = ref<Error | null>(null)

  async function loadLocale(newLocale: string) {
    // if we’ve already loaded this locale, just switch
    if (availableLocales.includes(newLocale)) {
      locale.value = newLocale
      return
    }

    loading.value = true
    error.value   = null

    try {
      // fetch your translations from your API
      const messages = await fetchTranslations(newLocale)
      // register them with vue-i18n
      setLocaleMessage(newLocale, messages)
      // switch active locale
      locale.value = newLocale
    } catch (e: any) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { loading, error, loadLocale }
}
