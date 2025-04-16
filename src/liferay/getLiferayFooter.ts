import { ENDPOINTS } from "@/constants/endpoints";
import { liferayApi } from "@/services/liferayApi";

const getLiferayFooter = async (): Promise<string> => {
  try {
    const res = await liferayApi.get(ENDPOINTS.liferay.footer);
    return res as string;
  } catch (error) {
    console.error("Error fetching liferay footer:", error);
    return "";
  }
};

export default getLiferayFooter;
