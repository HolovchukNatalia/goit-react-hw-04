import axios from "axios";

const unsplashKey = "Tn7WxP5cH-r-qYvvPsHefdafpkjf_cCiQz49cnQA7Ig";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${unsplashKey}`;

axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export const api = async (query, page = 1) => {
  try {
    const { data } = await axios.get("search/photos", {
      params: {
        query,
        page,
      },
    });
    return {
      results: data.results,
      totalPage: data.total_pages,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
