import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SessaoDadosLaboratoriais() {
  const [dadosLaboratoriais, setDadosLaboratoriais] = useState({
    sistemaAnalitico: "",
    teste: "",
    unidade: "",
    metodo: "",
    periodoAnalisado: "",
  });

  const [historicoDados, setHistoricoDados] = useState([]);
  const [indicePeriodo, setIndicePeriodo] = useState(0);

  useEffect(() => {
    const dadosLocais =
      JSON.parse(localStorage.getItem("historicoDados")) || [];
    setHistoricoDados(dadosLocais);
    setDadosLaboratoriais(dadosLocais[indicePeriodo] || {});
  }, [indicePeriodo]);

  // Função para salvar dados no histórico
  const salvarDadosHistorico = (dados) => {
    const novoHistorico = [...historicoDados];
    novoHistorico[indicePeriodo] = dados;
    setHistoricoDados(novoHistorico);
    localStorage.setItem("historicoDados", JSON.stringify(novoHistorico));
  };

  // Função para lidar com a alteração de campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosLaboratoriais({
      ...dadosLaboratoriais,
      [name]: value,
    });
  };

  const handleNextPeriodo = () => {
    if (
      !dadosLaboratoriais.sistemaAnalitico ||
      !dadosLaboratoriais.teste ||
      !dadosLaboratoriais.unidade ||
      !dadosLaboratoriais.metodo ||
      !dadosLaboratoriais.periodoAnalisado
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    salvarDadosHistorico(dadosLaboratoriais);
    setDadosLaboratoriais({
      sistemaAnalitico: "",
      teste: "",
      unidade: "",
      metodo: "",
      periodoAnalisado: "",
    });
    setIndicePeriodo(indicePeriodo + 1);
  };

  const handlePreviousPeriodo = () => {
    if (indicePeriodo > 0) {
      setIndicePeriodo(indicePeriodo - 1);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center mb-3">
            <img
              src="laac-logo.png"
              className="img-fluid"
              alt="LAAC"
              style={{ maxWidth: "150px" }}
            />
            <h2 className="mt-1">Controle de Qualidade</h2>
          </div>
          <h4 className="mb-1">Sessão: Dados Laboratoriais</h4>
          <form>
            <div className="mb-1">
              <label htmlFor="sistemaAnalitico" className="form-label">
                Sistema Analítico:
              </label>
              <input
                type="text"
                className="form-control"
                id="sistemaAnalitico"
                name="sistemaAnalitico"
                value={dadosLaboratoriais.sistemaAnalitico}
                onChange={handleInputChange}
                placeholder="Insira o sistema analítico"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="teste" className="form-label">
                Teste:
              </label>
              <input
                type="text"
                className="form-control"
                id="teste"
                name="teste"
                value={dadosLaboratoriais.teste}
                onChange={handleInputChange}
                placeholder="Insira o teste"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="unidade" className="form-label">
                Unidade:
              </label>
              <input
                type="text"
                className="form-control"
                id="unidade"
                name="unidade"
                value={dadosLaboratoriais.unidade}
                onChange={handleInputChange}
                placeholder="Insira a unidade"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="metodo" className="form-label">
                Método:
              </label>
              <input
                type="text"
                className="form-control"
                id="metodo"
                name="metodo"
                value={dadosLaboratoriais.metodo}
                onChange={handleInputChange}
                placeholder="Insira o método"
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="periodoAnalisado" className="form-label">
                Período Analisado:
              </label>
              <input
                type="month"
                className="form-control"
                id="periodoAnalisado"
                name="periodoAnalisado"
                value={dadosLaboratoriais.periodoAnalisado}
                onChange={handleInputChange}
                placeholder="Insira o período analisado"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary ms-1"
                onClick={handlePreviousPeriodo}
              >
                Período Anterior
              </button>
              <button
                type="button"
                className="btn btn-primary ms-1"
                onClick={handleNextPeriodo}
              >
                Próximo Período
              </button>
              <Link
                to="/cadastro-lotes"
                className="btn btn-secondary ms-1 mt-0"
              >
                Próxima Sessão
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SessaoDadosLaboratoriais;
