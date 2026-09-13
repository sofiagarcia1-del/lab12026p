import { useState } from "react";
import ClientesView from "./components/ClientesView";
import TransferView from "./components/TransferView";
import HistorialView from "./components/HistorialView";

const TABS = [
  { key: "clientes", label: "Clientes", component: ClientesView },
  { key: "transferencia", label: "Transferencia", component: TransferView },
  { key: "historial", label: "Historial", component: HistorialView },
];

export default function App() {
  const [active, setActive] = useState("clientes");
  const ActiveComponent = TABS.find((t) => t.key === active).component;

  return (
    <div className="app">
      <h1>Banco 2026</h1>
      <p className="subtitle"> Laboratorio de Spring Boot — Arquitectura de Software</p>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab ${active === t.key ? "active" : ""}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ActiveComponent />
    </div>
  );
}
