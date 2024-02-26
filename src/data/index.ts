import { v4 as uuidv4 } from "uuid";
export const data = {
  businessTitles: ["fairCare", "harbalBoss"],
  businessInfo: {
    businessName: "Debbie’s SkinCare",
    description: `Introducing our skin care brand, focused on providing a wide range  of products and services to cater to all your skincare needs. Our brand offers an array of categories and sub-categories to ensure that you have 
    everything you need to achieve healthy and radiant skin.`,
  },
};

export const generateContentData = {
  placeholdertext: `ROX keeps tabs on current events, trending topics, and what people are
  actively seeking in relation to your business. This dynamic duo works
  seamlessly to craft promotional content that not only keeps you
  connected with your audience but also ensures your products and services
  remain at the forefront of what your customers desire.`,

  adTones: [
    {
      id: uuidv4(),
      title: "Casual",
      description:
        "Uses relaxed language for a laid-back vibe, e.g., Join us for a hassle-free shopping experience!",
    },

    {
      id: uuidv4(),
      title: "Professional",
      description:
        "Establishes credibility with formal language and a serious, trustworthy approach, e.g. Our cutting-edge technology ensures optimal performance.",
    },

    {
      id: uuidv4(),
      title: "Conversational",
      description:
        "Mimics friendly, everyday dialogue for an approachable and relatable tone, e.g., Hey there! Have you checked out our latest products yet?",
    },

    {
      id: uuidv4(),
      title: "Persuasive",
      description:
        "Uses compelling language and storytelling to convince the audience to take action. e.g., Don't miss out! Grab your exclusive discount today!",
    },

    {
      id: uuidv4(),
      title: "Informative",
      description:
        " Provides clear facts without being overly promotional, e.g., Discover key features of our software designed for efficiency",
    },
  ],
};
