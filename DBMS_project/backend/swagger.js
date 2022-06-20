const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DBMS Project API",
  },
  host: "nccu-dbms-team11.herokuapp.com",
  schemes: ["https"],
  tags: [
    {
      name: "Index",
      description: "Index router",
    },
    {
      name: "User",
      description: "User router",
    },
    {
      name: "Material",
      description: "Material router",
    },
    {
      name: "Product",
      description: "Product router",
    },
    {
      name: "Order",
      description: "Order router",
    },
    {
      name: "Schedule",
      description: "Schedule router",
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
};

const outputFile = "./swagger_output.json"; // 輸出的文件名稱
const endpointsFiles = ["./app.js"]; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc); // swaggerAutogen 的方法
