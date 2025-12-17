import { useLanguage } from "@/contexts/LanguageContext";
import { en } from "@/locales/en";
import { id } from "@/locales/id";

export const useTranslation = () => {
  const { language } = useLanguage();
  const t = language === "id" ? id : en;
  return { t };
};
