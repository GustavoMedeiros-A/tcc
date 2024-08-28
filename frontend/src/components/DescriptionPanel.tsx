import React from "react";

const descriptions = {
  dataSize: {
    small: "Pequenos dados: Menos de 100 mil registros.",
    medium: "Médios dados: Cerca de 1 milhão de registros.",
    large: "Grandes dados: Mais de 5 milhões de registros.",
  },
  joinLookup:
    "São operações que combinam dados de duas ou mais tabelas (ou collections) diferentes, geralmente relacionadas por uma chave comum.",
  filter:
    "Permite filtrar os registros retornados pela consulta com base em uma data específica.",
  order:
    "A ordenação dos resultados pode ser ascendente ou descendente, e é baseada nos dados filtrados, normalmente por data.",
  // useIndexes:
  //   "Usar índices previamente configurados para acelerar as consultas, melhorando a performance especialmente em grandes volumes de dados.",
};

const DescriptionPanel: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#333",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
        marginLeft: "20px",
      }}
    >
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>
        Detalhes das Opções
      </h3>
      <p style={{ color: "#aaa", marginBottom: "10px" }}>
        <strong>Tamanho dos Dados:</strong>
        <br />
        {descriptions.dataSize.small}
        <br />
        {descriptions.dataSize.medium}
        <br />
        {descriptions.dataSize.large}
      </p>
      <p style={{ color: "#aaa", marginBottom: "10px" }}>
        <strong>Join/Lookup:</strong> {descriptions.joinLookup}
      </p>
      <p style={{ color: "#aaa", marginBottom: "10px" }}>
        <strong>Filtro por Data:</strong> {descriptions.filter}
      </p>
      <p style={{ color: "#aaa", marginBottom: "10px" }}>
        <strong>Ordenação:</strong> {descriptions.order}
      </p>
      {/* <p style={{ color: "#aaa", marginBottom: "10px" }}>
        <strong>Uso de Índices:</strong> {descriptions.useIndexes}
      </p> */}
    </div>
  );
};

export default DescriptionPanel;
