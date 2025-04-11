import moment from 'moment'
import 'moment/locale/es'

/**
 * Formats the current date in the format "Vier 12 de nov" with proper capitalization
 * @param locale - The current locale (e.g., 'es', 'en')
 * @returns Formatted date string
 */
export const formatCurrentDate = (locale: string): string => {
  moment.locale(locale)
  return moment()
    .format('ddd DD [de] MMM')
    .replace(/\b[A-zÀ-ú](?=[A-zÀ-ú]{2})/g, (match: string) => match.toUpperCase())
} 