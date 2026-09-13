import { useState } from "react";
import { getTransactionsByAccount } from "../api";

export default function HistorialView() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await getTransactionsByAccount(accountNumber);
      setTransactions(res.data);
    } catch (err) {
      setError("No se pudo obtener el historial para esa cuenta.");
      setTransactions(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Histórico de transacciones por cliente</h3>
      {error && <div className="msg error">{error}</div>}
      <form onSubmit={handleSearch}>
        <label>Número de cuenta</label>
        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Consultar historial"}
        </button>
      </form>

      {transactions && (
        transactions.length === 0 ? (
          <p className="empty">Esa cuenta no tiene transacciones registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.senderAccountNumber}</td>
                  <td>{t.receiverAccountNumber}</td>
                  <td>${Number(t.amount).toFixed(2)}</td>
                  <td>{t.timestamp ? new Date(t.timestamp).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
