import { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../api";

export default function ClientesView() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    balance: "",
  });
  const [saving, setSaving] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      setError("No se pudo cargar la lista de clientes. ¿Está corriendo el backend en el puerto 8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await createCustomer({
        firstName: form.firstName,
        lastName: form.lastName,
        accountNumber: form.accountNumber,
        balance: parseFloat(form.balance),
      });
      setSuccess("Cliente creado correctamente.");
      setForm({ firstName: "", lastName: "", accountNumber: "", balance: "" });
      loadCustomers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "No se pudo crear el cliente."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h3>Nuevo cliente</h3>
        {error && <div className="msg error">{String(error)}</div>}
        {success && <div className="msg success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} required />

          <label>Apellido</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} required />

          <label>Número de cuenta</label>
          <input name="accountNumber" value={form.accountNumber} onChange={handleChange} required />

          <label>Saldo inicial</label>
          <input
            name="balance"
            type="number"
            step="0.01"
            value={form.balance}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Crear cliente"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Clientes registrados</h3>
        {loading ? (
          <p className="empty">Cargando...</p>
        ) : customers.length === 0 ? (
          <p className="empty">Aún no hay clientes registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cuenta</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.accountNumber}</td>
                  <td>${Number(c.balance).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
