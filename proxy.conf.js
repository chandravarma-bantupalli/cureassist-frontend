const PROXY_CONFIG = [
  {
      context: [
          "/postoffice"
      ],
      target: "https://api.postalpincode.in/",
      secure: true,
      changeOrigin: true,
  }
]

module.exports = PROXY_CONFIG;