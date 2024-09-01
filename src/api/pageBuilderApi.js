import axiosInstance from "@/config/axiosSetup";

// Fonction pour charger les composants de page
export const loadPageComponents = async (pageId) => {
  try {
    const response = await axiosInstance.get(`/pageBuilder/${pageId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonction pour sauvegarder les composants de page en base de données
export const saveComponentsToDatabase = async (pageId, components) => {
  try {
    console.log("Page ID:", pageId);
    const response = await axiosInstance.put(
      `/pageBuilder/${pageId}`,
      { components },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des composants :", error);
    throw error;
  }
};
