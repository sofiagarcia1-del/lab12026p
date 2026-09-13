import { useState } from "react";
import { transferMoney } from "../api";

export default function TransferView() {
  const [form, setForm] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setSending(true);
    try {
      const res = await transferMoney({
        senderAccountNumber: form.senderAccountNumber,
        receiverAccountNumber: form.receiverAccountNumber,
        amount: parseFloat(form.amount),
      });
      setSuccess(res.data);
      setForm({ senderAccountNumber: "", receiverAccountNumber: "", amount: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "No se pudo realizar la transferencia."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card">
      <h3>Transferir dinero entre cuentas</h3>
      {error && <div className="msg error">{String(error)}</div>}
      {success && (
        <div className="msg success">
          Transferencia #{success.id} realizada: ${Number(success.amount).toFixed(2)} de{" "}
          {success.senderAccountNumber} a {success.receiverAccountNumber}.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Cuenta origen</label>
        <input
          name="senderAccountNumber"
          value={form.senderAccountNumber}
          onChange={handleChange}
          required
        />

        <label>Cuenta destino</label>
        <input
          name="receiverAccountNumber"
          value={form.receiverAccountNumber}
          onChange={handleChange}
          required
        />

        <label>Monto</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={sending}>
          {sending ? "Procesando..." : "Transferir"}
        </button>
      </form>
    </div>
  );
}
