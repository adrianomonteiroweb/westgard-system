import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IsContext from "../../context/IsContext";

function SessaoDadosLaboratoriais() {
  const { period } = useContext(IsContext);

  const [dadosLaboratoriais, setDadosLaboratoriais] = useState({
    sistemaAnalitico: "",
    teste: "",
    unidade: "",
    metodo: "",
    periodoAnalisado: "",
  });

  const [historicoDados, setHistoricoDados] = useState([]);
  const [indicePeriodo, setIndicePeriodo] = useState(1);

  useEffect(() => {
    const dadosLocais = period[indicePeriodo]?.historicoDados || [];
    setHistoricoDados(dadosLocais);
    setDadosLaboratoriais(dadosLocais[0] || {});
  }, [indicePeriodo, period]);

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

    const novoHistorico = [...historicoDados];
    novoHistorico.push(dadosLaboratoriais);

    const updatedPeriod = { ...period };
    updatedPeriod.selectedPeriod = dadosLaboratoriais.periodoAnalisado;
    updatedPeriod[dadosLaboratoriais.periodoAnalisado].historicoDados =
      novoHistorico;

    localStorage.setItem("laac", JSON.stringify(updatedPeriod));

    setHistoricoDados(novoHistorico);
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
    if (indicePeriodo > 1) {
      setIndicePeriodo(indicePeriodo - 1);
    }
  };

  const handleDeletePeriodo = () => {
    const shouldDelete = window.confirm(
      "Tem certeza de que deseja excluir este período?"
    );

    if (shouldDelete) {
      const novoHistorico = [];
      setHistoricoDados(novoHistorico);

      const updatedPeriod = { ...period };
      updatedPeriod[indicePeriodo].historicoDados = novoHistorico;

      localStorage.setItem("laac", JSON.stringify(updatedPeriod));

      if (indicePeriodo > 1) {
        setIndicePeriodo(indicePeriodo - 1);
      }
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
              <select
                className="form-select"
                id="periodoAnalisado"
                name="periodoAnalisado"
                value={dadosLaboratoriais.periodoAnalisado}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione um mês</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-danger btn-sm ms-1"
                onClick={handleDeletePeriodo}
              >
                Excluir
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm ms-1"
                onClick={handlePreviousPeriodo}
              >
                Anterior
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm ms-1"
                onClick={handleNextPeriodo}
              >
                {indicePeriodo === historicoDados.length ? "Salvar" : "Próximo"}
              </button>
              <Link
                to="/cadastro-lotes"
                className="btn btn-secondary btn-sm ms-1 mt-0"
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
