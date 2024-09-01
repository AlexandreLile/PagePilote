import axiosInstance from "@/config/axiosSetup";

export const createPage = async (title, metaTitle, metaDescription) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );
    }

    const response = await axiosInstance.post(
      "/landingPages",
      {
        title,
        metaTitle,
        metaDescription,
      },
      {
        headers: { "x-auth-token": token },
      }
    );

    return {
      success: true,
      message: "Page créée avec succès!",
      pageId: response.data._id,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.msg || "Erreur lors de la création de la page.",
    };
  }
};

export const updatePage = async (pageId, title, metaTitle, metaDescription) => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );

    await axiosInstance.put(`/landingPages/${pageId}`, {
      title,
      metaTitle,
      metaDescription,
    });

    return { success: true, message: "Page modifiée avec succès!" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.msg ||
        "Erreur lors de la modification de la page.",
    };
  }
};

export const deletePage = async (pageId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );

    await axiosInstance.delete(`/landingPages/${pageId}`, {
      headers: { "x-auth-token": token },
    });

    return { success: true, message: "Page supprimée avec succès!" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.msg ||
        "Erreur lors de la suppression de la page.",
    };
  }
};

export const fetchPages = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token)
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );

    const response = await axiosInstance.get("/landingPages", {
      headers: { "x-auth-token": token },
    });

    return { success: true, pages: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.msg ||
        "Erreur lors de la récupération des pages.",
    };
  }
};

export const goToPageBuilder = async (pageId, router) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "Token d'authentification non trouvé. Veuillez vous connecter."
      );
    }

    console.log("Page ID:", pageId);

    // Vérifiez d'abord dans le cache local
    const cachedPageBuilder = localStorage.getItem(`pageBuilder-${pageId}`);
    if (cachedPageBuilder) {
      console.log("Chargement à partir du cache local.");
      router.push(`/page-builder/${pageId}`);
      return;
    }

    let response;
    try {
      response = await axiosInstance.get(`/pageBuilder/${pageId}`, {
        headers: { "x-auth-token": token },
      });

      if (response.status === 200) {
        localStorage.setItem(
          `pageBuilder-${pageId}`,
          JSON.stringify(response.data)
        );
        router.push(`/page-builder/${pageId}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du PageBuilder :",
        error.response ? error.response.data : error.message
      );

      if (error.response && error.response.status === 404) {
        await axiosInstance.post(
          `/pageBuilder/${pageId}`,
          { components: [] },
          {
            headers: { "x-auth-token": token },
          }
        );

        response = await axiosInstance.get(`/pageBuilder/${pageId}`, {
          headers: { "x-auth-token": token },
        });

        if (response.status === 200) {
          // Mettez en cache la réponse
          localStorage.setItem(
            `pageBuilder-${pageId}`,
            JSON.stringify(response.data)
          );
          router.push(`/page-builder/${pageId}`);
        }
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de la navigation vers le PageBuilder :",
      error.message
    );
  }
};
