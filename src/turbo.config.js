module.exports = {
    entry: "./src/index.js", // Arquivo de entrada principal do React
    output: {
      dir: "./dist", // Diretório onde o build será gerado
    },
    mode: "development", // Modo: "development" ou "production"
    jsx: "react-jsx", // Suporte a React JSX
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Extensões que o TurboPack deve resolver
    },
  };
  