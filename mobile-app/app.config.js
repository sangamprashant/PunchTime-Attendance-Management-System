import "dotenv/config";

export default {
  expo: {
    name: "PunchTime",
    slug: "punch-time",
    scheme: "attendancemanagementsystem",
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
